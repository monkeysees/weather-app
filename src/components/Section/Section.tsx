import React, { useContext } from "react";
import NestingLevelContext from "../../providers/NestingLevelProvider";
import { ChildrenProps } from "../../types/props";

interface Props extends ChildrenProps {
  className?: string;
}

function Section({ className, children }: Props) {
  const level = useContext(NestingLevelContext);
  return (
    <section className={className}>
      <NestingLevelContext.Provider value={level + 1}>
        {children}
      </NestingLevelContext.Provider>
    </section>
  );
}

export default Section;
