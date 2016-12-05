/* eslint no-magic-numbers: "off" */
/* eslint no-unused-expressions: "off" */

const chai = require('chai');
const expect = chai.expect;

const structure = require('./structure');

describe('Empty crossword creation', () => {
    const rowCount = 4;
    const colCount = 5;
    const crossword = structure.createEmptyCrossword(rowCount, colCount);

    it('should not be null', () => {
        expect(crossword).to.not.be.undefined;
    });

    it('should not have a null grid', () => {
        expect(crossword.grid).to.not.be.undefined;
    });

    it(`should be a grid of ${rowCount} rows`, () => {
        expect(crossword.grid.length).to.equal(rowCount);
    });

    it(`should be a grid of ${colCount} columns`, () => {
        expect(crossword.grid[ 0 ].length).to.equal(colCount);
    });

    it(`should be consider deep equal`, () => {
        expect(crossword).to.deep.equal(JSON.parse(JSON.stringify(crossword)));
    });

});

describe('Fill randon black boxes', () => {
    const crossword = structure.createEmptyCrossword(4, 5);

    it('should have exactly 4 black boxes', () => {
        const expected = 4;
        let actual = 0;
        const grid = structure.fillRandomBlackBoxes(crossword.grid, expected);
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[ row ].length; col++) {
                if (grid[ row ][ col ] === structure.BlackBox) {
                    actual++;
                }
            }
        }

        expect(actual, 'number of black boxes').to.equal(expected);
    });

    it('should have black boxes and nulls only', () => {
        const blackBoxCount = 4;
        let nonBlackNorNull = 0;
        const grid = structure.fillRandomBlackBoxes(crossword.grid, blackBoxCount);
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[ row ].length; col++) {
                if (!(grid[ row ][ col ] === null || grid[ row ][ col ] === structure.BlackBox)) {
                    nonBlackNorNull++;
                }
            }
        }

        expect(nonBlackNorNull, 'non black boxes nor null').to.equal(0);
    });

});

describe('Calculate word length', () => {
    const grid = structure.createEmptyCrossword(4, 5).grid;
    grid[ 0 ][ 3 ] = structure.BlackBox;
    grid[ 1 ][ 2 ] = structure.BlackBox;
    grid[ 2 ][ 1 ] = structure.BlackBox;

    it('should return a length of 3', () => {
        expect(structure.getWordLength(grid, 0, 0, 'H'), 'starting on cw limit, ending on black box, horizontal').to.equal(3);
    });

    it('should return a length of 2', () => {
        expect(structure.getWordLength(grid, 1, 3, 'H'), 'starting on black box, ending on cw limit, horizontal').to.equal(2);
    });

    it('should return a length of 2', () => {
        expect(structure.getWordLength(grid, 0, 1, 'V'), 'starting on cw limit, ending on black box, vertical').to.equal(2);
    });

    it('should return a length of 3', () => {
        expect(structure.getWordLength(grid, 1, 3, 'V'), 'starting on black box, ending on cw limit, vertical').to.equal(3);
    });

    it('should return a length of 5', () => {
        expect(structure.getWordLength(grid, 3, 0, 'H'), 'starting on cw limit, ending on cw limit, horizontal').to.equal(5);
    });

    it('should return a length of 4', () => {
        expect(structure.getWordLength(grid, 0, 0, 'V'), 'starting on cw limit, ending on cw limit, vertical').to.equal(4);
    });

});

