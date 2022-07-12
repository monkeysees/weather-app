import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import "./index.scss";
import App from "./App";

const rootElementId = "root";
ReactModal.setAppElement(`#${rootElementId}`);
const root = ReactDOM.createRoot(
  document.getElementById(rootElementId) as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
