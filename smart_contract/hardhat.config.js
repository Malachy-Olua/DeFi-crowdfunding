
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const{ALCHEMY_API_KEY, METAMASK_PRIVATE_KEY} = process.env;

//** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks:{
    mumbai:{
      url:ALCHEMY_API_KEY, //Alchemy HTTP key
      accounts: [METAMASK_PRIVATE_KEY] // Metamask private key of the account containing a faucet ethereum;
    }
  },
};
