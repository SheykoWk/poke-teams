const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../app").app;

describe("Suite Team's test", () => {
    it("Should return the team of the given user", (done) => {
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ user: "sheyko", password: "1234" })
            .end((err, res) => {
                const token = res.body.token
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .put("/team")
                    .send({team: [{name: 'Charizard'}, {name: "Pikachu"}]})
                    .set("Authorization", `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get("/team")
                            .set("Authorization", `JWT ${token}`)
                            .end((err, res) => {
                                //{trainer: 'sheyko', team:[Pokemon's]}
                                chai.assert.equal(res.status, 200);
                                chai.assert.equal(res.body.trainer, "sheyko");
                                chai.assert.equal(res.body.team.length, 2);
                                chai.assert.equal(
                                    res.body.team[0].name,
                                    "Charizard"
                                );
                                chai.assert.equal(
                                    res.body.team[1].name,
                                    "Pikachu"
                                );
                                done();
                            });
                    });
            });
    });
});
