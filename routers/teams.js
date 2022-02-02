const passport = require("passport");
const router = require("express").Router();
const axios = require("axios")
require("../auth")(passport);

const teamsController = require("../controllers/teams");
const { getUser } = require("../controllers/users");

router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        let user = getUser(req.user.userId.userId);
        res.status(200).json({
            trainer: user.username,
            team: teamsController.getTeamOfUser(req.user.userId.userId),
        });
    })
    .put(passport.authenticate("jwt", { session: false }), (req, res) => {
        teamsController.setTeam(req.user.userId.userId, req.body.team);
        res.status(200).send();
    });

router
    .route("/pokemons")
    .post(passport.authenticate("jwt", { session: false }), (req, res) => {
        let pokemonName = req.body.name;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then((response) => {
            console.log(response.data)
            let pokemon = {name: pokemonName, pokedexNumber: response.data.id}
            teamsController.addPokemon(req.user.userId.userId, pokemon)
            res.status(201).json(pokemon)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({message: err})
        })
    });

router.route("/pokemons/:id").delete((req, res) => {
    res.status(200).send("Hello World!");
});

exports.router = router;
