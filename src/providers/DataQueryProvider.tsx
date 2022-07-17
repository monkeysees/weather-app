import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryFunctionContext,
  useQuery,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import toast from "react-hot-toast";
import axios from "axios";
import { minutesToMilliseconds, hoursToMilliseconds } from "date-fns";
import type { ChildrenProps } from "../types/props";
import { Location, Coordinates } from "../types/weather";

const queryClient = new QueryClient();

function getWeatherQueryKey(coords: Coordinates) {
  return [{ scope: "weather", coords }] as const;
}

function cancelWeatherQuery(location: Location) {
  queryClient.cancelQueries(getWeatherQueryKey(location.coords));
}

type WeatherQueryKey = ReturnType<typeof getWeatherQueryKey>;

interface WeatherResponseBase {
  hourly_units: {
    temperature_2m: "°C";
    cloudcover: "%";
    windspeed_10m: "km/h";
    relativehumidity_2m: "%";
    pressure_msl: "hPa";
  };
  hourly: {
    pressure_msl: number[];
    temperature_2m: number[];
    winddirection_10m: number[];
    relativehumidity_2m: number[];
    weathercode: number[];
    time: number[];
    windspeed_10m: number[];
    cloudcover: number[];
  };
}
interface WeatherResponse extends WeatherResponseBase {}
interface WeatherResponseWithCoords extends WeatherResponse {
  coords: {
    lat: number;
    lon: number;
  };
}

interface CityResponseResultBase {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
  admin1?: string;
}
interface CityResponseResult extends CityResponseResultBase {}
interface CitiesResponse {
  results: CityResponseResult[];
  generationtime_ms: number;
}

async function weatherQueryHandler({
  queryKey: [{ coords }],
}: QueryFunctionContext<WeatherQueryKey>): Promise<WeatherResponseWithCoords> {
  return axios
    .get<WeatherResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,relativehumidity_2m,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m&timeformat=unixtime&past_days=1`,
    )
    .then((res) => ({ ...res.data, coords }));
}

const weatherQueryTimings = {
  staleTime: minutesToMilliseconds(5),
  cacheTime: hoursToMilliseconds(24),
};

function useWeatherQuery(coords: Coordinates) {
  const queryKey = getWeatherQueryKey(coords);
  return useQuery<
    WeatherResponseWithCoords,
    unknown,
    WeatherResponseWithCoords,
    WeatherQueryKey
  >(queryKey, weatherQueryHandler, {
    ...weatherQueryTimings,
    refetchInterval: minutesToMilliseconds(4.5),
    onError: (error) => {
      if (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(errorMsg, {
          id: `weather_error_${coords.lat}-${coords.lon}`,
        });
        queryClient.cancelQueries(queryKey);
      }
    },
  });
}

function prefetchWeatherLocation(location: Location) {
  queryClient.prefetchQuery(
    getWeatherQueryKey(location.coords),
    weatherQueryHandler,
    { ...weatherQueryTimings },
  );
}

function DataQueryProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

export default DataQueryProvider;
export {
  getWeatherQueryKey,
  prefetchWeatherLocation,
  cancelWeatherQuery,
  weatherQueryHandler,
  useWeatherQuery,
};
export type { WeatherQueryKey, WeatherResponseWithCoords, CitiesResponse };
