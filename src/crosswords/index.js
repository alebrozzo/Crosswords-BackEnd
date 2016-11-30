import wordListPath from 'word-list';

import * as promisifications from '../helpers/Promisifications';
import * as structure from './structure';
import * as functionality from './functionality';

const startUsage = process.cpuUsage();

let crossword = structure.createEmptyCrossword(4, 5);
crossword.grid = structure.fillRandomBlackBoxes(crossword.grid, 4);
crossword = structure.setWordNumbers(crossword);

promisifications.readFilePromisified(wordListPath)
    .then(wordList => {
        crossword = functionality.getFilledCrossword(crossword, wordList.split('\n'));
        structure.writeCrossword(crossword);
        console.log('usage2: ', process.cpuUsage(startUsage));
    })
    .catch(error => {
        console.log(error);
        throw error;
    });


// console.log(findWord(wordArray, 'b', 2, 5));
