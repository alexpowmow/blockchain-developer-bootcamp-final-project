const { assert } = require("console");
const { isTypedArray } = require("util/types");

const TestContract = artifacts.require("TestContract");

testContract("TestContract", function (){
    it("Should assert true"), async function (){
        await TestContract.deployed();
        return assert.isTrue(true);
    }
});