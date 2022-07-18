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
import {
  getGeolocationErrorMsg,
  showGeolocationLoadingMsg,
  dismissGeolocationLoadingMsg,
  isGeolocationAccessAvailable,
} from "./utils";
import styles from "./LocationSearch.module.scss";

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
    <section className={styles.wrapper}>
      <SearchModal
        isOpen={isShowModal}
        onRequestClose={() => setIsShowModal(false)}
        onNewLocationSelected={handleNewLocationSelected}
        onNewLocationHoverStart={handleNewLocationHoverStart}
        onNewLocationHoverEnd={handleNewLocationHoverEnd}
      />
      <Button
        className={styles.searchBtn}
        onClick={() => setIsShowModal(true)}
        aria={{ "aria-label": "Open cities search" }}
      >
        Search for places
      </Button>
      <Ellipse className={styles.currentLocation}>
        <Button
          className={styles.currentLocation__btn}
          onClick={handleCurrentLocationSelected}
          onHoverStart={handleCurrentLocationHoverStart}
          onHoverEnd={handleCurrentLocationHoverEnd}
          aria={{ "aria-label": `Fetch weather for current location` }}
        >
          <Icon type="gps" className={styles.currentLocation__icon} />
        </Button>
      </Ellipse>
    </section>
  );
}

export default LocationSearch;
