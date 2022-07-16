import { zipWith, chunk, meanBy, map, pick, mapKeys, mapValues } from "lodash";
import { startOfToday, differenceInCalendarDays, startOfDay } from "date-fns";
import { getMostFreqValue } from "./misc";
import { assertUnreachable } from "./types";
import type {
  WeatherCode,
  WeatherType,
  WindDirection,
  WeatherDayData,
  Weather,
  TemperatureUnit,
  CityLocation,
} from "../types/weather";

const weatherDescriptionByCode: {
  [key in WeatherCode]: {
    type: WeatherType;
    title: string;
    details: string;
  };
} = {
  0: {
    type: "clear",
    title: "Clear",
    details: "Clear sky",
  },
  1: {
    type: "light-cloud",
    title: "Mainly clear",
    details: "Mainly clear",
  },
  2: {
    type: "light-cloud",
    title: "Partly cloudy",
    details: "Partly cloudy",
  },
  3: {
    type: "heavy-cloud",
    title: "Overcast",
    details: "Overcast",
  },
  45: {
    type: "heavy-cloud",
    title: "Fog",
    details: "Fog",
  },
  48: {
    type: "snow",
    title: "Freezing fog",
    details: "Depositing rime fog",
  },
  51: {
    type: "light-rain",
    title: "Light drizzle",
    details: "Drizzle: light intensity",
  },
  53: {
    type: "light-rain",
    title: "Moderate drizzle",
    details: "Drizzle: moderate intensity",
  },
  55: {
    type: "light-rain",
    title: "Intense drizzle",
    details: "Drizzle: dense intensity",
  },
  56: {
    type: "sleet",
    title: "Light freezing drizzle",
    details: "Freezing drizzle: light intensity",
  },
  57: {
    type: "sleet",
    title: "Intense freezing drizzle",
    details: "Freezing drizzle: dense intensity",
  },
  61: {
    type: "heavy-rain",
    title: "Light rain",
    details: "Rain: slight intensity",
  },
  63: {
    type: "heavy-rain",
    title: "Moderate rain",
    details: "Rain: moderate intensity",
  },
  65: {
    type: "heavy-rain",
    title: "",
    details: "Rain: heavy intensity",
  },
  66: {
    type: "sleet",
    title: "Light freezing rain",
    details: "Freezing rain: light intensity",
  },
  67: {
    type: "sleet",
    title: "Heavy freezing rain",
    details: "Freezing rain: heavy intensity",
  },
  71: {
    type: "snow",
    title: "Light snowfall",
    details: "Snow fall: slight intensity",
  },
  73: {
    type: "snow",
    title: "Moderate snowfall",
    details: "Snow fall: moderate intensity",
  },
  75: {
    type: "snow",
    title: "Heavy snowfall",
    details: "Snow fall:  heavy intensity",
  },
  77: {
    type: "hail",
    title: "Hail",
    details: "Snow grains",
  },
  80: {
    type: "shower",
    title: "Light shower",
    details: "Rain showers: slight",
  },
  81: {
    type: "shower",
    title: "Moderate shower",
    details: "Rain showers: moderate",
  },
  82: {
    type: "shower",
    title: "Violent shower",
    details: "Rain showers: violent",
  },
  85: {
    type: "snow",
    title: "Light snow",
    details: "Snow showers slight",
  },
  86: {
    type: "snow",
    title: "Heavy snow",
    details: "Snow showers heavy",
  },
  95: {
    type: "thunderstorm",
    title: "Light thunderstorm",
    details: "Thunderstorm: Slight or moderate",
  },
  96: {
    type: "thunderstorm",
    title: "Thunderstorm with light hail",
    details: "Thunderstorm with slight hail",
  },
  99: {
    type: "thunderstorm",
    title: "Thunderstorm with heavy hail",
    details: "Thunderstorm with heavy hail",
  },
};

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

function getDegreeForDirection(dir: WindDirection) {
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

function mapRawFieldname(field: string) {
  switch (field) {
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

function mapRawUnit(unit: string) {
  switch (unit) {
    case "hPa":
      return "mb";
    default:
      return unit;
  }
}

function extractWeatherData(rawResponseData: any): Weather {
  const rawHourlyData = rawResponseData.hourly as { [key: string]: any[] };
  const unitsInfo = mapValues(
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
    (v) => mapRawUnit(v),
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
      tsUnix,
      weatherCode,
      temperature,
      pressure,
      humidity,
      cloudiness,
      windSpeed,
      windDegree,
    ) => ({
      date: new Date(tsUnix * 1000),
      weatherCode,
      temperature,
      pressure,
      humidity,
      cloudiness,
      windSpeed,
      windDirection: getDirectionFromDegree(windDegree),
    }),
  );
  const today = startOfToday();
  const dataForLast5Days = combinedResData.filter(({ date }) => {
    const daysDifference = differenceInCalendarDays(date, today);
    return daysDifference >= 0 && daysDifference <= 5;
  });
  const rawDataByDays = chunk(dataForLast5Days, 24);
  const daysData = rawDataByDays.map((dayData) => ({
    date: startOfDay(dayData[0].date),
    description:
      weatherDescriptionByCode[
        Number(getMostFreqValue(map(dayData, "weatherCode"))) as WeatherCode
      ],
    temperature: {
      day: {
        value: Math.round(meanBy(dayData.slice(12, 19), "temperature")),
        unit: unitsInfo.temperature,
      },
      night: {
        value: Math.round(
          meanBy(dayData.slice(0, 7).concat(dayData.slice(19)), "temperature"),
        ),
        unit: unitsInfo.temperature,
      },
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
      direction: getMostFreqValue(map(dayData, "windDirection")),
    },
  })) as WeatherDayData[];

  return {
    coords: rawResponseData.coords,
    daysData,
  };
}

function extractCitiesData(rawResponseData: {
  results?: any[];
}): CityLocation[] {
  if (!rawResponseData.results) {
    return [];
  }

  return rawResponseData.results.map((rawLocation) => ({
    city: rawLocation.name,
    adminZone1: rawLocation.admin1,
    country: rawLocation.country,
    coords: {
      lat: rawLocation.latitude,
      lon: rawLocation.longitude,
    },
  }));
}

function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit,
) {
  if (from === to) {
    return value;
  }

  if (from === "°C" && to === "°F") {
    return Math.round(value * 1.8 + 32);
  }

  if (from === "°F" && to === "°C") {
    return Math.round((value - 32) / 1.8);
  }

  throw Error("Only conversion from/to °C and °F are supported.");
}

function convertWeatherTemperatures(
  weatherData: Weather,
  newUnit: TemperatureUnit,
) {
  const convertedDaysData = weatherData.daysData.map((dayData) => {
    const newDayData: WeatherDayData = { ...dayData };
    newDayData.temperature = {
      day: {
        value: convertTemperature(
          dayData.temperature.day.value,
          dayData.temperature.day.unit,
          newUnit,
        ),
        unit: newUnit,
      },
      night: {
        value: convertTemperature(
          dayData.temperature.night.value,
          dayData.temperature.night.unit,
          newUnit,
        ),
        unit: newUnit,
      },
    };
    return newDayData;
  });
  return {
    ...weatherData,
    daysData: convertedDaysData,
  };
}

export {
  extractCitiesData,
  extractWeatherData,
  getDegreeForDirection,
  convertWeatherTemperatures,
};
