import React from "react";
import { Section, Heading, AppearanceFade } from "../../../../components";
import { useTodayWeather } from "../../../../hooks/weather";
import HighlightsCard from "../HighlightsCard";
import HumidityCard from "../HighlightsCard/HumidityCard";
import WindStatusCard from "../HighlightsCard/WindStatusCard";
import styles from "./Highlights.module.scss";

const highlightsItems: {
  id: "wind" | "humidity" | "cloudiness" | "pressure";
  title: string;
}[] = [
  {
    id: "wind",
    title: "Wind status",
  },
  {
    id: "humidity",
    title: "Humidity",
  },
  {
    id: "cloudiness",
    title: "Cloudiness",
  },
  {
    id: "pressure",
    title: "Air pressure",
  },
];

function Hightlights() {
  const todayWeather = useTodayWeather();
  if (!todayWeather.data) {
    return null;
  }
  const todayWeatherData = todayWeather.data;

  return (
    <AppearanceFade started={!!todayWeather.data}>
      <Section>
        <Heading className={styles.heading}>Today’s highlights</Heading>
        <section className={styles.cards}>
          {highlightsItems.map((it) => {
            switch (it.id) {
              case "wind":
                return (
                  <WindStatusCard
                    key={it.id}
                    title={it.title}
                    windInfo={todayWeatherData[it.id]}
                  />
                );
              case "humidity":
                return (
                  <HumidityCard
                    key={it.id}
                    title={it.title}
                    value={todayWeatherData[it.id].value}
                    unit={todayWeatherData[it.id].unit}
                  />
                );
              default:
                return (
                  <HighlightsCard
                    key={it.id}
                    title={it.title}
                    value={todayWeatherData[it.id].value}
                    unit={todayWeatherData[it.id].unit}
                  />
                );
            }
          })}
        </section>
      </Section>
    </AppearanceFade>
  );
}

export default Hightlights;
