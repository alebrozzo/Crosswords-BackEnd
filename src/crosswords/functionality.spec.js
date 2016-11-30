/* eslint no-magic-numbers: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint no-sync: "off" */

import { expect } from 'chai';
import fs from 'fs';

import Exception from '../helpers/exceptions';
import * as structure from './structure';
import * as functionality from './functionality';
import wordListPath from 'word-list';

describe('Pattern finding, empty', () => {
    const grid = structure.createEmptyCrossword(4, 5).grid;
    grid[ 0 ][ 3 ] = structure.BlackBox;
    grid[ 1 ][ 2 ] = structure.BlackBox;
    grid[ 2 ][ 1 ] = structure.BlackBox;
    grid[ 3 ][ 4 ] = structure.BlackBox;

    it('should match empty Horizontal, next to border', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 0, col: 0 }, 'H');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Vertical, next to border', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 0, col: 4 }, 'V');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Horizontal, next to white box', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 2 }, 'H');
        expect(pattern).to.equal('^\\w\\w\\w\\w$');
    });

    it('should match empty Vertical, next to white box', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 0 }, 'V');
        expect(pattern).to.equal('^\\w\\w\\w\\w$');
    });

    it('should match empty Horizontal, prior is black box', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 1, col: 3 }, 'H');
        expect(pattern).to.equal('^\\w\\w$');
    });

    it('should match empty Vertical, prior is black box', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 1, col: 3 }, 'V');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Horizontal, last white box', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, 'H');
        expect(pattern).to.equal('^\\w\\w\\w\\w$');
    });

    it('should match empty Vertical, last white box', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, 'V');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Horizontal, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, 'H');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Vertical, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, 'V');
        expect(pattern).to.equal('^\\w\\w$');
    });

});

describe('Pattern finding, with letters', () => {
    const grid = structure.createEmptyCrossword(4, 5).grid;
    grid[ 0 ][ 3 ] = structure.BlackBox;
    grid[ 1 ][ 2 ] = structure.BlackBox;
    grid[ 2 ][ 1 ] = structure.BlackBox;
    grid[ 3 ][ 4 ] = structure.BlackBox;
    grid[ 2 ][ 2 ] = 'P';
    grid[ 2 ][ 3 ] = 'U';
    grid[ 3 ][ 3 ] = 'Z';

    it('should match pattern Horizontal, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, 'H');
        expect(pattern).to.equal('^PU\\w$');
    });

    it('should match pattern Vertical, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, 'V');
        expect(pattern).to.equal('^P\\w$');
    });

    it('should match pattern Horizontal, middle of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 3 }, 'H');
        expect(pattern).to.equal('^PU\\w$');
    });

    it('should match pattern Vertical, middle of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 3 }, 'V');
        expect(pattern).to.equal('^\\wUZ$');
    });

    it('should match pattern Horizontal, end of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, 'H');
        expect(pattern).to.equal('^\\w\\w\\wZ$');
    });

    it('should match pattern Vertical, end of word', () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, 'V');
        expect(pattern).to.equal('^\\wUZ$');
    });

});

