/* eslint max-lines: "off" */
/* eslint no-magic-numbers: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint no-sync: "off" */

const chai = require("chai");
const expect = chai.expect;

const fs = require("fs");
const path = require("path");

// const arrays = require('../helpers/arrays');

const exceptions = require("../helpers/exceptions");
const Exception = exceptions.Exception;
const structure = require("./structure");
const functionality = require("./functionality");
// const wordListPath = require('word-list');

describe("Pattern finding, empty", () => {
    const grid = structure.createEmptyCrossword(4, 5).grid;
    grid[0][3] = structure.BlackBox;
    grid[1][2] = structure.BlackBox;
    grid[2][1] = structure.BlackBox;
    grid[3][4] = structure.BlackBox;
    // [ _, _, _, #, _ ]
    // [ _, _, #, _, _ ]
    // [ _, #, _, _, _ ]
    // [ _, _, _, _, # ]

    it("should match empty Horizontal, next to border", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 0, col: 0 }, "H");
        expect(pattern).to.equal("^\\w\\w\\w$");
    });

    it("should match empty Vertical, next to border", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 0, col: 4 }, "V");
        expect(pattern).to.equal("^\\w\\w\\w$");
    });

    it("should match empty Horizontal, next to white box", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 2 }, "H");
        expect(pattern).to.equal("^\\w\\w\\w\\w$");
    });

    it("should match empty Vertical, next to white box", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 0 }, "V");
        expect(pattern).to.equal("^\\w\\w\\w\\w$");
    });

    it("should match empty Horizontal, prior is black box", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 1, col: 3 }, "H");
        expect(pattern).to.equal("^\\w\\w$");
    });

    it("should match empty Vertical, prior is black box", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 1, col: 3 }, "V");
        expect(pattern).to.equal("^\\w\\w\\w$");
    });

    it("should match empty Horizontal, last white box", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, "H");
        expect(pattern).to.equal("^\\w\\w\\w\\w$");
    });

    it("should match empty Vertical, last white box", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, "V");
        expect(pattern).to.equal("^\\w\\w\\w$");
    });

    it("should match empty Horizontal, begining of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, "H");
        expect(pattern).to.equal("^\\w\\w\\w$");
    });

    it("should match empty Vertical, begining of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, "V");
        expect(pattern).to.equal("^\\w\\w$");
    });
});

describe("Pattern finding, with letters", () => {
    const grid = structure.createEmptyCrossword(4, 5).grid;
    grid[0][3] = structure.BlackBox;
    grid[1][2] = structure.BlackBox;
    grid[2][1] = structure.BlackBox;
    grid[3][4] = structure.BlackBox;
    grid[0][0] = "A";
    grid[0][1] = "L";
    grid[0][2] = "E";
    grid[2][2] = "P";
    grid[2][3] = "U";
    grid[3][3] = "Z";
    // [ A, L, E, #, _ ]
    // [ _, _, #, _, _ ]
    // [ _, #, P, U, _ ]
    // [ _, _, _, Z, # ]

    it("should match pattern Horizontal, begining of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 1, col: 0 }, "H");
        expect(pattern).to.equal("^\\w\\w$");
    });

    it("should match pattern Horizontal, begining of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, "H");
        expect(pattern).to.equal("^PU\\w$");
    });

    it("should match pattern Vertical, begining of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 2 }, "V");
        expect(pattern).to.equal("^P\\w$");
    });

    it("should match pattern Horizontal, middle of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 3 }, "H");
        expect(pattern).to.equal("^PU\\w$");
    });

    it("should match pattern Vertical, middle of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 2, col: 3 }, "V");
        expect(pattern).to.equal("^\\wUZ$");
    });

    it("should match pattern Horizontal, end of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, "H");
        expect(pattern).to.equal("^\\w\\w\\wZ$");
    });

    it("should match pattern Vertical, end of word", () => {
        const cw = JSON.parse(JSON.stringify(grid));
        const pattern = functionality.getSearchPattern(cw, { row: 3, col: 3 }, "V");
        expect(pattern).to.equal("^\\wUZ$");
    });
});

describe("Dictionary reading", () => {
    const wordList = fs.readFileSync(path.resolve(__dirname, "wordList.js"), "utf8");
    it("should load the file contents", () => {
        expect(wordList).to.not.be.null;
    });
});

