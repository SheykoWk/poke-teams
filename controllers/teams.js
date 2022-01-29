const teamsDatabase = {}

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = []
}

const addPokemon = (userId, pokemonName) => {
    teamsDatabase[userId].push({name: pokemonName})
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}
const getTeamOfUser = (userId) => {
    return teamsDatabase[userId]
}

exports.setTeam = setTeam
exports.bootstrapTeam = bootstrapTeam
exports.addPokemon = addPokemon
exports.getTeamOfUser = getTeamOfUser
