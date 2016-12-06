/* eslint no-magic-numbers: "off" */
const BlackBox = '#';
// const LetterBox = '_';

// creates a new crossword of the given dimenssions (defaults to 8x8)
function createEmptyCrossword(rowCount = 8, columnCount = 8) {
    const newGrid = new Array(rowCount);
    for (let row = 0; row < rowCount; row++) {
        newGrid[ row ] = new Array(columnCount);
    }
    const crosswordObject = {};
    crosswordObject.grid = JSON.parse(JSON.stringify(newGrid));
    crosswordObject.horizontalWords = [];
    crosswordObject.verticalWords = [];
    return crosswordObject;
}

// TODO: fills crossword with random black boxes
function fillRandomBlackBoxes(grid, blackBoxCount) {
    // TODO: fixed for now
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[ 0 ][ 3 ] = BlackBox;
    newGrid[ 1 ][ 2 ] = BlackBox;
    newGrid[ 2 ][ 1 ] = BlackBox;
    newGrid[ 3 ][ 4 ] = BlackBox;
    return newGrid;
}

// writes the crossword using the function passed (console.log if missing)
function writeCrossword(crossword, writer = console.log) {
    writer('grid:\n');
    for (let row = 0; row < crossword.grid.length; row++) {
        writer(crossword.grid[ row ]);
    }
    writer('Horizontals:', crossword.horizontalWords);
    writer('Verticals:', crossword.verticalWords);
}

// gets the length of a word, assumes row and col is the beggining of the word
function getWordLength(grid, row, col, direction) {
    let wordLength = 0;
    if (direction === 'H') {
        let currentCol = col;
        while (currentCol < grid[ row ].length && grid[ row ][ currentCol ] !== BlackBox) {
            wordLength++;
            currentCol++;
        }
    }
    else if (direction === 'V') {
        let currentRow = row;
        while (currentRow < grid.length && grid[ currentRow ][ col ] !== BlackBox) {
            wordLength++;
            currentRow++;
        }
    }
    return wordLength;
}

// Fills two collections of objects, one for horizontal and one for vertical words.
// Objects are { cell: { row, col}, definitionNumber, word, definition, length }
function setWordNumbers(crossword) {
    const newCrossword = JSON.parse(JSON.stringify(crossword));
    let currentNumber = 1;
    let wordStarts = false;

    for (let row = 0; row < newCrossword.grid.length; row++) {
        for (let col = 0; col < newCrossword.grid[ row ].length; col++) {
            // if an horizontal word begins, add it to the array
            if (col < newCrossword.grid[ row ].length - 1 // last colum cannot have starting horizontal words, and should add check later if not testing for column index here
                && newCrossword.grid[ row ][ col ] !== BlackBox
                && (col === 0 || newCrossword.grid[ row ][ col - 1 ] === BlackBox) && newCrossword.grid[ row ][ col + 1 ] !== BlackBox) { // if (first col or prior cell has black box), and not a black box follows, a new word begins on row
                newCrossword.horizontalWords.push({
                    cell: { row, col },
                    definitionNumber: currentNumber,
                    word: '',
                    definition: '',
                    length: getWordLength(newCrossword.grid, row, col, 'H')
                });
                wordStarts = true;
            }
            // if a vertical word begins, add it to the array
            if (row < newCrossword.grid.length - 1 // last row cannot have starting vertical words; should add check later if not testing for row index here
                && newCrossword.grid[ row ][ col ] !== BlackBox
                && (row === 0 || newCrossword.grid[ row - 1 ][ col ] === BlackBox) && newCrossword.grid[ row + 1 ][ col ] !== BlackBox) { // if (first row, or cell above has black box), and not a black box below, a new word begins on column
                newCrossword.verticalWords.push({
                    cell: { row, col },
                    definitionNumber: currentNumber,
                    word: '',
                    definition: '',
                    length: getWordLength(newCrossword.grid, row, col, 'V')
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
    return newCrossword;
}

// export { BlackBox, createEmptyCrossword, fillRandomBlackBoxes, writeCrossword, setWordNumbers, getWordLength }
module.exports.BlackBox = BlackBox;
module.exports.createEmptyCrossword = createEmptyCrossword;
module.exports.fillRandomBlackBoxes = fillRandomBlackBoxes;
module.exports.writeCrossword = writeCrossword;
module.exports.setWordNumbers = setWordNumbers;
module.exports.setWordNumbers = setWordNumbers;
module.exports.getWordLength = getWordLength;

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
