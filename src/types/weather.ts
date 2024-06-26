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

type TemperatureUnit = "°C" | "°F";
type SpeedUnit = "km/h" | "mp/h";
type Coordinates = {
  lat: number;
  lon: number;
};

type BaseWeatherDataPoint<ValueType, UnitType> = {
  value: ValueType;
  unit: UnitType;
};

type TemperatureDataPoint = BaseWeatherDataPoint<number, TemperatureUnit>;

type WindDataPoint = {
  speed: BaseWeatherDataPoint<number, SpeedUnit>;
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

interface Weather {
  coords: Coordinates;
  daysData: WeatherDayData[];
}

interface TodayWeather {
  coords: Coordinates;
  data?: WeatherDayData;
}

interface BaseLocation {
  coords: { lat: number; lon: number };
}

interface CurrentLocation extends BaseLocation {}

interface CityLocation extends BaseLocation {
  city: string;
  adminZone1?: string;
  country?: string;
}

type Location = CurrentLocation | CityLocation;

export type {
  WindDirection,
  WindDataPoint,
  TemperatureUnit,
  WeatherCode,
  WeatherType,
  WeatherDayData,
  Weather,
  TodayWeather,
  Coordinates,
  Location,
  CurrentLocation,
  CityLocation,
};