describe("Word search on word list, no avoided words", () => {
    const wordList =
        "ALE DA LE PUS ABA NUEZ ADAN ZYMOTECHNICAL BCATORCELETRAS DIEZLETRAS ZYMOSES ZYMOSIS AAHED BABY LA PE LUZ MES";
    const wordArray = wordList.split(" ");

    it("should return the file contents", () => {
        expect(wordArray[0]).to.equal("ALE");
        expect(wordArray[3]).to.equal("PUS");
        expect(wordArray[wordArray.length - 2]).to.equal("LUZ");
        expect(wordArray[wordArray.length - 1]).to.equal("MES");
    });

    it("should find a three letter word", () => {
        const actual = functionality.findWord(wordArray, "^\\w\\w\\w$");
        expect(actual).to.equal("ALE");
    });

    it("should find a four letter word starting with B", () => {
        const actual = functionality.findWord(wordArray, "^B\\w\\w\\w$");
        expect(actual).to.equal("BABY");
    });

    it("should find a fourteen letter word starting with B and ending with S", () => {
        const actual = functionality.findWord(wordArray, "^B\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w\\wS$");
        expect(actual).to.equal("BCATORCELETRAS");
    });

    it("should find a ten letter word ending with S", () => {
        const actual = functionality.findWord(wordArray, "^\\w\\w\\w\\w\\w\\w\\w\\w\\wS$");
        expect(actual).to.equal("DIEZLETRAS");
    });

    it("should find a three letter word with B in the middle", () => {
        const actual = functionality.findWord(wordArray, "^\\wB\\w$");
        expect(actual).to.equal("ABA");
    });

    it("should match the word ZYMOTECHNICAL", () => {
        const actual = functionality.findWord(wordArray, "^ZYMOTECHNICAL$");
        expect(actual).to.equal("ZYMOTECHNICAL");
    });

    it("should skip the first matching word (ZYMOSES) to then match the word ZYMOSIS", () => {
        const actual = functionality.findWord(wordArray, "^ZYMOS\\wS$", [], 1);
        expect(actual).to.equal("ZYMOSIS");
    });

    it("should match the word AAHED", () => {
        const actual = functionality.findWord(wordArray, "^\\wA\\wE\\w$");
        expect(actual).to.equal("AAHED");
    });

    it("should return null because there are no words matching", () => {
        const actual = functionality.findWord(wordArray, "^\\w\\wÑ$");
        expect(actual).to.be.null;
    });

    it("should return null because there are no words matching after skipping the first", () => {
        const actual = functionality.findWord(wordArray, "^\\wA\\wE\\w$", [], 1);
        expect(actual).to.be.null;
    });
});

describe("Word search on word list, with avoided words", () => {
    const wordList =
        "ALE DA LE PUS ABA NUEZ ADAN ZYMOTECHNICAL BCATORCELETRAS DIEZLETRAS ZYMOSES ZYMOSIS AAHED BABY BURN OBJ LA PE LUZ MES";
    const wordArray = wordList.split(" ");

    it("should find a four letter word starting with B", () => {
        const actual = functionality.findWord(wordArray, "^B\\w\\w\\w$", ["BABY"]);
        expect(actual).to.equal("BURN");
    });

    it("should find a three letter word with B in the middle", () => {
        const actual = functionality.findWord(wordArray, "^\\wB\\w$", ["ABA"]);
        expect(actual).to.equal("OBJ");
    });

    it("should avoid first matching word (ZYMOSES) to then match the word ZYMOSIS", () => {
        const actual = functionality.findWord(wordArray, "^ZYMOS\\wS$", ["ZYMOSES"]);
        expect(actual).to.equal("ZYMOSIS");
    });

    it("should match the word AAHED", () => {
        const actual = functionality.findWord(wordArray, "^\\wA\\wE\\w$");
        expect(actual).to.equal("AAHED");
    });

    it("should avoid first two matching word (ZYMOSES and ZYMOSIS) and return null", () => {
        const actual = functionality.findWord(wordArray, "^ZYMOS\\wS$", ["ZYMOSES", "ZYMOSIS"]);
        expect(actual).to.be.null;
    });
});

