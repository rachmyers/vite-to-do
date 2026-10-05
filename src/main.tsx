import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  //StrictMode causes app to render twice in development mode
  // <StrictMode>
  <App />,
  //</StrictMode>,
);
