import React, { useContext } from "react";
import WeatherContext from "../../../../providers/WeatherContext";
import { Section, Heading } from "../../../../components";
import HighlightsCard from "../HighlightsCard";
import HumidityCard from "../HighlightsCard/HumidityCard";
import WindStatusCard from "../HighlightsCard/WindStatusCard";
import "./Highlights.scss";

const highlightsItems = [
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
  const weatherData = useContext(WeatherContext);
  const highlightsData = weatherData[0];
  return (
    <Section className="highlights">
      <Heading className="highlights__heading">Today’s highlights</Heading>
      <section className="highlights__cards">
        {highlightsItems.map((it) => {
          switch (it.id) {
            case "wind":
              return (
                <WindStatusCard
                  key={it.id}
                  title={it.title}
                  windInfo={highlightsData[it.id]}
                />
              );
            case "humidity":
              return (
                <HumidityCard
                  key={it.id}
                  title={it.title}
                  value={highlightsData[it.id].value}
                  unit={highlightsData[it.id].unit}
                />
              );
            default:
              return (
                <HighlightsCard
                  key={it.id}
                  title={it.title}
                  value={highlightsData[it.id].value}
                  unit={highlightsData[it.id].unit}
                />
              );
          }
        })}
      </section>
    </Section>
  );
}

export default Hightlights;
