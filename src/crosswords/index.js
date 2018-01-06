const execution = require("./execution");
const structure = require("./structure");

execution
    .getCrossword()
    .then(crossword => {
        if (crossword === null) {
            console.log("No solution found");
        } else {
            structure.writeCrossword(crossword, console.log);
        }
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
