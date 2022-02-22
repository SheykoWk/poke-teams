const bcrypt = require("bcrypt")

const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, 10)
}

const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done)
}


exports.comparePassword = comparePassword
exports.hashPasswordSync = hashPasswordSync