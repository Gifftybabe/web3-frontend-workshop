const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Greet", function () {

  async function deployGreeter() {

    const greet = await ethers.getContractFactory("Greeter");
    const greeter = await greet.deploy('Hello, World!');

    return { greeter };
  }

  describe("Deployment", function () {
    it("Should return a greeting passed into it", async function () {
      const { greeter } = await loadFixture(deployGreeter);

      expect(await greeter.greet()).to.equal('Hello, World!');

    });

    it("Should return the new greeting once it's changed", async function () {
      const { greeter } = await loadFixture(deployGreeter);

      const greet = "Holla, web3";

      await greeter.setGreeting(greet);

      expect(await greeter.greet()).to.equal("Holla, web3");
    });

  });

  describe("getBalance", function () {
    it("Should return the new balance after ether is deposited", async function () {
      const { greeter } = await loadFixture(deployGreeter);

      const depositAmount = ethers.parseEther("1.0"); // 1 Ether
      
      await expect(greeter.deposit({ value: depositAmount }))
        .to.changeEtherBalance(greeter, depositAmount);

      const balance = await ethers.provider.getBalance(greeter.target);
      
      expect(balance).to.equal(depositAmount);
    });
  });
});
