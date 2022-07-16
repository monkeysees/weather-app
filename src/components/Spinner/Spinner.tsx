import React from "react";
import styles from "./Spinner.module.scss";

interface Props {
  className?: string;
}

function Spinner({ className }: Props) {
  const spinnerClassName = className
    ? `${styles.spinner} ${className}`
    : styles.spinner;
  return <div className={spinnerClassName} />;
}

export default Spinner;
