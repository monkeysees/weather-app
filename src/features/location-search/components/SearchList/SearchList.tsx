import React, { useMemo } from "react";
import { isEqual, take, uniqWith } from "lodash";
import { useUser } from "../../../../providers/UserProvider";
import { useCities } from "../../../../hooks/weather";
import { CityLocation } from "../../../../types/weather";
import SearchItem from "../SearchItem";
import styles from "./SearchList.module.scss";

interface Props {
  searchQuery: string;
  onItemSelected: (location: CityLocation) => void;
  onItemHoverStart: (location: CityLocation) => void;
  onItemHoverEnd: (location: CityLocation) => void;
  isFetching: boolean;
}

function LocationSearch({
  searchQuery,
  onItemSelected,
  onItemHoverStart,
  onItemHoverEnd,
  isFetching,
}: Props) {
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
    <ul className={styles.wrapper}>
      {citiesToList.map((location) => (
        <SearchItem
          key={`${location.coords.lat} ${location.coords.lon}`}
          location={location}
          onItemSelected={onItemSelected}
          onItemHoverStart={onItemHoverStart}
          onItemHoverEnd={onItemHoverEnd}
        />
      ))}
    </ul>
  );
  const fallbackToRender = isFetching ? null : <p>No results</p>;

  return citiesToList.length ? citiesToRender : fallbackToRender;
}

export default LocationSearch;
