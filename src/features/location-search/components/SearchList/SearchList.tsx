import React, { useMemo } from "react";
import { isEqual, take, uniqWith } from "lodash";
import { useUser } from "../../../../providers/UserProvider";
import { useCities } from "../../../../hooks/weather";
import { CityLocation } from "../../../../types/weather";
import SearchItem from "../SearchItem";
import "./SearchList.scss";

interface Props {
  searchQuery: string;
  onItemSelected: (location: CityLocation) => void;
  isFetching: boolean;
}

function LocationSearch({ searchQuery, onItemSelected, isFetching }: Props) {
  const {
    location: { searchHistory },
  } = useUser();
  const citiesSearchHistory = useMemo(
    () =>
      take(
        uniqWith(
          searchHistory.filter((loc) => "city" in loc) as CityLocation[],
          isEqual,
        ),
        10,
      ),
    [searchHistory],
  );
  const currentSearchCities = useCities(searchQuery);

  const citiesToList = searchQuery ? currentSearchCities : citiesSearchHistory;
  const citiesToRender = (
    <ul className="searchItems">
      {citiesToList.map((location) => (
        <SearchItem
          key={`${location.coords.lat} ${location.coords.lon}`}
          location={location}
          onItemSelected={onItemSelected}
        />
      ))}
    </ul>
  );
  const fallbackToRender = isFetching ? null : <p>No results</p>;

  return citiesToList.length ? citiesToRender : fallbackToRender;
}

export default LocationSearch;
