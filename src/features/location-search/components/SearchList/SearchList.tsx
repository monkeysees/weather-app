import React from "react";
import { useUser } from "../../../../providers/UserProvider";
import { useCities } from "../../../../providers/WeatherProvider";
import SearchItem from "../SearchItem";
import "./SearchList.scss";

interface Props {
  searchQuery: string;
}

function LocationSearch({ searchQuery }: Props) {
  const {
    location: { searchedCitiesHistory },
  } = useUser();
  const currentSearchCities = useCities(searchQuery);

  const citiesToList = searchQuery
    ? currentSearchCities
    : searchedCitiesHistory;

  return (
    <ul className="searchItems">
      {citiesToList.map((loc) => (
        <SearchItem
          key={`${loc.coords.lat} ${loc.coords.lon}`}
          city={loc.city}
          adminZone1={loc.adminZone1}
          country={loc.country}
        />
      ))}
    </ul>
  );
}

export default LocationSearch;
