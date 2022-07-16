import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import {
  useQueryClient,
  useQuery,
  QueryFunctionContext,
  QueryClient,
  onlineManager,
} from "react-query";
import axios, { CanceledError } from "axios";
import { useUser, useUserDispatch } from "../providers/UserProvider";
import {
  getWeatherQueryKey,
  useWeatherQuery,
} from "../providers/DataQueryProvider";
import {
  Weather,
  CityLocation,
  Location,
  TodayWeather,
} from "../types/weather";
import {
  convertWeatherTemperatures,
  extractCitiesData,
  extractWeatherData,
  findLocationByCoords,
} from "../utils/weather";

function getCitiesQueryKey(searchQuery: string) {
  return [{ scope: "cities", searchQuery }] as const;
}
type CitiesQueryKey = ReturnType<typeof getCitiesQueryKey>;

function getErrorMsg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong";
}

function fetchRawCities(
  queryClient: QueryClient,
  { queryKey: [{ searchQuery }], signal }: QueryFunctionContext<CitiesQueryKey>,
) {
  queryClient.cancelQueries([{ scope: "cities" }]);

  if (!searchQuery) {
    return [];
  }

  return axios
    .get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`, {
      signal,
    })
    .then((res) => extractCitiesData(res.data))
    .catch((e: unknown) => {
      const isCancelError = e instanceof CanceledError;
      if (!isCancelError) {
        toast.error(getErrorMsg(e), {
          id: `search-cities_error_${searchQuery}`,
        });
      }

      throw e;
    });
}

function handleNoInternet(queryClient: QueryClient) {
  queryClient.cancelQueries();
  toast.error("No internet connection", {
    id: "no-internet",
  });
}

function useCities(searchQuery: string) {
  const queryClient = useQueryClient();
  const queryKey = getCitiesQueryKey(searchQuery);
  const queryInfo = useQuery<
    CityLocation[],
    unknown,
    CityLocation[],
    CitiesQueryKey
  >(queryKey, (queryCtx) => fetchRawCities(queryClient, queryCtx), {
    staleTime: Infinity,
    cacheTime: Infinity,
    onError: (error) => {
      if (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(errorMsg, {
          id: `search-cities_error`,
        });
        queryClient.cancelQueries(queryKey);
      }
    },
  });

  const { failureCount, isLoading } = queryInfo;
  useEffect(() => {
    if (isLoading && !onlineManager.isOnline()) {
      handleNoInternet(queryClient);
    }
  }, [queryClient, isLoading, failureCount]);

  const cities = queryInfo.status === "success" ? queryInfo.data : [];

  return cities;
}

function useWeather(): Weather {
  const queryClient = useQueryClient();
  const {
    location: { current: currentLocation, searchHistory },
    units: { temperature: tempUnit },
  } = useUser();
  const userDispatch = useUserDispatch();
  const queryInfo = useWeatherQuery(currentLocation.coords);

  const prevLocation = searchHistory[1];
  const prevWeatherData = prevLocation
    ? queryClient.getQueryData<any>(getWeatherQueryKey(prevLocation.coords))
    : undefined;

  const rawWeather =
    queryInfo.status === "success" ? queryInfo.data : prevWeatherData;

  const weatherData: Weather = useMemo(
    () =>
      rawWeather
        ? convertWeatherTemperatures(extractWeatherData(rawWeather), tempUnit)
        : { coords: currentLocation.coords, daysData: [] },
    [currentLocation.coords, rawWeather, tempUnit],
  );

  const { failureCount, isLoading } = queryInfo;

  useEffect(() => {
    if (isLoading && !onlineManager.isOnline()) {
      userDispatch({
        type: "change-location",
        location: findLocationByCoords(searchHistory, weatherData.coords),
      });
      handleNoInternet(queryClient);
    }
  }, [
    queryClient,
    isLoading,
    failureCount,
    userDispatch,
    searchHistory,
    weatherData,
  ]);

  return weatherData;
}

function useTodayWeather(): TodayWeather {
  const weather = useWeather();
  return {
    coords: weather.coords,
    data: weather.daysData.length ? weather.daysData[0] : undefined,
  };
}

function useWeatherLocation(): Location {
  const { coords: weatherCoords } = useWeather();
  const {
    location: { searchHistory },
  } = useUser();
  return findLocationByCoords(searchHistory, weatherCoords);
}

export { useWeather, useTodayWeather, useWeatherLocation, useCities };
