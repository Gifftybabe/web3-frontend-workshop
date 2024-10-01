import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    typechain: {
        outDir: "typechain-types", // Directory to store generated types
        target: "ethers-v6", // Target for Ethers.js v6
    },
};

export default config;
