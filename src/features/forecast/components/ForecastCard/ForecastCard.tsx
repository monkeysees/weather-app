import React from "react";
import { isTomorrow } from "date-fns";
import {
  Section,
  Heading,
  WeatherImg,
  Temperature,
} from "../../../../components";
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
        <Temperature
          value={temperature.day.value}
          unit={temperature.day.unit}
        />
        <Temperature
          value={temperature.night.value}
          unit={temperature.night.unit}
        />
      </div>
    </Section>
  );
}

export default ForecastCard;
