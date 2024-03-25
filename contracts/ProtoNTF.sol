// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "erc721a/contracts/ERC721A.sol";

contract ProtoNTF is ERC721A {
    address payable private _owner;

    constructor() ERC721A("ProtoNTF", "PNTF") {
        _owner = payable(msg.sender);
    }

    function mint(uint256 quantity) public payable {
        require(msg.value == quantity * 0.01 ether, "Invalid amount");
        _mint(msg.sender, quantity);
    }

    function burn(uint256 tokenId) public {
        super._burn(tokenId);
    }

    function withdraw() public {
        require(msg.sender == _owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        (bool success, ) = _owner.call{value: balance}("");
        require(success, "Transfer failed.");
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmRLwwfSyPYga8BvamLM1sT2W8R9JxLDZQWJy6ZqRh5RUB/";
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721A) returns (string memory) {
        return string.concat(super.tokenURI(tokenId), ".json");
    }
}
