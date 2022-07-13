import React, { createContext, useContext, useReducer } from "react";
import { ChildrenProps } from "../types/props";
import { TemperatureUnit, Location } from "../types/weather";
import { assertUnreachable } from "../utils/types";

type UserLocation = {
  current: Location;
  searchedCitiesHistory: Location[];
};

type User = {
  location: UserLocation;
  units: { temperature: TemperatureUnit };
};

const initialUser: User = {
  location: {
    current: {
      city: "Moscow",
      adminZone1: "Moscow",
      country: "Russia",
      coords: {
        lat: 55.75222,
        lon: 37.61556,
      },
    },
    searchedCitiesHistory: [
      {
        city: "Moscow",
        adminZone1: "Moscow",
        country: "Russia",
        coords: {
          lat: 55.75222,
          lon: 37.61556,
        },
      },
      {
        city: "Kyiv",
        adminZone1: "Kyiv City",
        country: "Ukraine",
        coords: {
          lat: 50.45466,
          lon: 30.5238,
        },
      },
      {
        city: "London",
        adminZone1: "England",
        country: "United Kingdom",
        coords: {
          lat: 51.50853,
          lon: -0.12574,
        },
      },
      {
        city: "Barcelona",
        adminZone1: "Catalonia",
        country: "Spain",
        coords: {
          lat: 41.38879,
          lon: 2.15899,
        },
      },
      {
        city: "New York",
        adminZone1: "New York",
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
};

interface ChangeTemperatureUnit {
  type: "change-temp-unit";
  newUnit: TemperatureUnit;
}

type ReducerAction = ChangeTemperatureUnit;

function userReducer(user: User, action: ReducerAction) {
  const actionType = action.type;
  switch (actionType) {
    case "change-temp-unit": {
      const newUser = { ...user };
      newUser.units = {
        ...newUser.units,
        temperature: action.newUnit,
      };
      return newUser;
    }
    default:
      return assertUnreachable(actionType);
  }
}

const UserContext = createContext<User>(initialUser);
const UserDispatchContext = createContext<React.Dispatch<ReducerAction>>(
  () => null,
);

function UserProvider({ children }: ChildrenProps) {
  const [user, dispatch] = useReducer(userReducer, initialUser);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

function useUserDispatch() {
  return useContext(UserDispatchContext);
}

export { useUser, useUserDispatch, UserProvider };
