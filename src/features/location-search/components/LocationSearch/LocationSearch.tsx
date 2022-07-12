import React, { useState } from "react";
import { Button, Ellipse, Icon } from "../../../../components";
import SearchModal from "../SearchModal";
import "./LocationSearch.scss";

function LocationSearch() {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <section className="locationSearch">
      <SearchModal
        isOpen={isShowModal}
        onRequestClose={() => setIsShowModal(false)}
      />
      <Button
        className="locationSearch__search"
        onClick={() => setIsShowModal(true)}
      >
        Search for places
      </Button>
      <Ellipse className="locationSearch__currentLocation">
        <Button className="locationSearch__currentLocation__btn">
          <Icon type="gps" className="locationSearch__currentLocation__icon" />
        </Button>
      </Ellipse>
    </section>
  );
}

export default LocationSearch;
