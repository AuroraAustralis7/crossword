type answerGridProps = 
{
    crossWordSize: number // 2x2? 3x3? 4x4? necessary to create the grid
    words: string[] // list of words you want to place onto the grid
    rows: number[] // list of rows corresponding to the position of the first letter in each word
    cols: number[] // list of cols corresponding to the position of the first letter in each word
    directions: string[] // list of directions corresponding to the position of the first letter in each word
                         // note: directions can only be "up", "down", "left", or "right"
}

type appProps =
{
    answerGrid: string[]
    gridProps: answerGridProps
}

// checks whether a single word lies entirely within the grid.
function withinBounds(crossWordSize: number, words: string, row: number, col: number, direction: string)
{
    let lastRow = row;
    let lastCol = col;
    let withinBounds = true;

    // this section gets the last rows and columns from the rows, columns and directions

    for (let i = 0; i < words.length; i++)
    {
        if (direction = "up")
        {
            lastRow--;
        }
        if (direction = "down")
        {
            lastRow++;
        }
        if (direction = "left")
        {
            lastCol--;
        }
        if (direction = "right")
        {
            lastCol++;
        }
    }

    // this section checks whether the first letter lies within the grid space

    if (row >= crossWordSize || row < 0)
    {
        withinBounds = false;
    }
    if (col >= crossWordSize || col < 0)
    {
        withinBounds = false;
    }

    // this section checks whether the last letter lies within the grid space

    if (lastRow >= crossWordSize || lastRow < 0)
    {
        withinBounds = false;
    }
    if (lastCol >= crossWordSize || lastCol < 0)
    {
        withinBounds = false;
    }

    return withinBounds;
}

function answerGrid(props: answerGridProps)
{
    const answerGrid = Array.from({ length: props.crossWordSize }, () => Array(props.crossWordSize).fill(""));

    for (let i = 0; i < props.words.length; i++) // loop through each word in the list
    {
        if (withinBounds(props.crossWordSize, props.words[i], props.rows[i], props.cols[i], props.directions[i]))
        {
        for (let j = 0; j = props.words[i].length; j++) // loop through each character of the word
        {
            if (props.directions[i] === "up" )
            {
                answerGrid[props.rows[i - j]][props.cols[i]] = props.words[i][j];
            }
            if (props.directions[i] === "down" )
            {
                answerGrid[props.rows[i + j]][props.cols[i]] = props.words[i][j];
            }
            if (props.directions[i] === "left" )
            {
                answerGrid[props.rows[i]][props.cols[i - j]] = props.words[i][j];
            }
            if (props.directions[i] === "right" )
            {
                answerGrid[props.rows[i]][props.cols[i + j]] = props.words[i][j];
            }
        }
    }
    }
    return answerGrid;
}