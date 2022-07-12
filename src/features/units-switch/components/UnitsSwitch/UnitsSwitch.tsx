import React, { useContext } from "react";
import { Ellipse, Button } from "../../../../components";
import UserContext from "../../../../providers/UserContext";
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
  } = useContext(UserContext);
  return (
    <div className="unitsSwitches">
      {temperatureUnits.map((tempUnit) => (
        <Ellipse
          key={tempUnit}
          className={getClassName(userTempUnit, tempUnit)}
        >
          <Button className="unitsSwitch__btn">
            <span className="unitsSwitch__unit">{tempUnit}</span>
          </Button>
        </Ellipse>
      ))}
    </div>
  );
}

export default UnitsSwitch;
