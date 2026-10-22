import {
  // Profiler

  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./styles/index.css";
import App from "./App.jsx";
// import { onRenderCallback } from "./utils/profiler.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Profiler id="App" onRender={onRenderCallback}> */}
    <App />
    {/* </Profiler> */}
  </StrictMode>,
);
