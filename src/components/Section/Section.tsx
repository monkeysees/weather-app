import React, { useContext } from "react";
import LevelContext from "../../providers/LevelContext";
import ChildrenProps from "../../types/ChildrenProps";

interface Props extends ChildrenProps {
  className?: string;
}

function Section({ className, children }: Props) {
  const level = useContext(LevelContext);
  return (
    <section className={className}>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

export default Section;
