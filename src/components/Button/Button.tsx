import React, { MouseEventHandler } from "react";
import { ChildrenProps } from "../../types/props";
import "./Button.scss";

type ButtonType = React.ButtonHTMLAttributes<unknown>["type"];

interface Props extends ChildrenProps {
  className?: string;
  onClick?: MouseEventHandler;
  type?: ButtonType;
  aria?: React.AriaAttributes;
}
function Button({
  className: propClassName,
  type,
  onClick,
  aria,
  children,
}: Props) {
  const className = propClassName
    ? `base-button ${propClassName}`
    : `base-button`;
  const btnType = type || "button";
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} type={btnType} onClick={onClick} {...aria}>
      {children}
    </button>
  );
}

export default Button;
