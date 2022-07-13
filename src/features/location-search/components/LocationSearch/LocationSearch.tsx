import React, { useState } from "react";
import { useUserDispatch } from "../../../../providers/UserProvider";
import { Button, Ellipse, Icon } from "../../../../components";
import SearchModal from "../SearchModal";
import "./LocationSearch.scss";

function LocationSearch() {
  const userDispatch = useUserDispatch();
  const [isShowModal, setIsShowModal] = useState(false);

  function handleCurrentLocationSelected() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        userDispatch({
          type: "change-location",
          location: {
            coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
          },
        });
      });
    }
  }

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
        <Button
          className="locationSearch__currentLocation__btn"
          onClick={() => handleCurrentLocationSelected()}
        >
          <Icon type="gps" className="locationSearch__currentLocation__icon" />
        </Button>
      </Ellipse>
    </section>
  );
}

export default LocationSearch;
