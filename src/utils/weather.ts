import { zipWith, chunk, meanBy, map, set, pick, mapKeys } from "lodash";
import {
  startOfToday,
  getUnixTime,
  addDays,
  startOfDay,
  endOfDay,
} from "date-fns";
import { getMostFreqValue } from "./func";
import { assertUnreachable } from "./types";
import { Direction } from "../types/weather";

function getDirectionFromDegree(deg: number) {
  if ((deg >= 348.75 && deg <= 360) || (deg >= 0 && deg < 11.25)) {
    return "N";
  }

  if (deg >= 11.25 && deg < 33.75) {
    return "NNE";
  }

  if (deg >= 33.75 && deg < 56.25) {
    return "NE";
  }

  if (deg >= 56.25 && deg < 78.75) {
    return "ENE";
  }

  if (deg >= 78.75 && deg < 101.25) {
    return "E";
  }

  if (deg >= 101.25 && deg < 123.75) {
    return "ESE";
  }

  if (deg >= 123.75 && deg < 146.25) {
    return "SE";
  }

  if (deg >= 146.25 && deg < 168.75) {
    return "SSE";
  }

  if (deg >= 168.75 && deg < 191.25) {
    return "S";
  }

  if (deg >= 191.25 && deg < 213.75) {
    return "SSW";
  }

  if (deg >= 213.75 && deg < 236.25) {
    return "SW";
  }

  if (deg >= 236.25 && deg < 258.75) {
    return "WSW";
  }

  if (deg >= 258.75 && deg < 281.25) {
    return "W";
  }

  if (deg >= 281.25 && deg < 303.75) {
    return "WNW";
  }

  if (deg >= 303.75 && deg < 326.25) {
    return "NW";
  }

  if (deg >= 326.25 && deg < 348.75) {
    return "NNW";
  }

  throw Error("Degree must be between 0 and 360.");
}

function getDegreeForDirection(dir: Direction) {
  switch (dir) {
    case "N": {
      return 0;
    }
    case "NNE": {
      return 22.5;
    }
    case "NE": {
      return 45;
    }
    case "ENE": {
      return 67.5;
    }
    case "E": {
      return 90;
    }
    case "ESE": {
      return 112.5;
    }
    case "SE": {
      return 135;
    }
    case "SSE": {
      return 157.5;
    }
    case "S": {
      return 180;
    }
    case "SSW": {
      return 202.5;
    }
    case "SW": {
      return 225;
    }
    case "WSW": {
      return 247.5;
    }
    case "W": {
      return 270;
    }
    case "WNW": {
      return 292.5;
    }
    case "NW": {
      return 315;
    }
    case "NNW": {
      return 337.5;
    }
    default:
      return assertUnreachable(dir);
  }
}

function getStartOfToday() {
  return startOfToday();
}

function getEndOfNthDayFromToday(n: number) {
  return endOfDay(startOfDay(addDays(new Date(), n)));
}

function mapRawFieldname(field: string) {
  switch (field) {
    case "time":
      return "ts";
    case "temperature_2m":
      return "temperature";
    case "pressure_msl":
      return "pressure";
    case "relativehumidity_2m":
      return "humidity";
    case "cloudcover":
      return "cloudiness";
    case "weathercode":
      return "weatherCode";
    case "windspeed_10m":
      return "windSpeed";
    default:
      throw Error("Unknown field is given.");
  }
}

function extractWeatherData(rawResponseData: any) {
  const rawHourlyData = rawResponseData.hourly as { [key: string]: any[] };
  const unitsInfo = set(
    mapKeys(
      pick(rawResponseData.hourly_units, [
        "temperature_2m",
        "pressure_msl",
        "relativehumidity_2m",
        "cloudcover",
        "windspeed_10m",
      ]),
      (_, k) => mapRawFieldname(k),
    ),
    "pressure",
    "mb",
  );
  const combinedResData = zipWith(
    rawHourlyData.time,
    rawHourlyData.weathercode,
    rawHourlyData.temperature_2m,
    rawHourlyData.pressure_msl,
    rawHourlyData.relativehumidity_2m,
    rawHourlyData.cloudcover,
    rawHourlyData.windspeed_10m,
    rawHourlyData.winddirection_10m,
    (
      ts,
      weatherCode,
      temperature,
      pressure,
      humidity,
      cloudiness,
      windSpeed,
      windDegree,
    ) => ({
      ts,
      weatherCode,
      temperature,
      pressure,
      humidity,
      cloudiness,
      windSpeed,
      windDirection: getDirectionFromDegree(windDegree),
    }),
  );
  const startOfTodayTs = getUnixTime(getStartOfToday());
  const endOfFifthDayTs = getUnixTime(getEndOfNthDayFromToday(5));
  const dataForLast5Days = combinedResData.filter(
    ({ ts }) => ts >= startOfTodayTs && ts <= endOfFifthDayTs,
  );
  const rawDataByDays = chunk(dataForLast5Days, 24);

  return rawDataByDays.map((dayData) => ({
    weatherCode: {
      value: Number(getMostFreqValue(map(dayData, "weatherCode"))),
      unit: "",
    },
    temperature: {
      value: Math.round(meanBy(dayData, "temperature")),
      unit: unitsInfo.temperature,
    },
    pressure: {
      value: Math.round(meanBy(dayData, "pressure")),
      unit: unitsInfo.pressure,
    },
    humidity: {
      value: Math.round(meanBy(dayData, "humidity")),
      unit: unitsInfo.humidity,
    },
    cloudiness: {
      value: Math.round(meanBy(dayData, "cloudiness")),
      unit: unitsInfo.cloudiness,
    },
    wind: {
      speed: {
        value: Math.round(meanBy(dayData, "windSpeed")),
        unit: unitsInfo.windSpeed,
      },
      direction: {
        value: getMostFreqValue(map(dayData, "windDirection")),
        unit: "",
      },
    },
  }));
}

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear, partly cloudy, and overcast",
  2: "Mainly clear, partly cloudy, and overcast",
  3: "Mainly clear, partly cloudy, and overcast",
  45: "Fog and depositing rime fog",
  48: "Fog and depositing rime fog",
  51: "Drizzle: Light, moderate, and dense intensity",
  53: "Drizzle: Light, moderate, and dense intensity",
  55: "Drizzle: Light, moderate, and dense intensity",
  56: "Freezing Drizzle: Light and dense intensity",
  57: "Freezing Drizzle: Light and dense intensity",
  61: "Rain: Slight, moderate and heavy intensity",
  63: "Rain: Slight, moderate and heavy intensity",
  65: "Rain: Slight, moderate and heavy intensity",
  66: "Freezing Rain: Light and heavy intensity",
  67: "Freezing Rain: Light and heavy intensity",
  71: "Snow fall: Slight, moderate, and heavy intensity",
  73: "Snow fall: Slight, moderate, and heavy intensity",
  75: "Snow fall: Slight, moderate, and heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight, moderate, and violent",
  81: "Rain showers: Slight, moderate, and violent",
  82: "Rain showers: Slight, moderate, and violent",
  85: "Snow showers slight and heavy",
  86: "Snow showers slight and heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight and heavy hail",
  99: "Thunderstorm with slight and heavy hail",
};

export { extractWeatherData, getDegreeForDirection, weatherCodes };
