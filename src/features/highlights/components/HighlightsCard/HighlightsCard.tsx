import React from "react";
import { Section, Heading } from "../../../../components";
import styles from "./HighlightsCard.module.scss";

interface HighlightsCardProps {
  title: string;
  value: number | string;
  unit: string;
  children?: React.ReactNode;
}

function HighlightsCard({
  title,
  value,
  unit,
  children: extraContent,
}: HighlightsCardProps) {
  return (
    <Section className={styles.card}>
      <Heading className={styles.heading}>{title}</Heading>
      <p className={styles.info}>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
      </p>
      {extraContent}
    </Section>
  );
}

export type { HighlightsCardProps };

export default HighlightsCard;
