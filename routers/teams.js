const passport = require("passport");
const router = require("express").Router();
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
        res.status(200).send()
    });

router.route("/pokemons").post((req, res) => {
    res.status(200).send("Hello World!");
});

router.route("/pokemons/:id").delete((req, res) => {
    res.status(200).send("Hello World!");
});

exports.router = router;