describe("Word writing", () => {
    const cwInit = structure.createEmptyCrossword(4, 5);
    cwInit.grid[0][3] = structure.BlackBox;
    cwInit.grid[1][2] = structure.BlackBox;
    cwInit.grid[2][1] = structure.BlackBox;
    cwInit.grid[3][4] = structure.BlackBox;
    cwInit.grid[2][2] = "P";
    cwInit.grid[2][3] = "U";
    cwInit.grid[3][3] = "Z";
    // [ _, _, _, #, _ ]
    // [ _, _, #, _, _ ]
    // [ _, #, P, U, _ ]
    // [ _, _, _, Z, # ]
    const crossword = structure.setWordNumbers(cwInit);

    it("should write the word ALE properly (H)", () => {
        const cw = functionality.writeWord(crossword, "H", 0, "ALE");
        expect(cw.horizontalWords[0].word).to.equal("ALE");
        expect(cw.grid[0][0]).to.equal("A");
        expect(cw.grid[0][1]).to.equal("L");
        expect(cw.grid[0][2]).to.equal("E");
    });

    it("should write the word PUS properly (H)", () => {
        const cw = functionality.writeWord(crossword, "H", 3, "PUS");
        expect(cw.horizontalWords[3].word).to.equal("PUS");
        expect(cw.grid[2][2]).to.equal("P");
        expect(cw.grid[2][3]).to.equal("U");
        expect(cw.grid[2][4]).to.equal("S");
    });

    it("should write the word NUEZ properly (H)", () => {
        const cw = functionality.writeWord(crossword, "H", 4, "NUEZ");
        expect(cw.horizontalWords[4].word).to.equal("NUEZ");
        expect(cw.grid[3][0]).to.equal("N");
        expect(cw.grid[3][1]).to.equal("U");
        expect(cw.grid[3][2]).to.equal("E");
        expect(cw.grid[3][3]).to.equal("Z");
    });

    it("should write the word LUZ properly (V)", () => {
        const cw = functionality.writeWord(crossword, "V", 3, "LUZ");
        expect(cw.verticalWords[3].word).to.equal("LUZ");
        expect(cw.grid[1][3]).to.equal("L");
        expect(cw.grid[2][3]).to.equal("U");
        expect(cw.grid[3][3]).to.equal("Z");
    });

    it("should write the word PE properly (V)", () => {
        const cw = functionality.writeWord(crossword, "V", 4, "PE");
        expect(cw.verticalWords[4].word).to.equal("PE");
        expect(cw.grid[2][2]).to.equal("P");
        expect(cw.grid[3][2]).to.equal("E");
    });

    it("should throw an exception (length not match) (H)", () => {
        expect(() => functionality.writeWord(crossword, "H", 0, "PE")).to.throw(Exception);
    });

    it("should throw an exception (overwritting letter) (H)", () => {
        expect(() => functionality.writeWord(crossword, "H", 4, "PIES")).to.throw(Exception);
    });

    it("should throw an exception (length not match) (V)", () => {
        expect(() => functionality.writeWord(crossword, "V", 3, "PIES")).to.throw(Exception);
    });

    it("should throw an exception (overwritting letter) (V)", () => {
        expect(() => functionality.writeWord(crossword, "V", 3, "LUX")).to.throw(Exception);
    });
});

describe("Pattern conflict", () => {
    const dictionary = "ALE DA LE PUS NUEZ ADAN LA PE LUZ MES".split(" ");
    const shortDictionary = "XXXXXXXXXXXXXXXXXX".split(" ");
    const cwInit = structure.createEmptyCrossword(4, 5);
    cwInit.grid[0][3] = structure.BlackBox;
    cwInit.grid[1][2] = structure.BlackBox;
    cwInit.grid[2][1] = structure.BlackBox;
    cwInit.grid[3][4] = structure.BlackBox;
    cwInit.grid[1][3] = "L";
    cwInit.grid[1][4] = "E";
    // [ _, _, _, #, _ ]
    // [ _, _, #, L, E ]
    // [ _, #, P, _, _ ]
    // [ _, _, _, _, # ]
    const crossword = structure.setWordNumbers(cwInit);

    it("should return true for LE", () => {
        const verticalsExist = functionality.existVerticalsWithCurrentHorizontal(dictionary, crossword, 2);
        expect(verticalsExist).to.be.true;
    });

    it("should return false for LE", () => {
        const verticalsExist = functionality.existVerticalsWithCurrentHorizontal(shortDictionary, crossword, 2);
        expect(verticalsExist).to.be.false;
    });
});

describe("Pattern conflict", () => {
    const dictionary = "ALE DA LE PUS NUEZ ADAN LA PE LUZ MES".split(" ");
    const shortDictionary = "XXXXXXXXXXXXXXXXXX".split(" ");
    const cwInit = structure.createEmptyCrossword(4, 5);
    cwInit.grid[0][3] = structure.BlackBox;
    cwInit.grid[1][2] = structure.BlackBox;
    cwInit.grid[2][1] = structure.BlackBox;
    cwInit.grid[3][4] = structure.BlackBox;
    cwInit.grid[1][3] = "L";
    cwInit.grid[1][4] = "E";
    // [ _, _, _, #, _ ]
    // [ _, _, #, L, E ]
    // [ _, #, P, _, _ ]
    // [ _, _, _, _, # ]
    const crossword = structure.setWordNumbers(cwInit);

    it("should return true for LE", () => {
        const verticalsExist = functionality.existVerticalsWithCurrentHorizontal(dictionary, crossword, 2);
        expect(verticalsExist).to.be.true;
    });

    it("should return false for LE", () => {
        const verticalsExist = functionality.existVerticalsWithCurrentHorizontal(shortDictionary, crossword, 2);
        expect(verticalsExist).to.be.false;
    });
});

