import React, { useCallback } from "react";
import { Button, Icon } from "../../../../components";
import { CityLocation } from "../../../../types/weather";
import styles from "./SearchItem.module.scss";

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
  const itemNameToRender = `${city}${adminZoneToRender}${countryToRender}`;

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
    <li>
      <Button
        className={styles.btn}
        onClick={handleItemSelected}
        onHoverStart={handleItemHoverStart}
        onHoverEnd={handleItemHoverEnd}
        aria={{ "aria-label": `Fetch weather for ${itemNameToRender}` }}
      >
        <span className={styles.name}>{itemNameToRender}</span>
        <Icon type="arrow-right" className={styles.icon} />
      </Button>
    </li>
  );
}

export default SearchItem;
