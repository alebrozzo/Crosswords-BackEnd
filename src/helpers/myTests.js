import * as structure from '../crosswords/structure';

let cw = structure.createEmptyCrossword(4, 5);
cw.grid = structure.fillRandomBlackBoxes(cw.grid, 0);
console.log('1', cw.grid);
console.log('2', JSON.parse(JSON.stringify(cw.grid)));