describe("Get used words", () => {
    const cwInit = structure.createEmptyCrossword(4, 5);
    cwInit.grid[0][3] = structure.BlackBox;
    cwInit.grid[1][2] = structure.BlackBox;
    cwInit.grid[2][1] = structure.BlackBox;
    cwInit.grid[3][4] = structure.BlackBox;
    // [ _, _, _, #, _ ]
    // [ _, _, #, _, _ ]
    // [ _, #, _, _, _ ]
    // [ _, _, _, _, # ]

    it("should return all 5 words", () => {
        const crossword = functionality.writeWord(
            functionality.writeWord(
                functionality.writeWord(
                    functionality.writeWord(
                        functionality.writeWord(structure.setWordNumbers(cwInit), "H", 0, "ALE"),
                        "H",
                        4,
                        "NUEZ"
                    ),
                    "V",
                    3,
                    "LUZ"
                ),
                "V",
                4,
                "PE"
            ),
            "H",
            3,
            "PUS"
        );
        // [ A, L, E, #, _ ]
        // [ _, _, #, L, _ ]
        // [ _, #, P, U, S ]
        // [ N, U, E, Z, # ]

        const usedWords = functionality.getUsedWords(crossword);
        expect(usedWords[0]).to.equal("ALE");
        expect(usedWords[1]).to.equal("PUS");
        expect(usedWords[2]).to.equal("NUEZ");
        expect(usedWords[3]).to.equal("LUZ");
        expect(usedWords[4]).to.equal("PE");
    });

    it("should return all words", () => {
        let crossword = functionality.writeWord(
            functionality.writeWord(
                functionality.writeWord(
                    functionality.writeWord(
                        functionality.writeWord(structure.setWordNumbers(cwInit), "H", 0, "ALE"),
                        "H",
                        4,
                        "NUEZ"
                    ),
                    "V",
                    3,
                    "LUZ"
                ),
                "V",
                4,
                "PE"
            ),
            "H",
            3,
            "PUS"
        );
        crossword = functionality.writeWord(
            functionality.writeWord(
                functionality.writeWord(
                    functionality.writeWord(
                        functionality.writeWord(structure.setWordNumbers(crossword), "V", 0, "ADAN"),
                        "H",
                        1,
                        "DA"
                    ),
                    "V",
                    1,
                    "LA"
                ),
                "H",
                2,
                "LE"
            ),
            "V",
            2,
            "MES"
        );
        // [ A, L, E, #, M ]
        // [ D, A, #, L, E ]
        // [ A, #, P, U, S ]
        // [ N, U, E, Z, # ]

        const usedWords = functionality.getUsedWords(crossword);
        expect(usedWords.length).to.equal(10);
        expect(usedWords[0]).to.equal("ALE");
        expect(usedWords[1]).to.equal("DA");
        expect(usedWords[2]).to.equal("LE");
        expect(usedWords[3]).to.equal("PUS");
        expect(usedWords[4]).to.equal("NUEZ");
        expect(usedWords[5]).to.equal("ADAN");
        expect(usedWords[6]).to.equal("LA");
        expect(usedWords[7]).to.equal("MES");
        expect(usedWords[8]).to.equal("LUZ");
        expect(usedWords[9]).to.equal("PE");
    });
});

