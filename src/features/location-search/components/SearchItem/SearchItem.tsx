import React, { useMemo } from "react";
import { Button, Icon } from "../../../../components";
import { CityLocation } from "../../../../types/weather";
import "./SearchItem.scss";

interface Props {
  location: CityLocation;
  onItemSelected: (location: CityLocation) => void;
}

function SearchItem({ location, onItemSelected }: Props) {
  const { city, country, adminZone1 } = location;
  const countryToRender = country ? `, ${country}` : null;
  const adminZoneToRender = adminZone1 ? `, ${adminZone1}` : null;

  const handleItemSelected = useMemo(
    () => () => onItemSelected(location),
    [location, onItemSelected],
  );

  return (
    <li className="searchItem">
      <Button className="searchItem__btn" onClick={handleItemSelected}>
        <span className="searchItem__name">
          {city}
          {adminZoneToRender}
          {countryToRender}
        </span>
        <Icon type="arrow-right" className="searchItem__icon" />
      </Button>
    </li>
  );
}

export default SearchItem;
