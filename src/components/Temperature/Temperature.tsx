import React from "react";

interface Props {
  value: number;
  unit: "°C" | "°F";
  className?: string;
  valueClassName?: string;
  unitClassName?: string;
}

function Temperature({
  value,
  unit,
  className,
  valueClassName,
  unitClassName,
}: Props) {
  return (
    <p className={className}>
      <span className={valueClassName}>{value}</span>
      <span className={unitClassName}>{unit}</span>
    </p>
  );
}

export default Temperature;
