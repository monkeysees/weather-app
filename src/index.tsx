import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import { UserProvider } from "./providers/UserProvider";
import { WeatherProvider } from "./providers/WeatherProvider";
import App from "./App";
import "./index.scss";

const rootElementId = "root";
ReactModal.setAppElement(`#${rootElementId}`);
const root = ReactDOM.createRoot(
  document.getElementById(rootElementId) as HTMLElement,
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </UserProvider>
  </React.StrictMode>,
);
