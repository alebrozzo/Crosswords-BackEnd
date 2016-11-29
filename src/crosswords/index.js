import wordListPath from 'word-list';

import * as promisifications from '../helpers/Promisifications';
import * as structure from './structure';
import * as functionality from './functionality';

const startUsage = process.cpuUsage();

let cw = structure.createEmptyCrossword(4, 5);
cw = structure.fillRandomBlackBoxes(cw, 4);
cw = structure.setWordNumbers(cw);

promisifications.readFilePromisified(wordListPath)
    .then(wordList => {
        console.log('inside read promise', wordList.split('\n')[ 9 ]);
        cw = functionality.getFilledCrossword(wordList.split('\n'), cw);
        structure.writeCrossword(cw);
        console.log('usage2: ', process.cpuUsage(startUsage));
    })
    .catch(error => {
        console.log(error);
        throw error;
    });


// console.log(findWord(wordArray, 'b', 2, 5));
