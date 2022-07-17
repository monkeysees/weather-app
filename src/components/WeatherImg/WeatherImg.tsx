import React from "react";
import clearSrc from "../../assets/images/weather/clear.png";
import hailSrc from "../../assets/images/weather/hail.png";
import heavyCloudSrc from "../../assets/images/weather/heavy-cloud.png";
import heavyRainSrc from "../../assets/images/weather/heavy-rain.png";
import lightCloudSrc from "../../assets/images/weather/light-cloud.png";
import lightRainSrc from "../../assets/images/weather/light-rain.png";
import showerSrc from "../../assets/images/weather/shower.png";
import sleetSrc from "../../assets/images/weather/sleet.png";
import snowSrc from "../../assets/images/weather/snow.png";
import thunderstormSrc from "../../assets/images/weather/thunderstorm.png";
import { assertUnreachable } from "../../utils/types";
import type { WeatherType } from "../../types/weather";

function getImgSrc(type: WeatherType) {
  switch (type) {
    case "clear":
      return clearSrc;
    case "hail":
      return hailSrc;
    case "heavy-cloud":
      return heavyCloudSrc;
    case "heavy-rain":
      return heavyRainSrc;
    case "light-cloud":
      return lightCloudSrc;
    case "light-rain":
      return lightRainSrc;
    case "shower":
      return showerSrc;
    case "sleet":
      return sleetSrc;
    case "snow":
      return snowSrc;
    case "thunderstorm":
      return thunderstormSrc;
    default:
      return assertUnreachable(type);
  }
}

interface Props {
  type: WeatherType;
  alt?: string;
  className?: string;
  width?: React.ImgHTMLAttributes<HTMLImageElement>["width"];
  height?: React.ImgHTMLAttributes<HTMLImageElement>["height"];
}

function WeatherImg({ type, alt = "", className, width, height }: Props) {
  return (
    <img
      src={getImgSrc(type)}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}

export default WeatherImg;
