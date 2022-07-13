import React from "react";
import cloudsBgImgSrc from "./assets/images/background/clouds.png";
import LocationSearch from "./features/location-search";
import UnitsSwitch from "./features/units-switch";
import CurrentWeather from "./features/current-weather";
import Forecast from "./features/forecast";
import Hightlights from "./features/highlights";
import "./App.scss";

function App() {
  return (
    <main className="app">
      <div className="app__locationSearch">
        <LocationSearch />
      </div>
      <div className="app__unitsSwitch">
        <UnitsSwitch />
      </div>
      <div className="app__main">
        <div className="app__currentWeather">
          <img src={cloudsBgImgSrc} alt="" className="app__currentWeatherBg" />
          <CurrentWeather />
        </div>
        <div className="app__forecast-with-highlights">
          <Forecast />
          <Hightlights />
        </div>
      </div>
    </main>
  );
}

export default App;
