import React from "react";
import { Section, Heading, Icon, WeatherImg } from "../../../../components";
import { useTodayWeather, useWeatherLocation } from "../../../../hooks/weather";
import { formatDate } from "../../../../utils/datetime";
import styles from "./CurrentWeather.module.scss";

function CurrentWeather() {
  const location = useWeatherLocation();
  const todayWeather = useTodayWeather();
  if (!todayWeather.data) {
    return null;
  }
  const {
    temperature: { day: dayTemperature },
    description: weatherDescription,
    date,
  } = todayWeather.data;

  const cityToRender = "city" in location ? location.city : "Current location";

  return (
    <Section className={styles.wrapper}>
      <WeatherImg
        type={weatherDescription.type}
        alt={weatherDescription.details}
        className={styles.image}
      />
      <p className={styles.temperature}>
        <span className={styles.temperature__value}>
          {dayTemperature.value}
        </span>
        <span className={styles.temperature__unit}>{dayTemperature.unit}</span>
      </p>
      <p className={styles.description}>{weatherDescription.title}</p>
      <Heading className={styles.heading}>
        Today <span>•</span> {formatDate(date)}
      </Heading>
      <p className={styles.location}>
        <Icon type="location" className={styles.location__icon} />
        <span className={styles.location__place}>{cityToRender}</span>
      </p>
    </Section>
  );
}

export default CurrentWeather;
