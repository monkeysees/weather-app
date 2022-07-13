import React from "react";
import { useUser } from "../../../../providers/UserProvider";
import SearchItem from "../SearchItem";
import "./SearchList.scss";

function LocationSearch() {
  const {
    location: { searchedCities },
  } = useUser();

  return (
    <ul className="searchItems">
      {searchedCities.map((loc) => (
        <SearchItem
          key={`${loc.coords.lat} ${loc.coords.lon}`}
          city={loc.city}
        />
      ))}
    </ul>
  );
}

export default LocationSearch;
