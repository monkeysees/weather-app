import React from "react";
import WeatherContext from "./providers/WeatherContext";
import MOCK_RESPONSE from "./utils/mockResponse";
import { extractWeatherData } from "./utils/weather";
import "./App.scss";
import CurrentWeather from "./features/current-weather";
import Forecast from "./features/forecast";
import cloudsBgImgSrc from "./assets/images/background/clouds.png";
import Hightlights from "./features/highlights";

function App() {
  return (
    <WeatherContext.Provider value={extractWeatherData(MOCK_RESPONSE)}>
      <main className="app">
        <div className="app__currentWeather">
          <img src={cloudsBgImgSrc} alt="" className="app__currentWeatherBg" />
          <CurrentWeather />
        </div>
        <div className="app__forecast-with-highlights">
          <Forecast />
          <Hightlights />
        </div>
      </main>
    </WeatherContext.Provider>
  );
}

export default App;
