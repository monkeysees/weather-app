import React from "react";
import { Section, Heading } from "../../../../components";
import "./HighlightsCard.scss";

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
    <Section className="highlightsCard">
      <Heading className="highlightsCard__heading">{title}</Heading>
      <p className="highlightsCard__info">
        <span className="highlightsCard__value">{value}</span>
        <span className="highlightsCard__unit">{unit}</span>
      </p>
      {extraContent}
    </Section>
  );
}

export type { HighlightsCardProps };

export default HighlightsCard;
