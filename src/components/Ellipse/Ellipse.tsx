import React from "react";
import { ChildrenProps } from "../../types/props";
import styles from "./Ellipse.module.scss";

interface Props extends ChildrenProps {
  className?: string;
}

function Ellipse({ className: propClassName, children }: Props) {
  const className = propClassName
    ? `${styles.ellipse} ${propClassName}`
    : `${styles.ellipse}`;
  return <div className={className}>{children}</div>;
}

export default Ellipse;
