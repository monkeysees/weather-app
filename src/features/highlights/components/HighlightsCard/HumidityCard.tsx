import React from "react";
import HighlightsCard, { HighlightsCardProps } from "./HighlightsCard";
import styles from "./HumidityCard.module.scss";

function HumidityCard(props: Omit<HighlightsCardProps, "children">) {
  const { value } = props;
  return (
    <HighlightsCard {...props}>
      <section className={styles.bar}>
        <div className={styles.dividers}>
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <div className={styles.full}>
          <div className={styles.inner} style={{ width: `${value}%` }} />
        </div>
        <div className={styles.percent}>%</div>
      </section>
    </HighlightsCard>
  );
}

export default HumidityCard;
