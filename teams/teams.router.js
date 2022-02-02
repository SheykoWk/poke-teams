const passport = require("passport");
const router = require("express").Router();
const axios = require("axios");

const teamsController = require("./teams.controller");
const { getUser } = require("../auth/users.controller");

router
    .route("/")
    .get((req, res) => {
        let user = getUser(req.user.userId.userId);
        res.status(200).json({
            trainer: user.username,
            team: teamsController.getTeamOfUser(req.user.userId.userId),
        });
    })
    .put( (req, res) => {
        teamsController.setTeam(req.user.userId.userId, req.body.team);
        res.status(200).send();
    });

router
    .route("/pokemons")
    .post( (req, res) => {
        let pokemonName = req.body.name;
        axios
            .get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
            )
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
    });

router
    .route("/pokemons/:pokeid")
    .delete( (req, res) => {
        teamsController.deletePokemonAt(req.user.userId.userId, req.params.pokeid)
        res.status(200).send()
    });

exports.router = router;