describe('Word search on word list', () => {
    const wordList = fs.readFileSync(wordListPath, 'utf8');
    it('should load the file contents', () => {
        expect(wordList).to.not.be.null;
    });

    const wordArray = wordList.split('\n');
    it('should return the file contents', () => {
        expect(wordArray[ 0 ]).to.equal('aa');
        expect(wordArray[ 3 ]).to.equal('aahing');
        expect(wordArray[ wordArray.length - 2 ]).to.equal('zzz');
        expect(wordArray[ wordArray.length - 1 ]).to.equal('zzzs');
    });

    it('should find a three letter word', () => {
        const actual = functionality.findWord(wordArray, '^\\w\\w\\w$');
        expect(actual).to.equal('aah');
    });

    it('should find a four letter word starting with b', () => {
        const actual = functionality.findWord(wordArray, '^b\\w\\w\\w$');
        expect(actual).to.equal('baal');
    });

    it('should find a fourteen letter word starting with b and ending with s', () => {
        const actual = functionality.findWord(wordArray, '^b\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w\\ws$');
        expect(actual).to.equal('baccalaureates');
    });

    it('should find a ten letter word ending with s', () => {
        const actual = functionality.findWord(wordArray, '^\\w\\w\\w\\w\\w\\w\\w\\w\\ws$');
        expect(actual).to.equal('aardwolves');
    });

    it('should find a three letter word with b in the middle', () => {
        const actual = functionality.findWord(wordArray, '^\\wb\\w$');
        expect(actual).to.equal('aba');
    });

    it('should match the word zymotechnical', () => {
        const actual = functionality.findWord(wordArray, '^zymotechnical$');
        expect(actual).to.equal('zymotechnical');
    });

    it('should skip the first matching word to then match the word zymosis', () => {
        const actual = functionality.findWord(wordArray, '^zymos\\ws$', 1);
        expect(actual).to.equal('zymosis');
    });

    it('should match the word aahed', () => {
        const actual = functionality.findWord(wordArray, '^\\wa\\we\\w$');
        expect(actual).to.equal('aahed');
    });

    it('should return null because there are no words matching', () => {
        const actual = functionality.findWord(wordArray, '^\\w\\wñ$');
        expect(actual).to.be.null;
    });

});

describe('Word writing', () => {
    const cwInit = structure.createEmptyCrossword(4, 5);
    cwInit.grid[ 0 ][ 3 ] = structure.BlackBox;
    cwInit.grid[ 1 ][ 2 ] = structure.BlackBox;
    cwInit.grid[ 2 ][ 1 ] = structure.BlackBox;
    cwInit.grid[ 3 ][ 4 ] = structure.BlackBox;
    cwInit.grid[ 2 ][ 2 ] = 'P';
    cwInit.grid[ 2 ][ 3 ] = 'U';
    cwInit.grid[ 3 ][ 3 ] = 'Z';
    // [ _, _, _, #, _ ]
    // [ _, _, #, _, _ ]
    // [ _, #, P, U, _ ]
    // [ _, _, _, Z, # ]
    const crossword = structure.setWordNumbers(cwInit);

    it('should write the word ALE properly (H)', () => {
        const cw = functionality.writeWord(crossword, 'H', 0, 'ALE');
        expect(cw.horizontalWords[ 0 ].word).to.equal('ALE');
        expect(cw.grid[ 0 ][ 0 ]).to.equal('A');
        expect(cw.grid[ 0 ][ 1 ]).to.equal('L');
        expect(cw.grid[ 0 ][ 2 ]).to.equal('E');
    });

    it('should write the word PUS properly (H)', () => {
        const cw = functionality.writeWord(crossword, 'H', 3, 'PUS');
        expect(cw.horizontalWords[ 3 ].word).to.equal('PUS');
        expect(cw.grid[ 2 ][ 2 ]).to.equal('P');
        expect(cw.grid[ 2 ][ 3 ]).to.equal('U');
        expect(cw.grid[ 2 ][ 4 ]).to.equal('S');
    });

    it('should write the word NUEZ properly (H)', () => {
        const cw = functionality.writeWord(crossword, 'H', 4, 'NUEZ');
        expect(cw.horizontalWords[ 4 ].word).to.equal('NUEZ');
        expect(cw.grid[ 3 ][ 0 ]).to.equal('N');
        expect(cw.grid[ 3 ][ 1 ]).to.equal('U');
        expect(cw.grid[ 3 ][ 2 ]).to.equal('E');
        expect(cw.grid[ 3 ][ 3 ]).to.equal('Z');
    });

    it('should write the word LUZ properly (V)', () => {
        const cw = functionality.writeWord(crossword, 'V', 3, 'LUZ');
        expect(cw.verticalWords[ 3 ].word).to.equal('LUZ');
        expect(cw.grid[ 1 ][ 3 ]).to.equal('L');
        expect(cw.grid[ 2 ][ 3 ]).to.equal('U');
        expect(cw.grid[ 3 ][ 3 ]).to.equal('Z');
    });

    it('should write the word PE properly (V)', () => {
        const cw = functionality.writeWord(crossword, 'V', 4, 'PE');
        expect(cw.verticalWords[ 4 ].word).to.equal('PE');
        expect(cw.grid[ 2 ][ 2 ]).to.equal('P');
        expect(cw.grid[ 3 ][ 2 ]).to.equal('E');
    });

    it('should throw an exception (length not match) (H)', () => {
        expect(() => functionality.writeWord(crossword, 'H', 0, 'PE')).to.throw(Exception);
    });

    it('should throw an exception (overwritting letter) (H)', () => {
        expect(() => functionality.writeWord(crossword, 'H', 4, 'PIES')).to.throw(Exception);
    });

    it('should throw an exception (length not match) (V)', () => {
        expect(() => functionality.writeWord(crossword, 'V', 3, 'PIES')).to.throw(Exception);
    });

    it('should throw an exception (overwritting letter) (V)', () => {
        expect(() => functionality.writeWord(crossword, 'V', 3, 'LUX')).to.throw(Exception);
    });

});

