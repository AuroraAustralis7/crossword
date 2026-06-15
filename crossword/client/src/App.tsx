import "./App.css";

type answerGridProps = {
  crossWordSize: number; // 2x2? 3x3? 4x4? necessary to create the grid
  words: string[]; // list of words you want to place onto the grid
  rows: number[]; // list of rows corresponding to the position of the first letter in each word
  cols: number[]; // list of cols corresponding to the position of the first letter in each word
  directions: string[]; // list of directions corresponding to the position of the first letter in each word
  // note: directions can only be "up", "down", "left", or "right"
};

type appProps = {
  answerGrid: string[][];
  gridProps: answerGridProps;
};

// checks whether a single word lies entirely within the grid.
function withinBounds(
  crossWordSize: number,
  words: string,
  row: number,
  col: number,
  direction: string,
) {
  let lastRow = row;
  let lastCol = col;
  let withinBounds = true;

  // this section gets the last rows and columns from the rows, columns and directions

  for (let i = 0; i < words.length; i++) {
    if (direction === "up") {
      lastRow--;
    }
    if (direction === "down") {
      lastRow++;
    }
    if (direction === "left") {
      lastCol--;
    }
    if (direction === "right") {
      lastCol++;
    }
  }

  // this section checks whether the first letter lies within the grid space

  if (row >= crossWordSize || row < 0) {
    withinBounds = false;
  }
  if (col >= crossWordSize || col < 0) {
    withinBounds = false;
  }

  // this section checks whether the last letter lies within the grid space

  if (lastRow >= crossWordSize || lastRow < 0) {
    withinBounds = false;
  }
  if (lastCol >= crossWordSize || lastCol < 0) {
    withinBounds = false;
  }

  return withinBounds;
}

function answerGrid(props: answerGridProps) {
  const answerGrid = Array.from({ length: props.crossWordSize }, () =>
    Array(props.crossWordSize).fill(""),
  );

  for (
    let i = 0;
    i < props.words.length;
    i++ // loop through each word in the list
  ) {
    if (
      withinBounds(
        props.crossWordSize,
        props.words[i],
        props.rows[i],
        props.cols[i],
        props.directions[i],
      )
    ) {
      for (
        let j = 0;
        (j = props.words[i].length);
        j++ // loop through each character of the word
      ) {
        if (props.directions[i] === "up") {
          answerGrid[props.rows[i - j]][props.cols[i]] = props.words[i][j];
        }
        if (props.directions[i] === "down") {
          answerGrid[props.rows[i + j]][props.cols[i]] = props.words[i][j];
        }
        if (props.directions[i] === "left") {
          answerGrid[props.rows[i]][props.cols[i - j]] = props.words[i][j];
        }
        if (props.directions[i] === "right") {
          answerGrid[props.rows[i]][props.cols[i + j]] = props.words[i][j];
        }
      }
    }
  }
  return answerGrid;
}

function checkWord(
  word: string,
  row: number,
  col: number,
  direction: string,
  answerGrid: string[][],
  crossword: string[][],
) {
  for (
    let i = 0;
    i < word.length;
    i++ // loop through all characters of each word
  ) {
    // match the characters from the answer grid to the crossword grid, if one is misaligned,
    // return false
    if (direction === "up") {
      if (crossword[row - i][col] !== answerGrid[row - i][col]) {
        return false;
        break;
      }
    }
    if (direction === "down") {
      if (crossword[row + i][col] !== answerGrid[row + i][col]) {
        return false;
        break;
      }
    }
    if (direction === "left") {
      if (crossword[row][col - i] !== answerGrid[row][col - i]) {
        return false;
        break;
      }
    }
    if (direction === "right") {
      if (crossword[row][col + i] !== answerGrid[row][col + i]) {
        return false;
        break;
      }
    }
  }
  return true;
}

// returns a grid of correct words within the grid
function correctWordsGrid(props: appProps, crossword: string[][]) {
  let correctWordsGrid = Array.from(
    { length: props.gridProps.crossWordSize },
    () => Array(props.gridProps.crossWordSize).fill(false),
  );

  for (
    let i = 0;
    i < props.gridProps.words.length;
    i++ // loop over each word
  ) {
    if (
      checkWord(
        props.gridProps.words[i],
        props.gridProps.rows[i],
        props.gridProps.cols[i],
        props.gridProps.directions[i],
        props.answerGrid,
        crossword,
      )
    ) {
      for (
        let j = 0;
        j < props.gridProps.words[i].length;
        j++ // loop through each character in the word
      ) {
        if (props.gridProps.directions[i] === "up") {
          correctWordsGrid[props.gridProps.rows[i] - j][
            props.gridProps.cols[i]
          ] = true;
        }
        if (props.gridProps.directions[i] === "down") {
          correctWordsGrid[props.gridProps.rows[i] + j][
            props.gridProps.cols[i]
          ] = true;
        }
        if (props.gridProps.directions[i] === "left") {
          correctWordsGrid[props.gridProps.rows[i]][
            props.gridProps.cols[i] - j
          ] = true;
        }
        if (props.gridProps.directions[i] === "right") {
          correctWordsGrid[props.gridProps.rows[i]][
            props.gridProps.cols[i] + j
          ] = true;
        }
      }
    }
  }
  return correctWordsGrid;
}

function App(props: appProps) {
  let crosswordGrid = Array.from(
    { length: props.gridProps.crossWordSize },
    () => Array(props.gridProps.crossWordSize).fill(""),
  );

  return (
    <>
      {crosswordGrid.map((row, rowIndex) => {
        return (
          <div style={{ height: 40 }}>
            {row.map((col, colIndex) => {
              if (props.answerGrid[rowIndex][colIndex] === "") {
                return <span className="empty-crossword-cell" />;
              } else {
                return (
                  <input
                    className="crosswordCell"
                    id={`cell-${rowIndex}-${colIndex}`}
                    key={`${rowIndex}-${colIndex}`}
                    maxLength={1}
                    onChange={(event) => {
                      event.target.value = event.target.value.toUpperCase();
                      crosswordGrid[rowIndex][colIndex] =
                        event.target.value.toUpperCase();
                      let correctGrid = correctWordsGrid(props, crosswordGrid);
                      for (let r = 0; r < props.gridProps.crossWordSize; r++) {
                        for (
                          let c = 0;
                          c < props.gridProps.crossWordSize;
                          c++
                        ) {
                          if (correctGrid[r][c] == true) {
                            const input = document.getElementById(
                              `cell-${r}-${c}`,
                            );
                            if (input !== null) {
                              input.style.backgroundColor = "lightgreen";
                            }
                          }
                        }
                      }
                    }}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;
