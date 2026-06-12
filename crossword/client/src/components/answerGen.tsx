// possible types for directions
// EVERYTHING HERE IS WAITING TO BE SCRAPPED AS OF RN
type Direction = "left" | "right" | "up" | "down";

type WordPlacement = {
  word: string;
  row: number;
  col: number;
  direction: Direction;
};

type Answer = {
  crossword: string[][];
  placements: WordPlacement[];
};

function placeWord(
  crossword: String[][],
  word: string,
  row: number,
  col: number,
  direction: Direction,
) {
  if (direction === "up") {
    // places word upwards
    for (let i = 0; i < word.length; i++) {
      if (
        row + i > crossword.length ||
        row + i < 0 ||
        col > crossword[row].length ||
        col < 0
      ) {
        break;
      }
      crossword[row + i][col] = word[i];
    }
  }

  if (direction === "down") {
    // places word downwards
    for (let i = 0; i < word.length; i++) {
      if (
        row - i > crossword.length ||
        row - i < 0 ||
        col > crossword[row].length ||
        col < 0
      ) {
        break;
      }
      crossword[row - i][col] = word[i];
    }
  }

  if (direction === "right") {
    // places word rightwards
    for (let i = 0; i < word.length; i++) {
      if (
        row > crossword.length ||
        row < 0 ||
        col + i > crossword[row].length ||
        col + i < 0
      ) {
        break;
      }
      crossword[row][col + i] = word[i];
    }
  }

  if (direction === "left") {
    // places word leftwards
    for (let i = 0; i < word.length; i++) {
      if (
        row > crossword.length ||
        row < 0 ||
        col - i > crossword[row].length ||
        col - i < 0
      ) {
        break;
      }
      crossword[row][col - i] = word[i];
    }
  }
}
/*
    Creates a 2D string array with a grid size of puzzleSize by puzzleSize, and attempts to place the words in words[]
    words[], rows[], and cols[] ALL must have the same size for this function to make sense.

*/
function answerGen(
  puzzleSize: number,
  words: string[],
  rows: number[],
  cols: number[],
  directions: Direction[],
) {
  const crossword = [];
  const wordPlacements: WordPlacement[] = [];

  for (let i = 0; i < puzzleSize; i++) {
    crossword[i] = new Array(puzzleSize).fill("");
    wordPlacements[i] = {
      word: words[i],
      row: rows[i],
      col: cols[i],
      direction: directions[i],
    };
  }
  for (let i = 0; i < words.length; i++) {
    placeWord(crossword, words[i], rows[i], cols[i], directions[i]);
  }

  const answer: Answer = { crossword: crossword, placements: wordPlacements };

  return answer;
}

export default answerGen;
