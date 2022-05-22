const Mintify = artifacts.require("Mintify");
const MintifyMarket = artifacts.require("MintifyMarket");

module.exports = function (deployer) {
  deployer.deploy(Mintify);
  deployer.deploy(MintifyMarket);
};

