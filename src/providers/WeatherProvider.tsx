import React, { createContext, useContext, useReducer } from "react";
import type { TemperatureUnit, WeatherDayData } from "../types/weather";
import type { ChildrenProps } from "../types/props";
import { convertTemperature } from "../utils/weather";
import { assertUnreachable } from "../utils/types";

interface NewWeatherDataAction {
  type: "new";
  daysData: WeatherDayData[];
}

interface ConvertTemperatureUnitAction {
  type: "convert-temp-unit";
  newUnit: TemperatureUnit;
}

type ReducerAction = NewWeatherDataAction | ConvertTemperatureUnitAction;

function weatherReducer(
  weatherDaysData: WeatherDayData[],
  action: ReducerAction,
) {
  const actionType = action.type;
  switch (actionType) {
    case "new": {
      return action.daysData;
    }
    case "convert-temp-unit": {
      return weatherDaysData.map((dayData) => {
        const newDayData: WeatherDayData = { ...dayData };
        newDayData.temperature = {
          day: {
            value: convertTemperature(
              dayData.temperature.day.value,
              dayData.temperature.day.unit,
              action.newUnit,
            ),
            unit: action.newUnit,
          },
          night: {
            value: convertTemperature(
              dayData.temperature.day.value,
              dayData.temperature.day.unit,
              action.newUnit,
            ),
            unit: action.newUnit,
          },
        };
        return newDayData;
      });
    }
    default:
      return assertUnreachable(actionType);
  }
}

const WeatherContext = createContext<WeatherDayData[]>([]);
const WeatherDispatchContext = createContext<React.Dispatch<ReducerAction>>(
  () => null,
);

function WeatherProvider({ children }: ChildrenProps) {
  const [weather, dispatch] = useReducer(weatherReducer, []);

  return (
    <WeatherContext.Provider value={weather}>
      <WeatherDispatchContext.Provider value={dispatch}>
        {children}
      </WeatherDispatchContext.Provider>
    </WeatherContext.Provider>
  );
}

function useWeather() {
  return useContext(WeatherContext);
}

function useWeatherDispatch() {
  return useContext(WeatherDispatchContext);
}

export { useWeather, useWeatherDispatch, WeatherProvider };
