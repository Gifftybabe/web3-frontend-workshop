const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoffeeShop", function () {
  async function deployCoffeeShop() {
    const [owner, otherAccount] = await ethers.getSigners();

    const CoffeeShop = await ethers.getContractFactory("CoffeeShop");
    const coffee = await CoffeeShop.deploy();
    await coffee.deployed();

    return { coffee, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { coffee, owner } = await loadFixture(deployCoffeeShop);
      expect(await coffee.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should not revert when a normal address buys coffee", async function () {
      const { coffee, otherAccount } = await loadFixture(deployCoffeeShop);
      
      await expect(coffee.connect(otherAccount).buyCoffee("Name", "Message", { value: ethers.utils.parseEther("0.01") }))
        .to.not.be.reverted;
    });

    it("Should revert when trying to buy coffee with zero value", async function () {
      const { coffee, otherAccount } = await loadFixture(deployCoffeeShop);

      await expect(coffee.connect(otherAccount).buyCoffee("Name", "Message", { value: 0 }))
        .to.be.revertedWith("Zero amount not accepted");
    });

    it("Should allow buying coffee with non-zero value", async function () {
      const { coffee, otherAccount } = await loadFixture(deployCoffeeShop);
      const coffeeValue = ethers.utils.parseEther("0.01");

      await expect(coffee.connect(otherAccount).buyCoffee("Name", "Message", { value: coffeeValue }))
        .to.not.be.reverted;
    });
  });

  describe("Storage", function () {
    it("Should store the memo correctly", async function () {
      const { coffee, otherAccount } = await loadFixture(deployCoffeeShop);
      const name = "David";
      const message = "Delicious!";
      const amount = ethers.utils.parseEther("0.001");

      await coffee.connect(otherAccount).buyCoffee(name, message, { value: amount });

      const memos = await coffee.getMemo();
      expect(memos.length).to.equal(1);
      expect(memos[0].name).to.equal(name);
      expect(memos[0].message).to.equal(message);
      expect(memos[0].from).to.equal(otherAccount.address);
    });

    it("Should return all memos", async function () {
      const { coffee, owner, otherAccount } = await loadFixture(deployCoffeeShop);
      const amount = ethers.utils.parseEther("0.001");
      await coffee.connect(owner).buyCoffee("Alice", "First coffee", { value: amount });
      await coffee.connect(otherAccount).buyCoffee("Bob", "Second coffee", { value: amount });

      const memos = await coffee.getMemo();
      expect(memos.length).to.equal(2);
      expect(memos[0].name).to.equal("Alice");
      expect(memos[1].name).to.equal("Bob");
    });
  });
});