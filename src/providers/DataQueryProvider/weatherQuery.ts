import {
  onlineManager,
  QueryFunctionContext,
  useIsFetching,
  useQuery,
} from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { minutesToMilliseconds, hoursToMilliseconds } from "date-fns";
import { queryClient } from "./DataQueryProvider";
import { Location, Coordinates } from "../../types/weather";
import { WeatherResponse, WeatherResponseWithCoords } from "../../types/query";

function getWeatherQueryKey(coords: Coordinates) {
  return [{ scope: "weather", coords }] as const;
}

type WeatherQueryKey = ReturnType<typeof getWeatherQueryKey>;

const weatherQueryTimings = {
  staleTime: minutesToMilliseconds(5),
  cacheTime: hoursToMilliseconds(24),
};

async function weatherQueryHandler({
  queryKey: [{ coords }],
}: QueryFunctionContext<WeatherQueryKey>): Promise<WeatherResponseWithCoords> {
  return axios
    .get<WeatherResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,relativehumidity_2m,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m&timeformat=unixtime&past_days=1`,
    )
    .then((res) => ({ ...res.data, coords }));
}

function useWeatherQuery(location: Location) {
  const queryKey = getWeatherQueryKey(location.coords);
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
          id: `weather_error_${location.coords.lat}-${location.coords.lon}`,
        });
        queryClient.cancelQueries(queryKey);
      }
    },
  });
}

function prefetchWeatherLocation(location: Location) {
  if (!onlineManager.isOnline()) {
    return;
  }

  queryClient.prefetchQuery(
    getWeatherQueryKey(location.coords),
    weatherQueryHandler,
    { ...weatherQueryTimings },
  );
}

function cancelWeatherQuery(location: Location) {
  queryClient.cancelQueries(getWeatherQueryKey(location.coords));
}

function getWeatherQueryData(location: Location) {
  return queryClient.getQueryData<WeatherResponseWithCoords>(
    getWeatherQueryKey(location.coords),
  );
}

function getWeatherQueryState(location: Location) {
  return queryClient.getQueryState<WeatherResponseWithCoords>(
    getWeatherQueryKey(location.coords),
  );
}

function useIsFetchingWeather(location: Location) {
  return useIsFetching(getWeatherQueryKey(location.coords));
}

export {
  getWeatherQueryKey,
  useWeatherQuery,
  prefetchWeatherLocation,
  cancelWeatherQuery,
  getWeatherQueryData,
  getWeatherQueryState,
  useIsFetchingWeather,
};
