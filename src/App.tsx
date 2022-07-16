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
import "./App.scss";

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
      <main className="app">
        <div className="app__locationSearch">
          <LocationSearch />
        </div>
        <div className="app__unitsSwitch">
          <UnitsSwitch />
        </div>
        <div className="app__main">
          <div className="app__currentWeather">
            <img
              src={cloudsBgImgSrc}
              alt=""
              className="app__currentWeatherBg"
            />
            <CurrentWeather />
          </div>
          <div className="app__forecast-with-highlights">
            <Forecast />
            <Hightlights />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
