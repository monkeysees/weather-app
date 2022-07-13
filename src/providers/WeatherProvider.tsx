import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
  QueryFunctionContext,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { minutesToMilliseconds, hoursToMilliseconds } from "date-fns";
import { useUser } from "./UserProvider";
import type { Coordinates } from "../types/weather";
import type { ChildrenProps } from "../types/props";
import {
  convertWeatherTemperatures,
  extractCitiesData,
  extractWeatherData,
} from "../utils/weather";

const queryClient = new QueryClient();

function WeatherProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

function fetchRawWeather({
  queryKey: [{ location }],
}: QueryFunctionContext<[{ scope: "weather"; location: Coordinates }]>) {
  return axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,relativehumidity_2m,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m&timeformat=unixtime&past_days=1`,
    )
    .then((res) => res.data);
}

function fetchRawCities({
  queryKey: [{ searchQuery }],
  signal,
}: QueryFunctionContext<[{ scope: "cities"; searchQuery: string }]>) {
  queryClient.cancelQueries([{ scope: "cities" }]);

  if (!searchQuery) {
    return [];
  }

  return axios
    .get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`, {
      signal,
    })
    .then((res) => extractCitiesData(res.data));
}

function useCities(searchQuery: string) {
  const queryInfo = useQuery(
    [{ scope: "cities", searchQuery }],
    fetchRawCities,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const cities = queryInfo.status === "success" ? queryInfo.data : [];

  return cities;
}

function useWeather() {
  const {
    location: { current: currentLocation, searchHistory },
    units: { temperature: tempUnit },
  } = useUser();
  const queryInfo = useQuery(
    [{ scope: "weather", location: currentLocation.coords }],
    fetchRawWeather,
    {
      staleTime: minutesToMilliseconds(5),
      cacheTime: hoursToMilliseconds(24),
      refetchInterval: minutesToMilliseconds(4.5),
    },
  );

  const prevLocation = searchHistory[1];
  const prevWeatherData = prevLocation
    ? queryClient.getQueryData<any>([
        { scope: "weather", location: prevLocation.coords },
      ])
    : undefined;

  const rawWeather =
    queryInfo.status === "success" ? queryInfo.data : prevWeatherData;

  return rawWeather
    ? convertWeatherTemperatures(extractWeatherData(rawWeather), tempUnit)
    : [];
}

export { useWeather, useCities, WeatherProvider };
