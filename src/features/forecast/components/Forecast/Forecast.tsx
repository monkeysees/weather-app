import React from "react";
import { useWeather } from "../../../../hooks/weather";
import ForecastCard from "../ForecastCard";
import styles from "./Forecast.module.scss";

function Forecast() {
  const weatherDataWithoutToday = useWeather().daysData.slice(1);
  return (
    <section className={styles.wrapper}>
      {weatherDataWithoutToday.map((dayData) => (
        <ForecastCard key={dayData.date.getTime()} dayData={dayData} />
      ))}
    </section>
  );
}

export default Forecast;
