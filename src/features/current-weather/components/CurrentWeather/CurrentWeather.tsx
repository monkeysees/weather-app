import React, { useContext } from "react";
import { Section, Heading, Icon, WeatherImg } from "../../../../components";
import UserContext from "../../../../providers/UserContext";
import WeatherContext from "../../../../providers/WeatherContext";
import { formatDate } from "../../../../utils/datetime";
import "./CurrentWeather.scss";

function CurrentWeather() {
  const {
    temperature: { day: dayTemperature },
    description: weatherDescription,
    date,
  } = useContext(WeatherContext)[0];
  const { location } = useContext(UserContext);
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
        <span className="currentWeather__locationPlace">{location}</span>
      </p>
    </Section>
  );
}

export default CurrentWeather;
