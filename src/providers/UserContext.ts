import { createContext } from "react";

const UserContext = createContext<{
  location: string;
  units: { temperature: "°C" | "°F" };
}>({
  location: "Moscow",
  units: {
    temperature: "°C",
  },
});

export default UserContext;