describe('Set numbers for word references', () => {
    const crossword = structure.createEmptyCrossword(4, 5);

    it('should match the proposed output for no black boxes', () => {
        // [ 1, 2, 3, 4, 5 ]
        // [ 6, _, _, _, _ ]
        // [ 7, _, _, _, _ ]
        // [ 8, _, _, _, _ ]
        const cw = structure.setWordNumbers(crossword);
        const actualHorizontal = cw.horizontalWords;
        const actualVertical = cw.verticalWords;
        const expectedHorizontal = [
            { cell: { row: 0, col: 0 }, definitionNumber: 1, word: '', definition: '', length: 5 },
            { cell: { row: 1, col: 0 }, definitionNumber: 6, word: '', definition: '', length: 5 },
            { cell: { row: 2, col: 0 }, definitionNumber: 7, word: '', definition: '', length: 5 },
            { cell: { row: 3, col: 0 }, definitionNumber: 8, word: '', definition: '', length: 5 }];
        const expectedVertical = [
            { cell: { row: 0, col: 0 }, definitionNumber: 1, word: '', definition: '', length: 4 },
            { cell: { row: 0, col: 1 }, definitionNumber: 2, word: '', definition: '', length: 4 },
            { cell: { row: 0, col: 2 }, definitionNumber: 3, word: '', definition: '', length: 4 },
            { cell: { row: 0, col: 3 }, definitionNumber: 4, word: '', definition: '', length: 4 },
            { cell: { row: 0, col: 4 }, definitionNumber: 5, word: '', definition: '', length: 4 }];
        expect(actualHorizontal, 'empty crossword horizontal').to.deep.equal(expectedHorizontal);
        expect(actualVertical, 'empty crossword vertical').to.deep.equal(expectedVertical);
    });

    it('should match the proposed output with inaccessible white boxes', () => {
        let cw = JSON.parse(JSON.stringify(crossword));
        cw.grid[ 0 ][ 1 ] = structure.BlackBox;
        cw.grid[ 1 ][ 0 ] = structure.BlackBox;
        cw.grid[ 1 ][ 2 ] = structure.BlackBox;
        cw.grid[ 2 ][ 1 ] = structure.BlackBox;
        cw = structure.setWordNumbers(cw);
        // [ _, #, 1, 2, 3 ],
        // [ #, _, #, 4, _ ],
        // [ 5, #, 6, _, _ ],
        // [ 7, _, _, _, _ ]

        const actualHorizontal = cw.horizontalWords;
        const actualVertical = cw.verticalWords;
        const expectedHorizontal = [
            { cell: { row: 0, col: 2 }, definitionNumber: 1, word: '', definition: '', length: 3 },
            { cell: { row: 1, col: 3 }, definitionNumber: 4, word: '', definition: '', length: 2 },
            { cell: { row: 2, col: 2 }, definitionNumber: 6, word: '', definition: '', length: 3 },
            { cell: { row: 3, col: 0 }, definitionNumber: 7, word: '', definition: '', length: 5 }];
        const expectedVertical = [
            { cell: { row: 0, col: 3 }, definitionNumber: 2, word: '', definition: '', length: 4 },
            { cell: { row: 0, col: 4 }, definitionNumber: 3, word: '', definition: '', length: 4 },
            { cell: { row: 2, col: 0 }, definitionNumber: 5, word: '', definition: '', length: 2 },
            { cell: { row: 2, col: 2 }, definitionNumber: 6, word: '', definition: '', length: 2 }];
        expect(actualHorizontal, 'crossword horizontal').to.deep.equal(expectedHorizontal);
        expect(actualVertical, 'crossword vertical').to.deep.equal(expectedVertical);
    });

    it('should match the proposed output', () => {
        let cw = JSON.parse(JSON.stringify(crossword));
        cw.grid[ 0 ][ 3 ] = structure.BlackBox;
        cw.grid[ 1 ][ 2 ] = structure.BlackBox;
        cw.grid[ 2 ][ 1 ] = structure.BlackBox;
        cw.grid[ 3 ][ 4 ] = structure.BlackBox;
        cw = structure.setWordNumbers(cw);
        // [ 1, 2, _, #, 3 ]
        // [ 4, _, #, 5, _ ]
        // [ _, #, 6, _, _ ]
        // [ 7, _, _, _, # ]

        const actualHorizontal = cw.horizontalWords;
        const actualVertical = cw.verticalWords;
        const expectedHorizontal = [
            { cell: { row: 0, col: 0 }, definitionNumber: 1, word: '', definition: '', length: 3 },
            { cell: { row: 1, col: 0 }, definitionNumber: 4, word: '', definition: '', length: 2 },
            { cell: { row: 1, col: 3 }, definitionNumber: 5, word: '', definition: '', length: 2 },
            { cell: { row: 2, col: 2 }, definitionNumber: 6, word: '', definition: '', length: 3 },
            { cell: { row: 3, col: 0 }, definitionNumber: 7, word: '', definition: '', length: 4 }];
        const expectedVertical = [
            { cell: { row: 0, col: 0 }, definitionNumber: 1, word: '', definition: '', length: 4 },
            { cell: { row: 0, col: 1 }, definitionNumber: 2, word: '', definition: '', length: 2 },
            { cell: { row: 0, col: 4 }, definitionNumber: 3, word: '', definition: '', length: 3 },
            { cell: { row: 1, col: 3 }, definitionNumber: 5, word: '', definition: '', length: 3 },
            { cell: { row: 2, col: 2 }, definitionNumber: 6, word: '', definition: '', length: 2 }];
        expect(actualHorizontal, 'crossword horizontal').to.deep.equal(expectedHorizontal);
        expect(actualVertical, 'crossword vertical').to.deep.equal(expectedVertical);
    });

    it('should return empty arrays for checkers black boxes', () => {
        let cw = JSON.parse(JSON.stringify(crossword));
        for (let row = 0; row < cw.grid.length; row++) {
            for (let col = 0 + (row % 2); col < cw.grid[ row ].length; col += 2) {
                cw.grid[ row ][ col ] = structure.BlackBox;
            }
        }
        // [ #, _, #, _, # ]
        // [ _, #, _, #, _ ]
        // [ #, _, #, _, # ]
        // [ _, #, _, #, _ ]
        cw = structure.setWordNumbers(cw);

        const actualHorizontal = cw.horizontalWords;
        const actualVertical = cw.verticalWords;
        const expectedHorizontal = [];
        const expectedVertical = [];
        expect(actualHorizontal, 'all black boxes horizontal').to.deep.equal(expectedHorizontal);
        expect(actualVertical, 'all black boxes vertical').to.deep.equal(expectedVertical);
    });

    it('should return empty arrays for all black boxes', () => {
        let cw = JSON.parse(JSON.stringify(crossword));
        for (let row = 0; row < cw.grid.length; row++) {
            for (let col = 0; col < cw.grid[ row ].length; col++) {
                cw.grid[ row ][ col ] = structure.BlackBox;
            }
        }
        // [ #, #, #, #, # ]
        // [ #, #, #, #, # ]
        // [ #, #, #, #, # ]
        // [ #, #, #, #, # ]
        cw = structure.setWordNumbers(cw);

        const actualHorizontal = cw.horizontalWords;
        const actualVertical = cw.verticalWords;
        const expectedHorizontal = [];
        const expectedVertical = [];
        expect(actualHorizontal, 'all black boxes horizontal').to.deep.equal(expectedHorizontal);
        expect(actualVertical, 'all black boxes vertical').to.deep.equal(expectedVertical);
    });

});

