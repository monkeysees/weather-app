import React from "react";
import { useUser, useUserDispatch } from "../../../../providers/UserProvider";
import { Ellipse, Button } from "../../../../components";
import { TemperatureUnit } from "../../../../types/weather";
import styles from "./UnitsSwitch.module.scss";

const temperatureUnits: TemperatureUnit[] = ["°C", "°F"];

function getClassName(
  currentUnit: TemperatureUnit,
  chosenUnit: TemperatureUnit,
) {
  return currentUnit === chosenUnit ? styles.switch_active : styles.switch;
}

function UnitsSwitch() {
  const {
    units: { temperature: userTempUnit },
  } = useUser();
  const userDispatch = useUserDispatch();

  function handleTempUnitSwitch(unit: TemperatureUnit) {
    userDispatch({ type: "change-temp-unit", unit });
  }

  return (
    <div className={styles.wrapper}>
      {temperatureUnits.map((tempUnit) => (
        <Ellipse
          key={tempUnit}
          className={getClassName(userTempUnit, tempUnit)}
        >
          <Button
            className={styles.button}
            onClick={() => handleTempUnitSwitch(tempUnit)}
            aria={{ "aria-label": `Switch to temperature unit ${tempUnit}` }}
          >
            <span className={styles.unit}>{tempUnit}</span>
          </Button>
        </Ellipse>
      ))}
    </div>
  );
}

export default UnitsSwitch;
