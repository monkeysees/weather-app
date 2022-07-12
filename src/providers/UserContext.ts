import { createContext } from "react";
import { TemperatureUnit } from "../types/weather";

type Location = {
  city: string;
  country: string;
  coords: { lat: number; lon: number };
};

type UserLocation = {
  current: Location;
  searchedCities: Location[];
};

const UserContext = createContext<{
  location: UserLocation;
  units: { temperature: TemperatureUnit };
}>({
  location: {
    current: {
      city: "Moscow",
      country: "Russia",
      coords: {
        lat: 55.75222,
        lon: 37.61556,
      },
    },
    searchedCities: [
      {
        city: "Moscow",
        country: "Russia",
        coords: {
          lat: 55.75222,
          lon: 37.61556,
        },
      },
      {
        city: "Kyiv",
        country: "Ukraine",
        coords: {
          lat: 50.45466,
          lon: 30.5238,
        },
      },
      {
        city: "London",
        country: "United Kingdom",
        coords: {
          lat: 51.50853,
          lon: -0.12574,
        },
      },
      {
        city: "Barcelona",
        country: "Spain",
        coords: {
          lat: 41.38879,
          lon: 2.15899,
        },
      },
      {
        city: "New York",
        country: "United States",
        coords: {
          lat: 40.71427,
          lon: -74.00597,
        },
      },
    ],
  },
  units: {
    temperature: "°C",
  },
});

export default UserContext;
