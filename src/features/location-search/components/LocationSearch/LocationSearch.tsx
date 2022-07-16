import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { isEqual } from "lodash";
import {
  prefetchWeatherLocation,
  cancelWeatherQuery,
} from "../../../../providers/DataQueryProvider";
import { useUser, useUserDispatch } from "../../../../providers/UserProvider";
import { Button, Ellipse, Icon } from "../../../../components";
import SearchModal from "../SearchModal";
import { Location } from "../../../../types/weather";
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

function isGeolocationAccessAvailable() {
  if (!("geolocation" in navigator) || !("permissions" in navigator)) {
    return false;
  }

  return navigator.permissions
    .query({
      name: "geolocation",
    })
    .then((permissionStatus) => permissionStatus.state === "granted");
}

function LocationSearch() {
  const {
    location: { current: currentLocation },
  } = useUser();
  const userDispatch = useUserDispatch();
  const [isShowModal, setIsShowModal] = useState(false);

  const handleNewLocationSelected = useCallback(
    (location: Location) => {
      userDispatch({
        type: "change-location",
        location,
      });
    },
    [userDispatch],
  );

  const handleNewLocationHoverStart = useCallback((location: Location) => {
    prefetchWeatherLocation(location);
  }, []);

  const handleNewLocationHoverEnd = useCallback(
    (location: Location) => {
      if (!isEqual(location, currentLocation)) {
        cancelWeatherQuery(location);
      }
    },
    [currentLocation],
  );

  const handleCurrentLocationSelected = useCallback(() => {
    if ("geolocation" in navigator) {
      showGeolocationLoadingMsg();
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dismissGeolocationLoadingMsg();
          handleNewLocationSelected({
            coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
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
  }, [handleNewLocationSelected]);

  const handleCurrentLocationHoverStart = useCallback(async () => {
    if (!(await isGeolocationAccessAvailable())) {
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      handleNewLocationHoverStart({
        coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
      });
    });
  }, [handleNewLocationHoverStart]);

  const handleCurrentLocationHoverEnd = useCallback(async () => {
    if (!(await isGeolocationAccessAvailable())) {
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      handleNewLocationHoverEnd({
        coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
      });
    });
  }, [handleNewLocationHoverEnd]);

  return (
    <section className="locationSearch">
      <SearchModal
        isOpen={isShowModal}
        onRequestClose={() => setIsShowModal(false)}
        onNewLocationSelected={handleNewLocationSelected}
        onNewLocationHoverStart={handleNewLocationHoverStart}
        onNewLocationHoverEnd={handleNewLocationHoverEnd}
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
          onClick={handleCurrentLocationSelected}
          onHoverStart={handleCurrentLocationHoverStart}
          onHoverEnd={handleCurrentLocationHoverEnd}
        >
          <Icon type="gps" className="locationSearch__currentLocation__icon" />
        </Button>
      </Ellipse>
    </section>
  );
}

export default LocationSearch;
