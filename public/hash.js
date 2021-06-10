const bcrypt = require('bcrypt');

function toHash(text) {
    bcrypt.hash(text, 10, function (error, result) {
        return result;
    });
}