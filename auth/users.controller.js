const uuid = require("uuid");
const mongoose = require('mongoose')
const crypto = require("../tools/crypto");
const teamsController = require("../teams/teams.controller");

const User = mongoose.model("User", { username: String, password: String, UserId: String});

let userDatabase = {};
// '0001': {
//     password: 'asd',
//     userName: 'juan'
// }


const cleanUpUsers = () => {
    return new Promise((resolve, reject) => {
        userDatabase = {};
        resolve();
    });
};

const registerUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
        //save a new user on database
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuid.v4();
        let newUser = new User({
            username: username,
            password: hashedPwd,
            userId: userId
        })
        await newUser.save()
        await teamsController.bootstrapTeam(userId);
        resolve();
    });
};

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(userDatabase[userId]);
    });
};

const getuserIdFromUserName = (username) => {
    return new Promise((resolve, reject) => {
        for (let user in userDatabase) {
            if (userDatabase[user].username == username) {
                let userData = userDatabase[user];
                userData.userId = user;
                return resolve(userData);
            }
        }
        reject("User not Found");
    });
};

const checkUserCredentials = (username, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await getuserIdFromUserName(username);
        if (user) {
            //Check if the credentials are correct
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject('Missing User')
        }
    });
};

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.getuserIdFromUserName = getuserIdFromUserName;
exports.cleanUpUsers = cleanUpUsers;
