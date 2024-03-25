import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import hre from "hardhat";

describe("ProtoNTF", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const ProtoNTFContract = await hre.ethers.getContractFactory("ProtoNTF");
    const protoNTF = await ProtoNTFContract.deploy();

    return { protoNTF, owner, otherAccount };
  }

  it("Should has name and symbol", async function () {
    const { protoNTF } = await loadFixture(deployFixture);

    expect(await protoNTF.name()).to.equal("ProtoNTF");
    expect(await protoNTF.symbol()).to.equal("PNTF");
  });

  it("Should mint a token", async function () {
    const { protoNTF, owner } = await loadFixture(deployFixture);

    await protoNTF.mint(1, { value: parseEther("0.01") });

    const ownerBalance = await protoNTF.balanceOf(owner.address);
    const ownerOfToken = await protoNTF.ownerOf(0);
    const totalSupply = await protoNTF.totalSupply();

    expect(ownerBalance).to.equal(1);
    expect(ownerOfToken).to.equal(owner.address);
    expect(totalSupply).to.equal(1);
  });

  it("Should not mint a token if not enough value", async function () {
    const { protoNTF } = await loadFixture(deployFixture);

    await expect(
      protoNTF.mint(1, { value: parseEther("0.009") })
    ).to.be.revertedWith("Invalid amount");
  });

  it("Should mint multiple tokens", async function () {
    const { protoNTF, owner } = await loadFixture(deployFixture);
    await protoNTF.mint(3, { value: parseEther("0.03") });

    const ownerBalance = await protoNTF.balanceOf(owner.address);
    const totalSupply = await protoNTF.totalSupply();

    expect(ownerBalance).to.equal(3);
    expect(totalSupply).to.equal(3);
  });

  it("Should has URI metadata", async function () {
    const { protoNTF } = await loadFixture(deployFixture);

    await protoNTF.mint(1, { value: parseEther("0.01") });

    const tokenURI = await protoNTF.tokenURI(0);

    expect(tokenURI).to.equal(
      "ipfs://QmRLwwfSyPYga8BvamLM1sT2W8R9JxLDZQWJy6ZqRh5RUB/0.json"
    );
  });

  it("Should burn a token", async function () {
    const { protoNTF, owner } = await loadFixture(deployFixture);

    await protoNTF.mint(1, { value: parseEther("0.01") });
    await protoNTF.burn(0);

    const ownerBalance = await protoNTF.balanceOf(owner.address);
    const totalSupply = await protoNTF.totalSupply();

    expect(ownerBalance).to.equal(0);
    expect(totalSupply).to.equal(0);
  });

  it("Should withdraw contract balance", async function () {
    const { protoNTF, owner, otherAccount } = await loadFixture(deployFixture);
    const otherAccoutInstance = protoNTF.connect(otherAccount);
    await otherAccoutInstance.mint(1, { value: parseEther("0.01") });

    const ownerBalanceBefore = await hre.ethers.provider.getBalance(
      owner.address
    );

    await protoNTF.withdraw();

    const contractBalance = await hre.ethers.provider.getBalance(
      await protoNTF.getAddress()
    );
    const ownerBalance = await hre.ethers.provider.getBalance(owner.address);

    expect(contractBalance).to.equal(0);
    expect(ownerBalance - ownerBalanceBefore).to.lessThanOrEqual(
      parseEther("0.01")
    );
  });

  it("Should not with draw contract balance if not owner", async function () {
    const { protoNTF, owner, otherAccount } = await loadFixture(deployFixture);
    const otherAccoutInstance = protoNTF.connect(otherAccount);
    await otherAccoutInstance.mint(1, { value: parseEther("0.01") });

    await expect(otherAccoutInstance.withdraw()).to.be.revertedWith(
      "Only owner can withdraw"
    );
  });
});
