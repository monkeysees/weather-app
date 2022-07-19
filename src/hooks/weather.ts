import { useEffect, useMemo } from "react";
import { useQueryClient, onlineManager } from "react-query";
import {
  useCitiesQuery,
  useWeatherQuery,
  getWeatherQueryData,
  handleNoInternet,
} from "../providers/DataQueryProvider";
import { useUser, useUserDispatch } from "../providers/UserProvider";
import {
  convertWeatherTemperatures,
  extractWeatherData,
  findLocationByCoords,
} from "../utils/weather";
import { Weather, Location, TodayWeather } from "../types/weather";

function useCities(searchQuery: string) {
  const queryInfo = useCitiesQuery(searchQuery);

  const { failureCount, isLoading } = queryInfo;
  useEffect(() => {
    if (searchQuery && isLoading && !onlineManager.isOnline()) {
      handleNoInternet();
    }
  }, [searchQuery, isLoading, failureCount]);

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
  const queryInfo = useWeatherQuery(currentLocation);

  const prevLocation = searchHistory[1];
  const prevWeatherData = prevLocation
    ? getWeatherQueryData(prevLocation)
    : undefined;

  const rawWeather =
    queryInfo.status === "success" ? queryInfo.data : prevWeatherData;

  const processedWeather = useMemo(
    () =>
      rawWeather
        ? extractWeatherData(rawWeather)
        : { coords: currentLocation.coords, daysData: [] },
    [currentLocation.coords, rawWeather],
  );

  const weatherData = useMemo(
    () => convertWeatherTemperatures(processedWeather, tempUnit),
    [processedWeather, tempUnit],
  );

  const { failureCount, isLoading } = queryInfo;

  useEffect(() => {
    if (isLoading && !onlineManager.isOnline()) {
      userDispatch({
        type: "change-location",
        location: findLocationByCoords(searchHistory, weatherData.coords),
      });
      handleNoInternet();
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
