import { createContext } from "react";
import type { WeatherDayData } from "../types/weather";

const WeatherContext = createContext<WeatherDayData[]>([]);

export default WeatherContext;
