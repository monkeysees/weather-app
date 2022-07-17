import React from "react";
import { useWeather } from "../../../../hooks/weather";
import ForecastCard from "../ForecastCard";
import { WeatherDayData } from "../../../../types/weather";
import styles from "./Forecast.module.scss";

function Forecast() {
  const weatherDataWithoutToday = useWeather().daysData.slice(1);
  return (
    <section className={styles.wrapper}>
      {(weatherDataWithoutToday as WeatherDayData[]).map((dayData) => (
        <ForecastCard key={dayData.date.getTime()} dayData={dayData} />
      ))}
    </section>
  );
}

export default Forecast;
