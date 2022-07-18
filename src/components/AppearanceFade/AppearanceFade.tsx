import React from "react";
import { CSSTransition } from "react-transition-group";
import { ChildrenProps } from "../../types/props";
import styles from "./AppearanceFade.module.scss";

interface Props extends ChildrenProps {
  started?: boolean;
}

function AppearanceFade({ started, children }: Props) {
  return (
    <CSSTransition
      in={started}
      unmountOnExit
      timeout={200}
      appear
      classNames={{
        ...styles,
      }}
    >
      {children}
    </CSSTransition>
  );
}

export default AppearanceFade;
