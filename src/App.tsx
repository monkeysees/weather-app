import React, { useEffect } from "react";
import { useIsFetching } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "./providers/UserProvider";
import { getWeatherQueryKey } from "./providers/DataQueryProvider";
import cloudsBgImgSrc from "./assets/images/background/clouds.png";
import LocationSearch from "./features/location-search";
import UnitsSwitch from "./features/units-switch";
import CurrentWeather from "./features/current-weather";
import Forecast from "./features/forecast";
import Hightlights from "./features/highlights";
import styles from "./App.module.scss";

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

  return (
    <>
      <Toaster />
      <main className={styles.app}>
        <div className={styles.locationSearch}>
          <LocationSearch />
        </div>
        <div className={styles.unitsSwitch}>
          <UnitsSwitch />
        </div>
        <div className={styles.main}>
          <div className={styles.currentWeather}>
            <img
              src={cloudsBgImgSrc}
              alt=""
              className={styles.currentWeatherBg}
            />
            <CurrentWeather />
          </div>
          <div className={styles.forecastAndHighlights}>
            <Forecast />
            <Hightlights />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
