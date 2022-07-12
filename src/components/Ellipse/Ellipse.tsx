import React from "react";
import { ChildrenProps } from "../../types/props";
import "./Ellipse.scss";

interface Props extends ChildrenProps {
  className?: string;
}

function Ellipse({ className: propClassName, children }: Props) {
  const className = propClassName
    ? `base-ellipse ${propClassName}`
    : `base-ellipse`;
  return <div className={className}>{children}</div>;
}

export default Ellipse;
