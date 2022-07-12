import React from "react";
import { Ellipse, Button } from "../../../../components";
import { useUser, useUserDispatch } from "../../../../providers/UserProvider";
import { useWeatherDispatch } from "../../../../providers/WeatherProvider";
import "./UnitsSwitch.scss";
import { TemperatureUnit } from "../../../../types/weather";

const temperatureUnits: TemperatureUnit[] = ["°C", "°F"];

function getClassName(
  currentUnit: TemperatureUnit,
  chosenUnit: TemperatureUnit,
) {
  return currentUnit === chosenUnit
    ? "unitsSwitch unitsSwitch--active"
    : "unitsSwitch";
}

function UnitsSwitch() {
  const {
    units: { temperature: userTempUnit },
  } = useUser();
  const userDispatch = useUserDispatch();
  const weatherDispatch = useWeatherDispatch();

  function handleTempUnitSwitch(newUnit: TemperatureUnit) {
    userDispatch({ type: "change-temp-unit", newUnit });
    weatherDispatch({ type: "convert-temp-unit", newUnit });
  }

  return (
    <div className="unitsSwitches">
      {temperatureUnits.map((tempUnit) => (
        <Ellipse
          key={tempUnit}
          className={getClassName(userTempUnit, tempUnit)}
        >
          <Button
            className="unitsSwitch__btn"
            onClick={() => handleTempUnitSwitch(tempUnit)}
          >
            <span className="unitsSwitch__unit">{tempUnit}</span>
          </Button>
        </Ellipse>
      ))}
    </div>
  );
}

export default UnitsSwitch;
