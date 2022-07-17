import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import DataQueryProvider from "./providers/DataQueryProvider";
import { UserProvider } from "./providers/UserProvider";
import App from "./App";
import "./index.scss";

const rootElementId = "root";
const rootElement = document.getElementById(rootElementId);

if (!rootElement) {
  throw Error(`Root element with id ${rootElementId} is not provided!`);
}

const root = ReactDOM.createRoot(rootElement);
ReactModal.setAppElement(`#${rootElementId}`);

root.render(
  <React.StrictMode>
    <DataQueryProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </DataQueryProvider>
  </React.StrictMode>,
);
