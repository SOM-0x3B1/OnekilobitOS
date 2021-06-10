const bcrypt = require('bcrypt');

function toHash(text) {
    bcrypt.hash(text, 12, function (error, result) {
        console.log(result);
        return result;
    });
}

module.exports = { toHash }