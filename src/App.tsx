import React from "react";
import WeatherContext from "./providers/WeatherContext";
import MOCK_RESPONSE from "./utils/mockResponse";
import { extractWeatherData } from "./utils/weather";
import "./App.scss";
import Forecast from "./features/forecast";
import Hightlights from "./features/highlights";

function App() {
  return (
    <WeatherContext.Provider value={extractWeatherData(MOCK_RESPONSE)}>
      <main className="app">
        <Forecast />
        <Hightlights />
      </main>
    </WeatherContext.Provider>
  );
}

export default App;
