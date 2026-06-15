import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";

type Direction = "left" | "right" | "up" | "down";
const crosswordSize = 5;
const wordsArray: string[] = ["Hi", "Bye", "Yes"];
const rowsArray: number[] = [0, 1, 2]
const colsArray: number[] = [0, 2, 2]
const directionsArray: Direction[] = ["right", "down", "right"]

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
