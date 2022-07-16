import {
  useQueryClient,
  useQuery,
  QueryFunctionContext,
  QueryClient,
} from "react-query";
import axios from "axios";
import { minutesToMilliseconds, hoursToMilliseconds } from "date-fns";
import { find, isEqual } from "lodash";
import { useUser } from "../providers/UserProvider";
import {
  Weather,
  CityLocation,
  Location,
  Coordinates,
  TodayWeather,
} from "../types/weather";
import {
  convertWeatherTemperatures,
  extractCitiesData,
  extractWeatherData,
} from "../utils/weather";

function getWeatherQueryKey(coords: Coordinates) {
  return [{ scope: "weather", coords }] as const;
}
type WeatherQueryKey = ReturnType<typeof getWeatherQueryKey>;

function getCitiesQueryKey(searchQuery: string) {
  return [{ scope: "cities", searchQuery }] as const;
}
type CitiesQueryKey = ReturnType<typeof getCitiesQueryKey>;

function fetchRawWeather(
  queryClient: QueryClient,
  { queryKey: [{ coords }] }: QueryFunctionContext<WeatherQueryKey>,
) {
  return axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,relativehumidity_2m,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m&timeformat=unixtime&past_days=1`,
    )
    .then((res) => ({ ...res.data, coords }));
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
    .then((res) => extractCitiesData(res.data));
}

function useCities(searchQuery: string) {
  const queryClient = useQueryClient();
  const queryInfo = useQuery<
    CityLocation[],
    Error,
    CityLocation[],
    CitiesQueryKey
  >(
    getCitiesQueryKey(searchQuery),
    (queryCtx) => fetchRawCities(queryClient, queryCtx),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const cities = queryInfo.status === "success" ? queryInfo.data : [];

  return cities;
}

function useWeather(): Weather {
  const queryClient = useQueryClient();
  const {
    location: { current: currentLocation, searchHistory },
    units: { temperature: tempUnit },
  } = useUser();
  const queryInfo = useQuery<any, Error, any, WeatherQueryKey>(
    getWeatherQueryKey(currentLocation.coords),
    (queryCtx) => fetchRawWeather(queryClient, queryCtx),
    {
      staleTime: minutesToMilliseconds(5),
      cacheTime: hoursToMilliseconds(24),
      refetchInterval: minutesToMilliseconds(4.5),
    },
  );

  const prevLocation = searchHistory[1];
  const prevWeatherData = prevLocation
    ? queryClient.getQueryData<any>(getWeatherQueryKey(prevLocation.coords))
    : undefined;

  const rawWeather =
    queryInfo.status === "success" ? queryInfo.data : prevWeatherData;

  return rawWeather
    ? convertWeatherTemperatures(extractWeatherData(rawWeather), tempUnit)
    : { coords: currentLocation.coords, daysData: [] };
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
  const weatherLocation = find(searchHistory, ({ coords }) =>
    isEqual(coords, weatherCoords),
  );
  return (
    weatherLocation || {
      city: "Unknown",
      coords: weatherCoords,
    }
  );
}

export { useWeather, useTodayWeather, useWeatherLocation, useCities };
