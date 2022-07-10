import React from "react";
import { ReactComponent as ArrowRightIcon } from "../../assets/images/icons/arrow-right.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/icons/close.svg";
import { ReactComponent as DirectionIcon } from "../../assets/images/icons/direction.svg";
import { ReactComponent as GpsIcon } from "../../assets/images/icons/gps.svg";
import { ReactComponent as LocationIcon } from "../../assets/images/icons/location.svg";
import { assertUnreachable } from "../../utils/types";

interface Props {
  type: "arrow-right" | "close" | "direction" | "gps" | "location";
  style?: React.CSSProperties;
  className?: string;
}

function Icon({ type, style, className }: Props) {
  const props = {
    className,
    style,
  };
  switch (type) {
    case "arrow-right":
      return <ArrowRightIcon {...props} />;
    case "close":
      return <CloseIcon {...props} />;
    case "direction":
      return <DirectionIcon {...props} />;
    case "gps":
      return <GpsIcon {...props} />;
    case "location":
      return <LocationIcon {...props} />;
    default:
      assertUnreachable(type);
  }
}

export default Icon;
