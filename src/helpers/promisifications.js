// from http://exploringjs.com/es6/ch_promises.html#readFilePromisified
const fs = require("fs");

function readFilePromisified(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, { encoding: "utf8" }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

const getRequestPromisified = function(url) {
    // return new pending promise
    return new Promise((resolve, reject) => {
        // select http or https module, depending on reqested url
        const lib = url.startsWith("https") ? require("https") : require("http");
        const request = lib.get(url, response => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error("Failed to load resource, status code: " + response.statusCode));
            }
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            response.on("data", chunk => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on("end", () => resolve(body.join("")));
        });
        // handle connection errors of the request
        request.on("error", err => reject(err));
    });
};

module.exports = {
    readFilePromisified,
    getRequestPromisified,
};
