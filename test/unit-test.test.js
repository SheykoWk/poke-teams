const assert = require("chai").assert;

function addValue(a,b){
    return a+b
}

describe('Example suite Test', () => {
    it('Should return 2', () => {
        let func = addValue(2,2)
        assert.equal(func, 4)
    })
})
