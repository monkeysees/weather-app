import React from "react";
import { useWeather } from "../../../../hooks/weather";
import ForecastCard from "../ForecastCard";
import { WeatherDayData } from "../../../../types/weather";
import "./Forecast.scss";

function Forecast() {
  const weatherDataWithoutToday = useWeather().daysData.slice(1);
  return (
    <section className="forecast">
      {(weatherDataWithoutToday as WeatherDayData[]).map((dayData) => (
        <ForecastCard key={dayData.date.getTime()} dayData={dayData} />
      ))}
    </section>
  );
}

export default Forecast;
