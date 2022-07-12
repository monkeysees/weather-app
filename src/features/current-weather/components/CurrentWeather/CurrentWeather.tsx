import React from "react";
import { Section, Heading, Icon, WeatherImg } from "../../../../components";
import { useUser } from "../../../../providers/UserProvider";
import { useWeather } from "../../../../providers/WeatherProvider";
import { formatDate } from "../../../../utils/datetime";
import "./CurrentWeather.scss";

function CurrentWeather() {
  const weatherData = useWeather();
  const { location } = useUser();

  if (!weatherData.length) {
    return null;
  }

  const {
    temperature: { day: dayTemperature },
    description: weatherDescription,
    date,
  } = weatherData[0];

  return (
    <Section className="currentWeather">
      <WeatherImg
        type={weatherDescription.type}
        alt={weatherDescription.details}
        className="currentWeather__image"
      />
      <p className="currentWeather__temperature">
        <span className="currentWeather__temperatureValue">
          {dayTemperature.value}
        </span>
        <span className="currentWeather__temperatureUnit">
          {dayTemperature.unit}
        </span>
      </p>
      <p className="currentWeather__description">{weatherDescription.title}</p>
      <Heading className="currentWeather__heading">
        Today <span>•</span> {formatDate(date)}
      </Heading>
      <p className="currentWeather__location">
        <Icon type="location" className="currentWeather__locationIcon" />
        <span className="currentWeather__locationPlace">
          {location.current.city}
        </span>
      </p>
    </Section>
  );
}

export default CurrentWeather;
