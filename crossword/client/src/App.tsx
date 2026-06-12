// import styles from "./App.module.css";
import { useState } from "react";

type AppProps = {
  puzzleSize: number;
};

function App(props: AppProps) {
  const blankArray = [];
  for (let i = 0; i < props.puzzleSize; i++) {
    blankArray[i] = Array(props.puzzleSize);
  }
  const [crossword, setCrossword] = useState(blankArray);

  return crossword.map((row, rowIndex) => {
    crossword.map((col, colIndex) => {
      <input type="text" maxLength={1} value="number" onChange={() => {}} />;
    });
  });
}

export default App;
