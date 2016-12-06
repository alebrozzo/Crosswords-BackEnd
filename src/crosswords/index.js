// const wordListPath = require('word-list');
const path = require('path');

const promisifications = require('../helpers/promisifications');
const arrays = require('../helpers/arrays');

const structure = require('./structure');
const functionality = require('./functionality');

const startUsage = process.cpuUsage();

let crossword = structure.createEmptyCrossword(4, 5);
crossword.grid = structure.fillRandomBlackBoxes(crossword.grid, 4);
crossword = structure.setWordNumbers(crossword);

// promisifications.readFilePromisified(wordListPath)
promisifications.readFilePromisified(path.resolve(__dirname, 'wordList.js'))
    .then(wordList => {
        const wordListSplit = arrays.shuffleFlatArray(wordList.split('\r\n'));
        crossword = functionality.fillCrossword(crossword, wordListSplit);
        if (crossword === null) {
            console.log('No solution found');
        }
        else {
            structure.writeCrossword(crossword);
        }
        console.log('usage2: ', process.cpuUsage(startUsage));
    })
    .catch(error => {
        console.log(error);
        throw error;
    });

/*
const wordList = 'ALE DA LE PUS NUEZ ADAN LA PE LUZ MES'.split(' ');
try {
    crossword = functionality.fillNextHorizontalWord(crossword, wordList, 0);
    crossword = functionality.fillVerticalWords(crossword, wordList);
}
catch (error) {
    console.log(error);
}
structure.writeCrossword(crossword);
*/

// console.log(findWord(wordArray, 'b', 2, 5));
