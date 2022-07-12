import React from "react";
import { Button, Icon } from "../../../../components";
import "./SearchItem.scss";

interface Props {
  city: string;
}

function SearchItem({ city }: Props) {
  return (
    <li className="searchItem">
      <Button className="searchItem__btn">
        <span className="searchItem__city">{city}</span>
        <Icon type="arrow-right" className="searchItem__icon" />
      </Button>
    </li>
  );
}

export default SearchItem;
