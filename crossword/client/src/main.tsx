import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";

const testProps = {
  answerGrid: [
    ["C", "A", "T", "", ""],
    ["", "", "E", "", ""],
    ["D", "O", "N", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  gridProps: {
    crossWordSize: 5,
    words: ["CAT", "DON", "TEN"],
    rows: [0, 2, 0],
    cols: [0, 0, 2],
    directions: ["right", "right", "down"],
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...testProps} />
  </StrictMode>,
);
