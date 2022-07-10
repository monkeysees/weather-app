import React from "react";
import Ellipse from "../../../../components/Ellipse";
import Icon from "../../../../components/Icon";
import HighlightsCard from "./HighlightsCard";
import { Direction } from "../../../../types/weather";
import { getDegreeForDirection } from "../../../../utils/weather";
import "./WindStatusCard.scss";

interface Props {
  title: string;
  windInfo: {
    speed: {
      value: number | string;
      unit: string;
    };
    direction: {
      value: Direction;
      unit: string;
    };
  };
}

function WindStatusCard({ title, windInfo: { speed, direction } }: Props) {
  return (
    <HighlightsCard title={title} value={speed.value} unit={speed.unit}>
      <section className="windStatusCardDirection">
        <Ellipse className="windStatusCardDirection__iconWrapper">
          <Icon
            type="direction"
            className="windStatusCardDirection__icon"
            style={{
              transform: `rotate(${getDegreeForDirection(direction.value)}deg)`,
            }}
          />
        </Ellipse>

        <span className="windStatusCardDirection__text">{direction.value}</span>
      </section>
    </HighlightsCard>
  );
}

export default WindStatusCard;
