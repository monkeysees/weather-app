import React from "react";
import { Ellipse, Icon } from "../../../../components";
import HighlightsCard from "./HighlightsCard";
import type { WindDataPoint } from "../../../../types/weather";
import { getDegreeForDirection } from "../../../../utils/weather";
import styles from "./WindStatusCard.module.scss";

interface Props {
  title: string;
  windInfo: WindDataPoint;
}

function WindStatusCard({ title, windInfo: { speed, direction } }: Props) {
  return (
    <HighlightsCard title={title} value={speed.value} unit={speed.unit}>
      <section className={styles.direction}>
        <Ellipse className={styles.iconWrapper}>
          <Icon
            type="direction"
            className={styles.icon}
            style={{
              transform: `rotate(${getDegreeForDirection(direction)}deg)`,
            }}
          />
        </Ellipse>

        <span className={styles.text}>{direction}</span>
      </section>
    </HighlightsCard>
  );
}

export default WindStatusCard;