describe('Pattern conflict', () => {
    const dictionary = 'ALE DA LE PUS NUEZ ADAN LA PE LUZ MES'.split(' ');
    const shortDictionary = 'XXX'.split(' ');
    const cwInit = structure.createEmptyCrossword(4, 5);
    cwInit.grid[ 0 ][ 3 ] = structure.BlackBox;
    cwInit.grid[ 1 ][ 2 ] = structure.BlackBox;
    cwInit.grid[ 2 ][ 1 ] = structure.BlackBox;
    cwInit.grid[ 3 ][ 4 ] = structure.BlackBox;
    cwInit.grid[ 1 ][ 3 ] = 'L';
    cwInit.grid[ 1 ][ 4 ] = 'E';
    // [ _, _, _, #, _ ]
    // [ _, _, #, L, E ]
    // [ _, #, P, _, _ ]
    // [ _, _, _, _, # ]
    const crossword = structure.setWordNumbers(cwInit);

    it('should return false for LE', () => {
        const hasConflict = functionality.patternConflictsWithVerticals(dictionary, crossword, 2);
        expect(hasConflict).to.be.false;
    });
    
    it('should return true for LE', () => {
        const hasConflict = functionality.patternConflictsWithVerticals(shortDictionary, crossword, 2);
        expect(hasConflict).to.be.true;
    });
    
});


// describe('Grid filling', () => {
//     const crossword = structure.createEmptyCrossword(4, 5);
//     crossword.grid[ 0 ][ 3 ] = structure.BlackBox;
//     crossword.grid[ 1 ][ 2 ] = structure.BlackBox;
//     crossword.grid[ 2 ][ 1 ] = structure.BlackBox;
//     crossword.grid[ 3 ][ 4 ] = structure.BlackBox;

//     const dictionary = 'ALE DA LE PUS NUEZ ADAN LA PE LUZ MES'.split(' ');

//     // create a copy based on the original
//     let filledCrossword = JSON.parse(JSON.stringify(crossword));
//     // fill the original as the app should fill the expected with the given dictionary
//     crossword.grid[ 0 ][ 0 ] = 'A';
//     crossword.grid[ 0 ][ 1 ] = 'L';
//     crossword.grid[ 0 ][ 2 ] = 'E';
//     crossword.grid[ 0 ][ 4 ] = 'M';
//     crossword.grid[ 1 ][ 0 ] = 'D';
//     crossword.grid[ 1 ][ 1 ] = 'A';
//     crossword.grid[ 1 ][ 3 ] = 'L';
//     crossword.grid[ 1 ][ 4 ] = 'E';
//     crossword.grid[ 2 ][ 0 ] = 'A';
//     crossword.grid[ 2 ][ 2 ] = 'P';
//     crossword.grid[ 2 ][ 3 ] = 'U';
//     crossword.grid[ 2 ][ 4 ] = 'S';
//     crossword.grid[ 3 ][ 0 ] = 'N';
//     crossword.grid[ 3 ][ 1 ] = 'U';
//     crossword.grid[ 3 ][ 2 ] = 'E';
//     crossword.grid[ 3 ][ 3 ] = 'Z';

//     it('should match provided outcome', () => {
//         filledCrossword = functionality.getFilledCrossword(filledCrossword, dictionary);
//         expect(filledCrossword).to.deep.equal(crossword);
//     });

// });
