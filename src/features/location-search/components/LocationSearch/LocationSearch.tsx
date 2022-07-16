import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUserDispatch } from "../../../../providers/UserProvider";
import { Button, Ellipse, Icon } from "../../../../components";
import SearchModal from "../SearchModal";
import "./LocationSearch.scss";

function getGeolocationErrorMsg(e: GeolocationPositionError) {
  switch (e.code) {
    case e.PERMISSION_DENIED:
      return "User denied geolocation";
    case e.POSITION_UNAVAILABLE:
      return "Geolocation could not be determined";
    case e.TIMEOUT:
      return "Geolocation access timeout";
    default:
      return "Something went wrong";
  }
}

function showGeolocationLoadingMsg() {
  toast.loading("Accessing geolocation…", {
    id: "geolocation_loading",
  });
}

function dismissGeolocationLoadingMsg() {
  toast.dismiss("geolocation_loading");
}

function LocationSearch() {
  const userDispatch = useUserDispatch();
  const [isShowModal, setIsShowModal] = useState(false);

  function handleCurrentLocationSelected() {
    if ("geolocation" in navigator) {
      showGeolocationLoadingMsg();
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dismissGeolocationLoadingMsg();
          userDispatch({
            type: "change-location",
            location: {
              coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
            },
          });
        },
        (e) => {
          dismissGeolocationLoadingMsg();
          toast.error(getGeolocationErrorMsg(e), {
            id: "geolocation_not-available",
          });
        },
      );
    } else {
      toast.error("Browser does not provide geolocation functionality", {
        id: "geolocation_no-functionality",
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