// /*
// /* eslint no-magic-numbers: "off" * /
// describe('Set numbers for word references', () => {
//     const crossword = structure.createEmptyCrossword(4, 5);

//     it('should match the proposed output for no black boxes', () => {
//         const actual = structure.setWordNumbers(crossword);
//         const expected = [
//             [ 1, 2, 3, 4, 5 ],
//             [ 6, _, _, _, _ ],
//             [ 7, _, _, _, _ ],
//             [ 8, _, _, _, _ ] ];
//         expect(actual, 'empty crossword').to.deep.equal(expected);
//     });

//     it('should match the proposed output', () => {
//         const cw = JSON.parse(JSON.stringify(crossword));
//         cw[ 0 ][ 1 ] = structure.BlackBox;
//         cw[ 1 ][ 0 ] = structure.BlackBox;
//         cw[ 1 ][ 2 ] = structure.BlackBox;
//         cw[ 2 ][ 1 ] = structure.BlackBox;

//         const actual = structure.setWordNumbers(cw);
//         const expected = [
//             [ _, structure.BlackBox, 1, 2, 3 ],
//             [ structure.BlackBox, _, structure.BlackBox, 4, _ ],
//             [ 5, structure.BlackBox, 6, _, _ ],
//             [ 7, _, _, _, _ ] ];
//         expect(actual, 'fixed crossword').to.deep.equal(expected);
//     });

//     it('should match the proposed output with inaccessible white boxes', () => {
//         const cw = JSON.parse(JSON.stringify(crossword));
//         cw[ 0 ][ 3 ] = structure.BlackBox;
//         cw[ 1 ][ 2 ] = structure.BlackBox;
//         cw[ 2 ][ 1 ] = structure.BlackBox;
//         cw[ 3 ][ 4 ] = structure.BlackBox;

//         const actual = structure.setWordNumbers(cw);
//         const expected = [
//             [ 1, 2, _, structure.BlackBox, 3 ],
//             [ 4, _, structure.BlackBox, 5, _ ],
//             [ _, structure.BlackBox, 6, _, _ ],
//             [ 7, _, _, _, structure.BlackBox ] ];
//         expect(actual, 'fixed crossword with inaccessible white boxes').to.deep.equal(expected);
//     });

//     it('should match the proposed output for all black boxes', () => {
//         const cw = JSON.parse(JSON.stringify(crossword));
//         for (let row = 0; row < cw.length; row++) {
//             for (let col = 0; col < cw[ row ].length; col++) {
//                 cw[ row ][ col ] = structure.BlackBox;
//             }
//         }

//         const actual = structure.setWordNumbers(cw);
//         const expected = [
//             [ structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox ],
//             [ structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox ],
//             [ structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox ],
//             [ structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox, structure.BlackBox ] ];
//         expect(actual, 'all black boxes crossword').to.deep.equal(expected);
//     });

// });
// */
