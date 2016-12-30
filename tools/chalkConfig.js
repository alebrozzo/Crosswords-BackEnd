// Centralized configuration for chalk, which is used to add color to console.log statements.
const chalk = require('chalk');
module.exports.chalkError = chalk.red;
module.exports.chalkSuccess = chalk.green;
module.exports.chalkWarning = chalk.yellow;
module.exports.chalkProcessing = chalk.blue;
