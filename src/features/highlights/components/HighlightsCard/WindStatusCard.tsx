import React from "react";
import { Ellipse, Icon } from "../../../../components";
import HighlightsCard from "./HighlightsCard";
import type { WindDataPoint } from "../../../../types/weather";
import { getDegreeForDirection } from "../../../../utils/weather";
import "./WindStatusCard.scss";

interface Props {
  title: string;
  windInfo: WindDataPoint;
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
              transform: `rotate(${getDegreeForDirection(direction)}deg)`,
            }}
          />
        </Ellipse>

        <span className="windStatusCardDirection__text">{direction}</span>
      </section>
    </HighlightsCard>
  );
}

export default WindStatusCard;
