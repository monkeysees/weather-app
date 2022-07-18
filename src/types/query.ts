interface WeatherResponseBase {
  hourly_units: {
    temperature_2m: "°C";
    cloudcover: "%";
    windspeed_10m: "km/h";
    relativehumidity_2m: "%";
    pressure_msl: "hPa";
  };
  hourly: {
    pressure_msl: number[];
    temperature_2m: number[];
    winddirection_10m: number[];
    relativehumidity_2m: number[];
    weathercode: number[];
    time: number[];
    windspeed_10m: number[];
    cloudcover: number[];
  };
}
interface WeatherResponse extends WeatherResponseBase {}
interface WeatherResponseWithCoords extends WeatherResponse {
  coords: {
    lat: number;
    lon: number;
  };
}

interface CityResponseResultBase {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
  admin1?: string;
}
interface CityResponseResult extends CityResponseResultBase {}
interface CitiesResponse {
  results: CityResponseResult[];
  generationtime_ms: number;
}

export type { WeatherResponse, WeatherResponseWithCoords, CitiesResponse };
