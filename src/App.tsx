import React, { useEffect } from "react";
import { useIsFetching } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "./providers/UserProvider";
import { getWeatherQueryKey } from "./providers/DataQueryProvider";
import { ErrorBoundary } from "./components";
import LocationSearch from "./features/location-search";
import UnitsSwitch from "./features/units-switch";
import CurrentWeather from "./features/current-weather";
import Forecast from "./features/forecast";
import Hightlights from "./features/highlights";
import cloudsBgImgSrc from "./assets/images/background/clouds.png";
import styles from "./App.module.scss";
import { registerWindowResizeHandler } from "./utils/dom";

function App() {
  const {
    location: { current: currentLocation },
  } = useUser();
  const isFetchingCurrentWeather = useIsFetching([
    getWeatherQueryKey(currentLocation.coords),
  ]);
  useEffect(() => {
    if (isFetchingCurrentWeather) {
      toast.loading("Fetching weather…", { id: "weather_loading" });
    } else {
      toast.dismiss("weather_loading");
    }
  }, [isFetchingCurrentWeather]);
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
          <div className={styles.currentWeather}>
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
