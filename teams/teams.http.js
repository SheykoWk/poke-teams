const axios = require("axios");
const { getUser } = require("../auth/users.controller");
const { to } = require("../tools/to");
const teamsController = require("./teams.controller");

const getTeamFromUser = async (req, res) => {
    let user = getUser(req.user.userId.userId);
    let team = await teamsController.getTeamOfUser(req.user.userId.userId);
    res.status(200).json({
        trainer: user.username,
        team: team,
    });
};

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId.userId, req.body.team);
    res.status(200).send();
};

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    let [pokeapiError, pokeapiResponse] = 
        await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`));
    if (pokeapiError) {
        return res.status(400).json({ message: pokeapiError });
    }
    let pokemon = {
        name: pokemonName,
        pokedexNumber: pokeapiResponse.data.id,
    };
        let [errorAdd, responseAdd] = await to(teamsController.addPokemon(req.user.userId.userId, pokemon));
        console.log("error add", errorAdd)
        console.log("result add", responseAdd)
        if(errorAdd){
            return res.status(400).json({ message: "You have already 6 pokemons in your team" });
        }
        return res.status(201).json(pokemon);
    
};

const deletePokemonFromTeam = (req, res) => {
    teamsController.deletePokemonAt(req.user.userId.userId, req.params.pokeid);
    res.status(200).send();
};

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;
