import React from "react";
import styles from "./Spinner.module.scss";

interface Props {
  className?: string;
  ariaLabel?: string;
}

function Spinner({ className, ariaLabel }: Props) {
  const isAriaTextProvided = ariaLabel && ariaLabel.length > 0;

  const spinnerClassName = className
    ? `${styles.spinner} ${className}`
    : styles.spinner;
  return (
    <div className={spinnerClassName}>
      {isAriaTextProvided && (
        <span className="sr-only" role="alert" aria-label={ariaLabel} />
      )}
    </div>
  );
}

export default Spinner;
