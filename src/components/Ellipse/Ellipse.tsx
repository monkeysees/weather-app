import React from "react";
import { ChildrenProps } from "../../types/props";

interface Props extends ChildrenProps {
  className?: string;
}

function Ellipse({ className, children }: Props) {
  return (
    <div
      className={className}
      style={{ borderRadius: "50%", display: "grid", placeContent: "center" }}
    >
      {children}
    </div>
  );
}

export default Ellipse;
