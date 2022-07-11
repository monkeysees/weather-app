import React, { useContext } from "react";
import WeatherContext from "../../../../providers/WeatherContext";
import ForecastCard from "../ForecastCard";
import { WeatherDayData } from "../../../../types/weather";
import "./Forecast.scss";

function Forecast() {
  const weatherDataWithoutToday = useContext(WeatherContext).slice(1);
  return (
    <section className="forecast">
      {(weatherDataWithoutToday as WeatherDayData[]).map((dayData) => (
        <ForecastCard key={dayData.date.getTime()} dayData={dayData} />
      ))}
    </section>
  );
}

export default Forecast;
