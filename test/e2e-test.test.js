const chai = require("chai")
const chaiHttp = require("chai-http")

const { app } = require("../app");

chai.use(chaiHttp)

describe("Suite test e2e", () => {
    it('Should return hello world', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.assert.equal(res.text, 'Hello World!')
                done()
            })
    })
})





