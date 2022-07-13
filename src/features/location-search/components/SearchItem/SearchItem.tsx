import React from "react";
import { Button, Icon } from "../../../../components";
import "./SearchItem.scss";

interface Props {
  city: string;
  country?: string;
  adminZone1?: string;
}

function SearchItem({ country, city, adminZone1 }: Props) {
  const countryToRender = country ? `, ${country}` : null;
  const adminZoneToRender = adminZone1 ? `, ${adminZone1}` : null;

  return (
    <li className="searchItem">
      <Button className="searchItem__btn">
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
