/* eslint no-magic-numbers: "off" */
/* eslint no-sync: "off" */
import { expect } from 'chai';
import fs from 'fs';

import * as structure from './structure';
import * as functionality from './functionality';
import wordListPath from 'word-list';

describe('Pattern finding, empty', () => {
    const crossword = structure.createEmptyCrossword(4, 5);
    crossword[ 0 ][ 3 ] = structure.BlackBox;
    crossword[ 1 ][ 2 ] = structure.BlackBox;
    crossword[ 2 ][ 1 ] = structure.BlackBox;
    crossword[ 3 ][ 4 ] = structure.BlackBox;

    it('should match empty Horizontal, next to border', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 0, 0, 'H');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Vertical, next to border', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 0, 4, 'V');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Horizontal, next to white box', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 3, 2, 'H');
        expect(pattern).to.equal('^\\w\\w\\w\\w$');
    });

    it('should match empty Vertical, next to white box', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 2, 0, 'V');
        expect(pattern).to.equal('^\\w\\w\\w\\w$');
    });

    it('should match empty Horizontal, prior is black box', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 1, 3, 'H');
        expect(pattern).to.equal('^\\w\\w$');
    });

    it('should match empty Vertical, prior is black box', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 1, 3, 'V');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Horizontal, last white box', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 3, 3, 'H');
        expect(pattern).to.equal('^\\w\\w\\w\\w$');
    });

    it('should match empty Vertical, last white box', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 3, 3, 'V');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Horizontal, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 2, 2, 'H');
        expect(pattern).to.equal('^\\w\\w\\w$');
    });

    it('should match empty Vertical, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 2, 2, 'V');
        expect(pattern).to.equal('^\\w\\w$');
    });

});

describe('Pattern finding, with letters', () => {
    const crossword = structure.createEmptyCrossword(4, 5);
    crossword[ 0 ][ 3 ] = structure.BlackBox;
    crossword[ 1 ][ 2 ] = structure.BlackBox;
    crossword[ 2 ][ 1 ] = structure.BlackBox;
    crossword[ 3 ][ 4 ] = structure.BlackBox;
    crossword[ 2 ][ 2 ] = 'P';
    crossword[ 2 ][ 3 ] = 'U';
    crossword[ 3 ][ 3 ] = 'Z';

    it('should match pattern Horizontal, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 2, 2, 'H');
        expect(pattern).to.equal('^PU\\w$');
    });

    it('should match pattern Vertical, begining of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 2, 2, 'V');
        expect(pattern).to.equal('^P\\w$');
    });

    it('should match pattern Horizontal, middle of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 2, 3, 'H');
        expect(pattern).to.equal('^PU\\w$');
    });

    it('should match pattern Vertical, middle of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 2, 3, 'V');
        expect(pattern).to.equal('^\\wUZ$');
    });

    it('should match pattern Horizontal, end of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 3, 3, 'H');
        expect(pattern).to.equal('^\\w\\w\\wZ$');
    });

    it('should match pattern Vertical, end of word', () => {
        const cw = JSON.parse(JSON.stringify(crossword));
        const pattern = functionality.getSearchPattern(cw, 3, 3, 'V');
        expect(pattern).to.equal('^\\wUZ$');
    });

});

describe('Word searching', () => {
    const wordList = fs.readFileSync(wordListPath, 'utf8');
    it('should return the file contents', () => {
        expect(wordList).be.to.not.null();
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

    it('should match the word zymosis', () => {
        const actual = functionality.findWord(wordArray, '^zymos\\ws$', 1);
        expect(actual).to.equal('zymosis');
    });

});
