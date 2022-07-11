import React from "react";
import { isTomorrow } from "date-fns";
import { Section, Heading, WeatherImg } from "../../../../components";
import { WeatherDayData } from "../../../../types/weather";
import { formatDate } from "../../../../utils/datetime";
import "./ForecastCard.scss";

interface Props {
  dayData: WeatherDayData;
}

function ForecastCard({ dayData: { date, description, temperature } }: Props) {
  const dayTitle = isTomorrow(date) ? "Tomorrow" : formatDate(date);
  const weatherType = description.type;
  const weatherDescriptionDetails = description.details;
  return (
    <Section className="forecastCard">
      <Heading className="forecastCard__heading">{dayTitle}</Heading>
      <WeatherImg
        type={weatherType}
        alt={weatherDescriptionDetails}
        className="forecastCard__image"
      />
      <div className="forecastCard__temperatures">
        <span className="forecastCard__temperature forecastCard__temperature--day">
          {temperature.day.value}
          {temperature.day.unit}
        </span>
        <span className="forecastCard__temperature forecastCard__temperature--night">
          {temperature.night.value}
          {temperature.night.unit}
        </span>
      </div>
    </Section>
  );
}

export default ForecastCard;
