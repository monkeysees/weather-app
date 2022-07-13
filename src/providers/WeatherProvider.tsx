import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
  QueryFunctionContext,
} from "react-query";
import axios from "axios";
import { minutesToMilliseconds, hoursToMilliseconds } from "date-fns";
import { useUser } from "./UserProvider";
import type { Coordinates } from "../types/weather";
import type { ChildrenProps } from "../types/props";
import {
  convertWeatherTemperatures,
  extractWeatherData,
} from "../utils/weather";

const queryClient = new QueryClient();

function WeatherProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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

function useWeather() {
  const {
    location: { current: currentLocation },
    units: { temperature: tempUnit },
  } = useUser();
  const queryInfo = useQuery(
    [{ scope: "weather", location: currentLocation.coords }],
    fetchRawWeather,
    {
      staleTime: minutesToMilliseconds(4.5),
      cacheTime: hoursToMilliseconds(24),
      refetchInterval: minutesToMilliseconds(5),
    },
  );

  const rawWeather = queryInfo.status === "success" ? queryInfo.data : null;

  return rawWeather
    ? convertWeatherTemperatures(extractWeatherData(rawWeather), tempUnit)
    : [];
}

export { useWeather, WeatherProvider };
