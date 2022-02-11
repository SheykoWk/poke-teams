let teamsDatabase = {};

const cleanUpTeam = () => {
    return new Promise((resolve, reject) =>{
        for(let user in teamsDatabase){
            teamsDatabase[user] = []
        }
        resolve();
    } )
    
};

const bootstrapTeam = (userId) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = [];
        resolve()        
    })
};

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if(teamsDatabase[userId].length == 6){
            reject('Already have 6 pokemons')
        }else {
            teamsDatabase[userId].push(pokemon);
            resolve()

        }
    })
};

const setTeam = (userId, team) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = team;
        resolve()
    })
};
const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(teamsDatabase[userId]);
    })
};

const deletePokemonAt = (userId, index) => {
    return new Promise((resolve, reject) => {
        if(teamsDatabase[userId][index]){
            teamsDatabase[userId].splice(index, 1)
        }
        resolve()
    })
}

exports.setTeam = setTeam;
exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt