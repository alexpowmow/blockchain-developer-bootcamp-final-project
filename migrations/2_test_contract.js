const Migrations = artifacts.require("testContract");

module.exports = function (deployer) {
  deployer.deploy(TestContract);
};
