let teamsDatabase = {};

const cleanUpTeam = () => {
    for(let user in teamsDatabase){
        teamsDatabase[user] = []
    }
};

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
};

const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
};

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
};
const getTeamOfUser = (userId) => {
    return teamsDatabase[userId];
};

const deletePokemonAt = (userId, index) => {
    if(teamsDatabase[userId][index]){
        teamsDatabase[userId].splice(index, 1)
    }
}

exports.setTeam = setTeam;
exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt