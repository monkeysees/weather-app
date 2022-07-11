type WeatherCode =
  | 0
  | 1
  | 2
  | 3
  | 45
  | 48
  | 51
  | 53
  | 55
  | 56
  | 57
  | 61
  | 63
  | 65
  | 66
  | 67
  | 71
  | 73
  | 75
  | 77
  | 80
  | 81
  | 82
  | 85
  | 86
  | 95
  | 96
  | 99;

type WeatherType =
  | "clear"
  | "hail"
  | "heavy-cloud"
  | "heavy-rain"
  | "light-cloud"
  | "light-rain"
  | "shower"
  | "sleet"
  | "snow"
  | "thunderstorm";

type WindDirection =
  | "N"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "S"
  | "SSW"
  | "SW"
  | "WSW"
  | "W"
  | "WNW"
  | "NW"
  | "NNW";

type BaseWeatherDataPoint<ValueType, UnitType> = {
  value: ValueType;
  unit: UnitType;
};

type TemperatureDataPoint = BaseWeatherDataPoint<number, "°C" | "°F">;

type WindDataPoint = {
  speed: BaseWeatherDataPoint<number, "km/h" | "mph">;
  direction: WindDirection;
};

interface WeatherDayData {
  date: Date;
  description: {
    type: WeatherType;
    title: string;
    details: string;
  };
  temperature: { day: TemperatureDataPoint; night: TemperatureDataPoint };
  pressure: BaseWeatherDataPoint<number, "mb">;
  humidity: BaseWeatherDataPoint<number, "%">;
  cloudiness: BaseWeatherDataPoint<number, "%">;
  wind: WindDataPoint;
}

export type { WindDirection, WindDataPoint, WeatherCode, WeatherType, WeatherDayData };
