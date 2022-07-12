import React from "react";
import { ChildrenProps } from "../../types/props";
import "./Button.scss";

type ButtonType = React.ButtonHTMLAttributes<unknown>["type"];

interface Props extends ChildrenProps {
  className?: string;
  type?: ButtonType;
}
function Button({ className: propClassName, type, children }: Props) {
  const className = propClassName
    ? `base-button ${propClassName}`
    : `base-button`;
  const btnType = type || "button";
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} type={btnType}>
      {children}
    </button>
  );
}

export default Button;
