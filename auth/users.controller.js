const uuid = require("uuid");
const crypto = require("../tools/crypto");
const teamsController = require("../teams/teams.controller");

let userDatabase = {};
// '0001': {
//     password: 'asd',
//     userName: 'juan'
// }

const cleanUpUsers = () => {
    userDatabase = {};
};

const registerUser = (username, password) => {
    //save a new user on database
    let hashedPwd = crypto.hashPasswordSync(password);
    let userId = uuid.v4();
    userDatabase[userId] = {
        username: username,
        password: hashedPwd,
    };
    teamsController.bootstrapTeam(userId);
};

const getUser = (userId) => {
    return userDatabase[userId];
};

const getuserIdFromUserName = (username) => {
    for (let user in userDatabase) {
        if (userDatabase[user].username == username) {
            let userData = userDatabase[user];
            userData.userId = user;
            return userData;
        }
    }
};

const checkUserCredentials = (username, password, done) => {
    //Check if the credentials are correct
    let user = getuserIdFromUserName(username);
    if (user) {
        crypto.comparePassword(password, user.password, done);
    } else {
        done("Missing user");
    }
};

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.getuserIdFromUserName = getuserIdFromUserName;
exports.cleanUpUsers = cleanUpUsers;