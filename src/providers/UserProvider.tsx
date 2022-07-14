import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ChildrenProps } from "../types/props";
import { TemperatureUnit, Location } from "../types/weather";
import { assertUnreachable } from "../utils/types";

type UserLocation = {
  current: Location;
  searchHistory: Location[];
};

type User = {
  location: UserLocation;
  units: { temperature: TemperatureUnit };
};

interface ChangeTemperatureUnit {
  type: "change-temp-unit";
  unit: TemperatureUnit;
}

interface ChangeLocation {
  type: "change-location";
  location: Location;
}

type ReducerAction = ChangeTemperatureUnit | ChangeLocation;

function userReducer(user: User, action: ReducerAction) {
  const actionType = action.type;
  switch (actionType) {
    case "change-temp-unit": {
      const newUser = { ...user };
      newUser.units = {
        ...newUser.units,
        temperature: action.unit,
      };
      return newUser;
    }
    case "change-location": {
      const newLocation = action.location;
      const newUser = {
        ...user,
        location: { ...user.location, current: newLocation },
      };
      const { searchHistory } = user.location;
      newUser.location.searchHistory = [newLocation, ...searchHistory];
      return newUser;
    }
    default:
      return assertUnreachable(actionType);
  }
}

const initialUserData: User = {
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
    searchHistory: [
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

function initializeUser(initialValue = initialUserData) {
  const storedData = localStorage.getItem("user");
  return storedData ? (JSON.parse(storedData) as User) : initialValue;
}

const UserContext = createContext<User>(initialUserData);
const UserDispatchContext = createContext<React.Dispatch<ReducerAction>>(
  () => null,
);

function UserProvider({ children }: ChildrenProps) {
  const [user, dispatch] = useReducer(
    userReducer,
    initialUserData,
    initializeUser,
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
