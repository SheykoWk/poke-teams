const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../app").app;
const usersController = require("../controllers/users");
const teamsController = require("../controllers/teams")
before((done) => {  
    usersController.registerUser("sheyko", "1234");
    usersController.registerUser("admin", "4321");
    done()
})
afterEach((done) => {
    teamsController.cleanUpTeam()
    done()
})

describe("Suite Team's test", () => {
    it("Should return the team of the given user", (done) => {
        let team = [{ name: "Charizard" }, { name: "Pikachu" }];
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ user: "sheyko", password: "1234" })
            .end((err, res) => {
                const token = res.body.token;
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .put("/team")
                    .send({ team: team })
                    .set("Authorization", `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get("/team")
                            .set("Authorization", `JWT ${token}`)
                            .end((err, res) => {
                                //{trainer: 'sheyko', team:[Pokemon's]}
                                chai.assert.equal(res.status, 200);
                                chai.assert.equal(res.body.trainer, "sheyko");
                                chai.assert.equal(
                                    res.body.team.length,
                                    team.length
                                );
                                chai.assert.equal(
                                    res.body.team[0].name,
                                    team[0].name
                                );
                                chai.assert.equal(
                                    res.body.team[1].name,
                                    team[1].name
                                );
                                done();
                            });
                    });
            });
    });
    it("Should return the pokedex number", (done) => {
        let pokemonName = "Bulbasaur";
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ user: "sheyko", password: "1234" })
            .end((err, res) => {
                const token = res.body.token;
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .post("/team/pokemons")
                    .send({ name: pokemonName })
                    .set("Authorization", `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get("/team")
                            .set("Authorization", `JWT ${token}`)
                            .end((err, res) => {
                                //{trainer: 'sheyko', team:[Pokemon's]}
                                chai.assert.equal(res.status, 200);
                                chai.assert.equal(res.body.trainer, "sheyko");
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(
                                    res.body.team[0].name,
                                    pokemonName
                                );
                                chai.assert.equal(
                                    res.body.team[0].pokedexNumber,
                                    1
                                );
                                done();
                            });
                    });
            });
    });
});

after((done) => {
    usersController.cleanUpUsers()
    done()
})