describe("Filling all horizontal words", () => {
    let crosswordEmpty = structure.createEmptyCrossword(4, 5);
    crosswordEmpty.grid[0][3] = structure.BlackBox;
    crosswordEmpty.grid[1][2] = structure.BlackBox;
    crosswordEmpty.grid[2][1] = structure.BlackBox;
    crosswordEmpty.grid[3][4] = structure.BlackBox;
    // [ _, _, _, #, _ ]
    // [ _, _, #, _, _ ]
    // [ _, #, _, _, _ ]
    // [ _, _, _, _, # ]
    crosswordEmpty = structure.setWordNumbers(crosswordEmpty);
    let crosswordExpected = structure.createEmptyCrossword(4, 5);
    crosswordExpected.grid[0][0] = "A";
    crosswordExpected.grid[0][1] = "L";
    crosswordExpected.grid[0][2] = "E";
    crosswordExpected.grid[0][3] = structure.BlackBox;
    // crosswordExpected.grid[ 0 ][ 4 ] = 'M';

    crosswordExpected.grid[1][0] = "D";
    crosswordExpected.grid[1][1] = "A";
    crosswordExpected.grid[1][2] = structure.BlackBox;
    crosswordExpected.grid[1][3] = "L";
    crosswordExpected.grid[1][4] = "E";

    // crosswordExpected.grid[ 2 ][ 0 ] = 'A';
    crosswordExpected.grid[2][1] = structure.BlackBox;
    crosswordExpected.grid[2][2] = "P";
    crosswordExpected.grid[2][3] = "U";
    crosswordExpected.grid[2][4] = "S";

    crosswordExpected.grid[3][0] = "N";
    crosswordExpected.grid[3][1] = "U";
    crosswordExpected.grid[3][2] = "E";
    crosswordExpected.grid[3][3] = "Z";
    crosswordExpected.grid[3][4] = structure.BlackBox;

    crosswordExpected = structure.setWordNumbers(crosswordExpected);
    crosswordExpected.horizontalWords[0].word = "ALE";
    crosswordExpected.horizontalWords[1].word = "DA";
    crosswordExpected.horizontalWords[2].word = "LE";
    crosswordExpected.horizontalWords[3].word = "PUS";
    crosswordExpected.horizontalWords[4].word = "NUEZ";

    it("should be deep equal", () => {
        const dictionary = "ALE DA LE PUS NUEZ ADAN LA PE LUZ MES".split(" ");
        const crosswordFilled = functionality.fillNextHorizontalWord(crosswordEmpty, dictionary, 0);
        expect(crosswordFilled).to.be.deep.equal(crosswordExpected);

        const dictionaryReordered = "LE PUS NUEZ ADAN LA PE LUZ MES DA ALE".split(" ");
        const crosswordFilledWithReorderedDictionary = functionality.fillNextHorizontalWord(
            crosswordEmpty,
            dictionaryReordered,
            0
        );
        expect(crosswordFilledWithReorderedDictionary.grid).to.be.deep.equal(crosswordExpected.grid);
    });
});

describe("Filling all vertical words", () => {
    let crosswordOriginal = structure.createEmptyCrossword(4, 5);
    crosswordOriginal.grid[0][0] = "A";
    crosswordOriginal.grid[0][1] = "L";
    crosswordOriginal.grid[0][2] = "E";
    crosswordOriginal.grid[0][3] = structure.BlackBox;
    crosswordOriginal.grid[0][4] = "M";

    crosswordOriginal.grid[1][0] = "D";
    crosswordOriginal.grid[1][1] = "A";
    crosswordOriginal.grid[1][2] = structure.BlackBox;
    crosswordOriginal.grid[1][3] = "L";
    crosswordOriginal.grid[1][4] = "E";

    crosswordOriginal.grid[2][0] = "A";
    crosswordOriginal.grid[2][1] = structure.BlackBox;
    crosswordOriginal.grid[2][2] = "P";
    crosswordOriginal.grid[2][3] = "U";
    crosswordOriginal.grid[2][4] = "S";

    crosswordOriginal.grid[3][0] = "N";
    crosswordOriginal.grid[3][1] = "U";
    crosswordOriginal.grid[3][2] = "E";
    crosswordOriginal.grid[3][3] = "Z";
    crosswordOriginal.grid[3][4] = structure.BlackBox;

    crosswordOriginal = structure.setWordNumbers(crosswordOriginal);
    crosswordOriginal.horizontalWords[0].word = "ALE";
    crosswordOriginal.horizontalWords[1].word = "DA";
    crosswordOriginal.horizontalWords[2].word = "LE";
    crosswordOriginal.horizontalWords[3].word = "PUS";
    crosswordOriginal.horizontalWords[4].word = "NUEZ";

    const crosswordExpected = JSON.parse(JSON.stringify(crosswordOriginal));
    crosswordExpected.verticalWords[0].word = "ADAN";
    crosswordExpected.verticalWords[1].word = "LA";
    crosswordExpected.verticalWords[2].word = "MES";
    crosswordExpected.verticalWords[3].word = "LUZ";
    crosswordExpected.verticalWords[4].word = "PE";

    it("should be deep equal", () => {
        const dictionary = "ALE DA LE PUS NUEZ ADAN LA PE LUZ MES".split(" ");
        const crosswordFilled = functionality.fillVerticalWords(crosswordOriginal, dictionary);
        expect(crosswordFilled).to.be.deep.equal(crosswordExpected);
    });
});
