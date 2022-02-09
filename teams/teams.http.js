const axios = require("axios");
const { getUser } = require("../auth/users.controller");
const teamsController = require("./teams.controller");

const getTeamFromUser = (req, res) => {
    let user = getUser(req.user.userId.userId);
    res.status(200).json({
        trainer: user.username,
        team: teamsController.getTeamOfUser(req.user.userId.userId),
    });
};

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId.userId, req.body.team);
    res.status(200).send();
};

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name;
    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then((response) => {
            let pokemon = {
                name: pokemonName,
                pokedexNumber: response.data.id,
            };
            teamsController.addPokemon(req.user.userId.userId, pokemon);
            res.status(201).json(pokemon);
        })
        .catch((err) => {
            res.status(400).json({ message: err });
        });
};

const deletePokemonFromTeam = (req, res) => {
    teamsController.deletePokemonAt(req.user.userId.userId, req.params.pokeid);
    res.status(200).send();
};

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;
