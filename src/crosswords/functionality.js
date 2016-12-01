import Exception from '../helpers/exceptions';
import { BlackBox } from './structure';

// creates a regular expression search pattern that can be used to search words in ditionary
function getSearchPattern(grid, cell, direction) {

    // verify the direction is either H or V
    if (direction !== 'H' && direction !== 'V')
        throw new Exception('Invalid direction value on write word');

    let currentRow = cell.VIndex;
    let currentCol = cell.HIndex;
    let pattern = '';

    if (direction === 'H') {
        // find the begining of the word
        while (currentCol > 0 && grid[ currentRow ][ currentCol - 1 ] !== BlackBox) {
            currentCol--;
        }
        // create pattern. If letter already exist, use that letter, otherwise use the "any word character" pattern (\w)
        while (currentCol < grid[ currentRow ].length && grid[ currentRow ][ currentCol ] !== BlackBox) {
            pattern += grid[ currentRow ][ currentCol ] === null ? '\\w' : grid[ currentRow ][ currentCol ];
            currentCol++;
        }
    } // Horizontal
    else if (direction === 'V') {
        // find the begining of the word
        while (currentRow > 0 && grid[ currentRow - 1 ][ currentCol ] !== BlackBox) {
            currentRow--;
        }
        // create pattern. If letter already exist, use that letter, otherwise use the "any word character" pattern (\w)
        while (currentRow < grid.length && grid[ currentRow ][ currentCol ] !== BlackBox) {
            pattern += grid[ currentRow ][ currentCol ] === null ? '\\w' : grid[ currentRow ][ currentCol ];
            currentRow++;
        }
    }
    else
        throw new Exception('Invalid direction value on search pattern');

    return `^${pattern}$`;
}

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
        returnValue = null;
    }
    return returnValue;
}

// returns a new crossword with the specified word added to it (both on the grid and on the words array)
function writeWord(crossword, direction, index, word) {
    const newCrossword = JSON.parse(JSON.stringify(crossword));

    // verify the direction is either H or V
    if (direction !== 'H' && direction !== 'V')
        throw new Exception('Invalid direction value on write word');

    // verify that word length match
    const currentWord = direction === 'H' ? newCrossword.horizontalWords[ index ] : newCrossword.verticalWords[ index ];
    if (currentWord.length !== word.length)
        throw new Exception('Words length do not match');

    let currentHIndex = currentWord.cell.HIndex;
    let currentVIndex = currentWord.cell.VIndex;
    // for each square of the puzzle in which the word is being written, check that any previous letter would not be overwritten, then write the corresponding letter of the word received
    for (let i = 0; i < currentWord.length; i++) {
        if (newCrossword.grid[ currentHIndex ][ currentVIndex ] !== null && newCrossword.grid[ currentHIndex ][ currentVIndex ] !== word[ i ])
            throw new Exception('Word would overwrite existing letters');
        newCrossword.grid[ currentHIndex ][ currentVIndex ] = word[ i ];
        if (direction === 'H')
            currentVIndex++;
        else
            currentHIndex++;
    }

    // set the word on the definitions array
    currentWord.word = word;

    return newCrossword;
}

// Verify if by adding the specified horizontal word we can find vertical words that will fit.
function existVerticalWithCurentHorizontal(dictionary, currentCrossword, index) {
    const currentWord = currentCrossword.horizontalWords[ index ];
    let hasConflict = false;
    for (let i = 0; i < currentWord.length; i++) {
        const searchPattern = getSearchPattern(currentCrossword.grid, { HIndex: currentWord.cell.HIndex + i, VIndex: currentWord.cell.VIndex }, 'V');
        if (searchPattern !== '^\\w$' /* single letter pattern is ignored */ && findWord(dictionary, searchPattern) === null) {
            hasConflict = true;
            break;
        }
    }
    return hasConflict;
}

// Fills the next horizontal word by searching the pattern and verifying that there are words in the dictionary to write vertically with the new pattern,
// then calls itself to fill the next word.
// Returns null if no solution with the current state of the crossword.
function fillNextHorizontalWord(crossword, dictionary, index) {
    let currentCrossword = JSON.parse(JSON.stringify(crossword));
    let nextCrossword = null;
    let potentialWord = '';

    let wordsSkipped = 0;
    const searchPattern = getSearchPattern(currentCrossword.grid, currentCrossword.horizontalWords[ index ].cell, 'H');
    do {
        potentialWord = findWord(dictionary, searchPattern, wordsSkipped);
        if (potentialWord !== null) {
            if (!existVerticalWithCurentHorizontal(dictionary, currentCrossword, index)) {
                currentCrossword = writeWord(currentCrossword, 'H', index, potentialWord);
                nextCrossword = fillNextHorizontalWord(currentCrossword, dictionary, index + 1);
                wordsSkipped++;
            }
        }
    }
    while (nextCrossword === null   // this word does not allow for the crossword to be completed
        && potentialWord !== null); // there are no more words to try with this pattern

    return nextCrossword;
}

export { findWord, writeWord, getSearchPattern, existVerticalWithCurentHorizontal, fillNextHorizontalWord };
