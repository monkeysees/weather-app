import React from "react";
import { useWeather } from "../../../../hooks/weather";
import { AppearanceFade } from "../../../../components";
import ForecastCard from "../ForecastCard";
import styles from "./Forecast.module.scss";

function Forecast() {
  const weatherDataWithoutToday = useWeather().daysData.slice(1);
  return (
    <AppearanceFade started={!!weatherDataWithoutToday.length}>
      <section className={styles.wrapper}>
        {weatherDataWithoutToday.map((dayData) => (
          <ForecastCard key={dayData.date.getTime()} dayData={dayData} />
        ))}
      </section>
    </AppearanceFade>
  );
}

export default Forecast;
