const uuid = require("uuid");
const mongoose = require("mongoose");
const crypto = require("../tools/crypto");
const teamsController = require("../teams/teams.controller");
const { to } = require("../tools/to");

const User = mongoose.model("User", {
    userId: String,
    username: String,
    password: String,
});

// '0001': {
//     userId : 'sdfs1a6df513sd2f1s3adf21'
//     password: 'asd',
//     userName: 'juan'
// }

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) => {
        await User.deleteMany({}).exec();
        resolve();
    });
};

const registerUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
        //save a new user on database
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuid.v4();
        let newUser = new User({
            userId: userId,
            username: username,
            password: hashedPwd,
        });
        await newUser.save();
        await teamsController.bootstrapTeam(userId);
        resolve();
    });
};

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(User.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
};

const getuserIdFromUserName = (username) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(
            User.findOne({ username: username }).exec()
        );
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
};

const checkUserCredentials = (username, password) => {
    return new Promise(async (resolve, reject) => {
        let [err, user] = await to(getuserIdFromUserName(username));
        if (!err || user) {
            //Check if the credentials are correct
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject(err);
        }
    });
};

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.getuserIdFromUserName = getuserIdFromUserName;
exports.cleanUpUsers = cleanUpUsers;
