import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import DataQueryProvider from "./providers/DataQueryProvider";
import { UserProvider } from "./providers/UserProvider";
import App from "./App";
import "./index.scss";

const rootElementId = "root";
ReactModal.setAppElement(`#${rootElementId}`);
const root = ReactDOM.createRoot(
  document.getElementById(rootElementId) as HTMLElement,
);

root.render(
  <React.StrictMode>
    <DataQueryProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </DataQueryProvider>
  </React.StrictMode>,
);
