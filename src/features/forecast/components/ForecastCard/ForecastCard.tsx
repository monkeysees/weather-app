import React from "react";
import { isTomorrow } from "date-fns";
import { Section, Heading, WeatherImg } from "../../../../components";
import { WeatherDayData } from "../../../../types/weather";
import { formatDate } from "../../../../utils/datetime";
import styles from "./ForecastCard.module.scss";

interface Props {
  dayData: WeatherDayData;
}

function ForecastCard({ dayData: { date, description, temperature } }: Props) {
  const dayTitle = isTomorrow(date) ? "Tomorrow" : formatDate(date);
  const weatherType = description.type;
  const weatherDescriptionDetails = description.details;
  return (
    <Section className={styles.card}>
      <Heading className={styles.heading}>{dayTitle}</Heading>
      <WeatherImg
        type={weatherType}
        alt={weatherDescriptionDetails}
        className={styles.image}
      />
      <div className={styles.temperatures}>
        <span>
          {temperature.day.value}
          {temperature.day.unit}
        </span>
        <span className={styles.temperature_night}>
          {temperature.night.value}
          {temperature.night.unit}
        </span>
      </div>
    </Section>
  );
}

export default ForecastCard;
