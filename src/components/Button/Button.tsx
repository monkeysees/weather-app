import React, { MouseEventHandler } from "react";
import { ChildrenProps } from "../../types/props";
import "./Button.scss";

type ButtonType = React.ButtonHTMLAttributes<unknown>["type"];

interface Props extends ChildrenProps {
  className?: string;
  onClick?: MouseEventHandler;
  onHoverStart?: MouseEventHandler;
  onHoverEnd?: MouseEventHandler;
  type?: ButtonType;
  aria?: React.AriaAttributes;
}
function Button({
  className: propClassName,
  type,
  onClick,
  onHoverStart,
  onHoverEnd,
  aria,
  children,
}: Props) {
  const className = propClassName
    ? `base-button ${propClassName}`
    : `base-button`;
  const btnType = type || "button";
  return (
    <button
      className={className}
      // eslint-disable-next-line react/button-has-type
      type={btnType}
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      {...aria}
    >
      {children}
    </button>
  );
}

export default Button;
