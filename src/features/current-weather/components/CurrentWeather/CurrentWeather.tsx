import React from "react";
import { Section, Heading, Icon, WeatherImg } from "../../../../components";
import { useTodayWeather, useWeatherLocation } from "../../../../hooks/weather";
import { formatDate } from "../../../../utils/datetime";
import "./CurrentWeather.scss";

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
        <span className="currentWeather__locationPlace">{cityToRender}</span>
      </p>
    </Section>
  );
}

export default CurrentWeather;
