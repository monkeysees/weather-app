import React from "react";
import WeatherContext from "./providers/WeatherContext";
import MOCK_RESPONSE from "./utils/mockResponse";
import { extractWeatherData } from "./utils/weather";
import "./App.scss";
import Hightlights from "./features/highlights";

function App() {
  return (
    <WeatherContext.Provider value={extractWeatherData(MOCK_RESPONSE)}>
      <div className="app">
        <Hightlights />
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
