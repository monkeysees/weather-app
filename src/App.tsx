import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "./providers/UserProvider";
import {
  getWeatherQueryState,
  useIsFetchingWeather,
} from "./providers/DataQueryProvider";
import { ErrorBoundary } from "./components";
import LocationSearch from "./features/location-search";
import UnitsSwitch from "./features/units-switch";
import CurrentWeather from "./features/current-weather";
import Forecast from "./features/forecast";
import Hightlights from "./features/highlights";
import cloudsBgImgSrc from "./assets/images/background/clouds.png";
import { registerWindowResizeHandler } from "./utils/dom";
import styles from "./App.module.scss";

function App() {
  const {
    location: { current: currentLocation },
  } = useUser();
  const isFetchingCurrentWeather = useIsFetchingWeather(currentLocation);
  const [isFetchedFirstWeather, setIsFetchedFirstWeather] = useState(false);

  useEffect(() => {
    if (isFetchingCurrentWeather) {
      toast.loading("Fetching weather…", { id: "weather_loading" });
    } else {
      toast.dismiss("weather_loading");

      if (!isFetchedFirstWeather) {
        const currentWeatherQueryStatus =
          getWeatherQueryState(currentLocation)?.status;
        if (currentWeatherQueryStatus === "success") {
          setIsFetchedFirstWeather(true);
        }
      }
    }
  }, [currentLocation, isFetchedFirstWeather, isFetchingCurrentWeather]);
  useEffect(() => {
    registerWindowResizeHandler();
  }, []);

  return (
    <>
      <Toaster />
      <main className={styles.app}>
        <div className={styles.locationSearch}>
          <ErrorBoundary>
            <LocationSearch />
          </ErrorBoundary>
        </div>
        <div className={styles.unitsSwitch}>
          <ErrorBoundary>
            <UnitsSwitch />
          </ErrorBoundary>
        </div>
        <div className={styles.main}>
          <div
            className={
              isFetchedFirstWeather
                ? styles.currentWeather
                : styles.currentWeather_fetching
            }
          >
            <img
              src={cloudsBgImgSrc}
              alt=""
              className={styles.currentWeatherBg}
            />
            <ErrorBoundary>
              <CurrentWeather />
            </ErrorBoundary>
          </div>
          <div className={styles.forecastAndHighlights}>
            <ErrorBoundary>
              <Forecast />
              <Hightlights />
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
