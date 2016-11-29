import { BlackBox } from './structure';

// finds words matching a specific pattern and retrieves the one in the "skipWords" position (defaults to 0)
function findWord(dictionary, pattern, skipWords = 0) {
    const rePattern = new RegExp(pattern);
    // let possibleWords = dictionary.filter(word => word.length === length && word.startsWith(startsWith));
    const possibleWords = dictionary.filter(word => rePattern.exec(word)); // TODO: this goes through the whole dictionary. Better to use a while.
    let returnValue = '';
    if (possibleWords && skipWords < possibleWords.length) {
        returnValue = possibleWords[ skipWords ];
    }
    else {
        // TODO: How to handle this? throw error? return error?
        throw new Error('No word found');
    }
    return returnValue;
}

// creates a regular expression search pattern that can be used to search words in ditionary
function getSearchPattern(crossword, row, col, direction) {
    let currentRow = row;
    let currentCol = col;
    let pattern = '';

    if (direction === 'H') {
        // find the begining of the word
        while (currentCol > 0 && crossword[ row ][ currentCol - 1 ] !== BlackBox) {
            currentCol--;
        }
        // create pattern. If letter already exist, use that letter, otherwise use the "any word character" pattern (\w)
        while (currentCol < crossword[ row ].length && crossword[ row ][ currentCol ] !== BlackBox) {
            pattern += crossword[ row ][ currentCol ] === null ? '\\w' : crossword[ row ][ currentCol ];
            currentCol++;
        }
    } // Horizontal
    else if (direction === 'V') {
        // find the begining of the word
        while (currentRow > 0 && crossword[ currentRow - 1 ][ col ] !== BlackBox) {
            currentRow--;
        }
        // create pattern. If letter already exist, use that letter, otherwise use the "any word character" pattern (\w)
        while (currentRow < crossword.length && crossword[ currentRow ][ col ] !== BlackBox) {
            pattern += crossword[ currentRow ][ col ] === null ? '\\w' : crossword[ currentRow ][ col ];
            currentRow++;
        }
    }

    return `^${pattern}$`;
}

function getWord(dictionary, crossword, row, column, direction) {
    // let searchPattern = 
    // let potentialWord = findWord()
}

function getFilledCrossword(dictionary, crossword) {
    const newGrid = JSON.parse(JSON.stringify(crossword));



    return newGrid;
}

export { findWord, getSearchPattern, getFilledCrossword };
