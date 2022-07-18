import React from "react";
import {
  Section,
  Heading,
  Icon,
  WeatherImg,
  Temperature,
  AppearanceFade,
} from "../../../../components";
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

  const locationName = "city" in location ? location.city : "Current location";

  return (
    <AppearanceFade started={!!todayWeather.data}>
      <Section className={styles.wrapper}>
        <WeatherImg
          type={weatherDescription.type}
          alt={weatherDescription.details}
          className={styles.image}
        />
        <Temperature
          value={dayTemperature.value}
          unit={dayTemperature.unit}
          className={styles.temperature}
          valueClassName={styles.temperature__value}
          unitClassName={styles.temperature__unit}
        />
        <p className={styles.description}>{weatherDescription.title}</p>
        <Heading className={styles.heading}>
          Today <span>•</span> {formatDate(date)}
        </Heading>
        <p className={styles.location}>
          <Icon type="location" className={styles.location__icon} />
          <span
            className={styles.location__place}
            aria-label="Weather location"
            aria-live="polite"
          >
            {locationName}
          </span>
        </p>
      </Section>
    </AppearanceFade>
  );
}

export default CurrentWeather;
