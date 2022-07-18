import toast from "react-hot-toast";
import { useQuery, QueryFunctionContext } from "react-query";
import axios, { CanceledError } from "axios";
import { CityLocation } from "../../types/weather";
import { extractCitiesData } from "../../utils/weather";
import { queryClient } from "./DataQueryProvider";
import { getErrorMsg } from "./utils";
import { CitiesResponse } from "../../types/query";

function getCitiesQueryKey(searchQuery: string) {
  return [{ scope: "cities", searchQuery }] as const;
}
type CitiesQueryKey = ReturnType<typeof getCitiesQueryKey>;

function citiesQueryHandler({
  queryKey: [{ searchQuery }],
  signal,
}: QueryFunctionContext<CitiesQueryKey>) {
  queryClient.cancelQueries([{ scope: "cities" }]);

  if (!searchQuery) {
    return [];
  }

  return axios
    .get<CitiesResponse>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`,
      {
        signal,
      },
    )
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

function useCitiesQuery(searchQuery: string) {
  const queryKey = getCitiesQueryKey(searchQuery);
  return useQuery<CityLocation[], unknown, CityLocation[], CitiesQueryKey>(
    queryKey,
    citiesQueryHandler,
    {
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
    },
  );
}

export { getCitiesQueryKey, useCitiesQuery };
