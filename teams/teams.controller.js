const mongoose = require("mongoose");
const to = require("../tools/to").to;

const Team = mongoose.model("Teams", { userId: String, team: [] });

const cleanUpTeam = () => {
    return new Promise(async (resolve, reject) => {
        await Team.deleteMany({}).exec();
        resolve();
    });
};

const bootstrapTeam = (userId) => {
    return new Promise(async (resolve, reject) => {
        let newTeam = new Team({ userId: userId, team: [] });
        await newTeam.save();
        resolve();
    });
};

const setTeam = (userId, team) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(
            Team.updateOne(
                { userId: userId },
                { $set: { team: team } },
                { upsert: true }
            ).exec()
        );
        if (err || !dbTeam) {
            return reject(err);
        }
        resolve();
    });
};
const getTeamOfUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(Team.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        }
        resolve(dbTeam.team);
    });
};

const addPokemon = (userId, pokemon) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(Team.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        }
        if (dbTeam.team.length == 6) {
            reject("Already have 6 pokemons");
        } else {
            dbTeam.team.push(pokemon);
            await dbTeam.save();
            resolve();
        }
    });
};

const deletePokemonAt = (userId, index) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(Team.findOne({ userId: userId }).exec());
        if (err || !dbTeam) {
            return reject(err);
        }
        if (dbTeam.team[index]) {
            dbTeam.team.splice(index, 1);
        }
        await dbTeam.save();
        resolve();
    });
};

exports.setTeam = setTeam;
exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt;
