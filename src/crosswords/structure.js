const BlackBox = '#';
// const EmptyBox = '';
// const LetterBox = '.';

// creates a new crossword of the given dimenssions (defaults to 8x8)
function createEmptyCrossword(rowCount = 8, columnCount = 8) {
    const newGrid = new Array(rowCount);
    for (let row = 0; row < rowCount; row++) {
        newGrid[ row ] = new Array(columnCount);
    }
    return JSON.parse(JSON.stringify(newGrid));
}

// TODO: fills crossword with random black boxes
function fillRandomBlackBoxes(crossword, blackBoxCount) {
    // TODO: fixed for now
    const newGrid = JSON.parse(JSON.stringify(crossword));
    newGrid[ 0 ][ 3 ] = BlackBox;
    newGrid[ 1 ][ 2 ] = BlackBox;
    newGrid[ 2 ][ 1 ] = BlackBox;
    newGrid[ 3 ][ 4 ] = BlackBox;
    return newGrid;
}

// writes the crossword using the function passed (console.log if missing)
function writeCrossword(crossword, writer = console.log) {
    for (let row = 0; row < crossword.length; row++) {
        writer(crossword[ row ]);
    }
}

// gets the length of a word, assumes row and col is the beggining of the word
function getWordLength(crossword, row, col, direction) {
    let wordLength = 0;
    if (direction === 'H') {
        let currentCol = col;
        while (currentCol < crossword[ row ].length && crossword[ row ][ currentCol ] !== BlackBox) {
            wordLength++;
            currentCol++;
        }
    }
    else if (direction === 'V') {
        let currentRow = row;
        while (currentRow < crossword.length && crossword[ currentRow ][ col ] !== BlackBox) {
            wordLength++;
            currentRow++;
        }
    }
    return wordLength;
}

// attaches two collections of objects, one for horizontal and one for vertical words.
// Objects are { cell: { HIndex, VIndex}, definitionNumber, word, definition, length }
function setWordNumbers(crossword) {
    const newGrid = JSON.parse(JSON.stringify(crossword));
    newGrid.HorizontalWords = [];
    newGrid.VerticalWords = [];
    let currentNumber = 1;
    let wordStarts = false;

    for (let row = 0; row < newGrid.length; row++) {
        for (let col = 0; col < newGrid[ row ].length; col++) {
            // if an horizontal word begins, add it to the array
            if (col < newGrid[ row ].length - 1 // last colum cannot have starting horizontal words, and should add check later if not testing for column index here
                && newGrid[ row ][ col ] !== BlackBox
                && (col === 0 || newGrid[ row ][ col - 1 ] === BlackBox) && newGrid[ row ][ col + 1 ] !== BlackBox) { // if (first col or prior cell has black box), and not a black box follows, a new word begins on row
                newGrid.HorizontalWords.push({
                    cell: { HIndex: row, VIndex: col },
                    definitionNumber: currentNumber,
                    word: '',
                    definition: '',
                    length: getWordLength(crossword, row, col, 'H')
                });
                wordStarts = true;
            }
            // if a vertical word begins, add it to the array
            if (row < newGrid.length - 1 // last row cannot have starting vertical words; should add check later if not testing for row index here
                && newGrid[ row ][ col ] !== BlackBox
                && (row === 0 || newGrid[ row - 1 ][ col ] === BlackBox) && newGrid[ row + 1 ][ col ] !== BlackBox) { // if (first row, or cell above has black box), and not a black box below, a new word begins on column
                newGrid.VerticalWords.push({
                    cell: { HIndex: row, VIndex: col },
                    definitionNumber: currentNumber,
                    word: '',
                    definition: '',
                    length: getWordLength(crossword, row, col, 'V')
                });
                wordStarts = true;
            }
            // we save whether a word starts in stead of just increasing the currentNumber because there could be a case where both an horizontal and a vertical word share the number
            if (wordStarts) {
                currentNumber++;
                wordStarts = false;
            }
        }
    }
    return newGrid;
}

export { BlackBox, createEmptyCrossword, fillRandomBlackBoxes, writeCrossword, setWordNumbers, getWordLength }

// // numbers words for references
// function setWordNumbers(crossword) {
//     let newGrid = JSON.parse(JSON.stringify(crossword));
//     newGrid.HorizontalWords = [];
//     newGrid.VerticalWords = [];
//     const numberPlaceholder = 'ÿ'; // use placeholders to allow for numbers increasing regardless of if word is horizontal or vertical

//     // horizontal numbers
//     for (let col = 0; col < newGrid[ 0 ].length - 1; col++) { // all cols but the last one, which never has new horizontal words
//         for (let row = 0; row < newGrid.length; row++) {
//             if (newGrid[ row ][ col ] !== BlackBox && (col === 0 || newGrid[ row ][ col - 1 ] === BlackBox) && newGrid[ row ][ col + 1 ] !== BlackBox) { // if (first col or prior cell has black box), and not a black box follows, a new word begins on row
//                 newGrid[ row ][ col ] = numberPlaceholder;
//             }
//         }
//     }

//     // vertical numbers
//     for (let row = 0; row < newGrid.length - 1; row++) { // all rows but the last one, which never has new vertical words
//         for (let col = 0; col < newGrid[ row ].length; col++) {
//             if (newGrid[ row ][ col ] !== BlackBox && (row === 0 || newGrid[ row - 1 ][ col ] === BlackBox) && newGrid[ row + 1 ][ col ] !== BlackBox) { // if (first row or cell above has black box), and not a black box below, a new word begins on column
//                 newGrid[ row ][ col ] = numberPlaceholder;
//             }
//         }
//     }

//     // replace placeholders with actual numbers.
//     let currentNumber = 0;
//     for (let row = 0; row < newGrid.length; row++) {
//         for (let col = 0; col < newGrid[ row ].length; col++) {
//             if (newGrid[ row ][ col ] === numberPlaceholder)
//                 newGrid[ row ][ col ] = ++currentNumber;
//         }
//     }

//     return newGrid;
// }
