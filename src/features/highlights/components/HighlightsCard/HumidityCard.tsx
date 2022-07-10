import React from "react";
import HighlightsCard, { HighlightsCardProps } from "./HighlightsCard";
import "./HumidityCard.scss";

function HumidityCard(props: Omit<HighlightsCardProps, "children">) {
  const { value } = props;
  return (
    <HighlightsCard {...props}>
      <section className="humidityCardBar">
        <div className="humidityCardBar__dividers">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <div className="humidityCardBar__full">
          <div
            className="humidityCardBar__inner"
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="humidityCardBar__percent">%</div>
      </section>
    </HighlightsCard>
  );
}

export default HumidityCard;
