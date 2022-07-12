import React, { useContext } from "react";
import { NestingLevelContext } from "../../providers/NestingLevelProvider";
import { ChildrenProps } from "../../types/props";

interface Props extends ChildrenProps {
  className?: string;
}

function Heading({ className, children }: Props) {
  const level = useContext(NestingLevelContext);
  switch (level) {
    case 0:
      throw Error("Heading must be inside a Section!");
    case 1:
      return <h1 className={className}>{children}</h1>;
    case 2:
      return <h2 className={className}>{children}</h2>;
    case 3:
      return <h3 className={className}>{children}</h3>;
    case 4:
      return <h4 className={className}>{children}</h4>;
    case 5:
      return <h5 className={className}>{children}</h5>;
    case 6:
      return <h6 className={className}>{children}</h6>;
    default:
      throw Error(`Unknown level: ${level}`);
  }
}

export default Heading;
