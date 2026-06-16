import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const testProps = {
  answerGrid: [
    ["C", "A", "T", "", ""],
    ["", "", "E", "", ""],
    ["D", "O", "N", "H", ""],
    ["", "", "", "E", ""],
    ["", "", "", "N", ""],
  ],
  gridProps: {
    crossWordSize: 5,
    words: ["CAT", "DON", "TEN", "HEN"],
    rows: [0, 2, 0, 2],
    cols: [0, 0, 2, 3],
    directions: ["right", "right", "down", "down"],
  },
  hints: ["Feline", "X", "Mafia Boss", "Female Chicken"]
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...testProps} />
  </StrictMode>,
);
