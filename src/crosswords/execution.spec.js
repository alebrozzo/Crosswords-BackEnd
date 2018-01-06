/* eslint no-magic-numbers: "off" */
/* eslint no-unused-expressions: "off" */

/********************************************************************************************
* this needs async testing so I am disabling until I have the chance to check how it's done *
*********************************************************************************************
const chai = require('chai');
const expect = chai.expect;

const execution = require('./execution');
const BlackBox = require('./structure').BlackBox;

describe('Full automatic crossword creation', () => {
    const crossword = execution.getCrossword();

    it('should not be null', () => {
        expect(crossword).to.not.be.undefined;
    });

    it('should not have a null grid', () => {
        expect(crossword.grid).to.not.be.undefined;
    });

    it('should not have a null horizontal words object', () => {
        expect(crossword.horizontalWords).to.not.be.undefined;
    });

    it('should not have an empty horizontal words object', () => {
        expect(crossword.horizontalWords.length).to.be.greaterThan(0);
    });

    it('should not have a null vertical words object', () => {
        expect(crossword.verticalWords).to.not.be.undefined;
    });

    it('should not have an empty vertical words object', () => {
        expect(crossword.verticalWords.length).to.be.greaterThan(0);
    });

});

describe('Full automatic crossword creation', () => {
    const crossword = execution.getCrossword([ [ null, null, BlackBox ], [ null, null, null ], [ BlackBox, null, null ] ]);

    it('should not be null', () => {
        expect(crossword).to.not.be.undefined;
    });

    it('should not have a null grid', () => {
        expect(crossword.grid).to.not.be.undefined;
    });

    it(`should have the grid passed as parameter`, () => {
        expect(crossword.grid).to.deep.equal([ [ null, null, BlackBox ], [ null, null, null ], [ BlackBox, null, null ] ]);
    });

    it('should not have a null horizontal words object', () => {
        expect(crossword.horizontalWords).to.not.be.undefined;
    });

    it('should not have an empty horizontal words object', () => {
        expect(crossword.horizontalWords.length).to.be.greaterThan(0);
    });

    it('should not have a null vertical words object', () => {
        expect(crossword.verticalWords).to.not.be.undefined;
    });

    it('should not have an empty vertical words object', () => {
        expect(crossword.verticalWords.length).to.be.greaterThan(0);
    });

});
*/
