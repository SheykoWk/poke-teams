const chai = require("chai");
const chaiHttp = require("chai-http");

const { app } = require("../../app");
const usersController = require("../users.controller");
const teamsController = require("../../teams/teams.controller");

chai.use(chaiHttp);

beforeEach(async () => {  
    await usersController.registerUser("sheyko", "1234");
    await usersController.registerUser("admin", "4321");
})

afterEach(async () => {
    await usersController.cleanUpUsers()
    await teamsController.cleanUpTeam()
})


describe("Suite Auth Test", () => {
    it("Shoul requrn 401 when no jwt available", (done) => {
        //When the request have not the key
        chai.request(app)
            .get("/team")
            .end((err, res) => {
                chai.assert.equal(res.status, 401);
                done();
            });
    });
    it("Should return 400 when no data is provided", (done) => {
        chai.request(app)
            .post("/auth/login")
            .end((err, res) => {
                chai.assert.equal(res.status, 400);
                done();
            });
    });
    it("Shoul requrn 200 and token for succesful login", (done) => {
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ username: "sheyko", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                done();
            });
    });
    it("Should return 200 when jwt is valid", (done) => {
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ username: "sheyko", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.request(app)
                    .get("/team")
                    .set("Authorization", `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.status, 200);
                        done();
                    });
            });
    });
});