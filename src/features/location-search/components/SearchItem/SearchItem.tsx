import React, { useCallback } from "react";
import { Button, Icon } from "../../../../components";
import { CityLocation } from "../../../../types/weather";
import "./SearchItem.scss";

interface Props {
  location: CityLocation;
  onItemSelected: (location: CityLocation) => void;
  onItemHoverStart: (location: CityLocation) => void;
  onItemHoverEnd: (location: CityLocation) => void;
}

function SearchItem({
  location,
  onItemSelected,
  onItemHoverStart,
  onItemHoverEnd,
}: Props) {
  const { city, country, adminZone1 } = location;
  const countryToRender = country ? `, ${country}` : null;
  const adminZoneToRender = adminZone1 ? `, ${adminZone1}` : null;

  const handleItemSelected = useCallback(
    () => onItemSelected(location),
    [location, onItemSelected],
  );

  const handleItemHoverStart = useCallback(
    () => onItemHoverStart(location),
    [location, onItemHoverStart],
  );

  const handleItemHoverEnd = useCallback(
    () => onItemHoverEnd(location),
    [location, onItemHoverEnd],
  );

  return (
    <li className="searchItem">
      <Button
        className="searchItem__btn"
        onClick={handleItemSelected}
        onHoverStart={handleItemHoverStart}
        onHoverEnd={handleItemHoverEnd}
      >
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
