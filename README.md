# ProtoNTF Solidity Project

## Project Overview

ProtoNTF leverages the ERC721A standard for efficient batch minting, offering a unique approach to NFT creation and management. This project aims to reduce gas costs for minting multiple NFTs, making it more accessible and affordable. It includes features like payable minting, where users can mint NFTs by sending ETH, and a burn function for token destruction, enhancing the flexibility in managing the NFT lifecycle.

## Features

- Utilizes ERC721A for optimized batch minting, significantly reducing gas costs.
- Payable mint function allowing users to mint one or multiple tokens by sending the correct amount of ETH.
- Burn function for users to destroy their NFTs, offering a level of control over the token's lifecycle.
- Withdraw function for the contract owner to withdraw the contract's balance, ensuring secure management of funds.
- Base URI for storing metadata on IPFS, providing immutable, decentralized storage for NFT data.

## Installation

To interact with the ProtoNTF project:

1. Clone the repository to your machine.
2. Run `yarn install` to install all required dependencies.
3. Set up your `.env` file according to the project's needs for secure development.

## Usage

The project includes Yarn scripts for easy interaction:

- `yarn compile`: Compiles the smart contract.
- `yarn test`: Runs tests to ensure the contract's integrity.
- `yarn start`: Starts a local blockchain environment for testing.
- `yarn deploy:sepolia`: Deploys the contract to the Sepolia test network.
- `yarn deploy:dev`: Deploys the contract to a local blockchain for development.

## Contract Functions

- `mint(quantity)`: Allows users to mint a specified quantity of NFTs, payable with ETH.
- `burn(tokenId)`: Enables token holders to permanently remove their token from circulation.
- `withdraw()`: Permits the contract owner to withdraw all funds from the contract.
- `tokenURI(tokenId)`: Returns the full URI for a token's metadata stored on IPFS.

## Requirements

- Node.js
- Yarn or npm
- Hardhat for smart contract development tasks

## Configuration

Ensure `hardhat.config.js` is properly set up with network configurations and that your `.env` file contains necessary environment variables.

## Contributing

Contributions are welcome. Fork the repository, push your changes to a new branch, and submit a pull request for review.

## License

This project is open-sourced under the MIT license.
