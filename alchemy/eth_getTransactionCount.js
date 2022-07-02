async function main() {
  require('dotenv').config();
  const { API_ETH_URL, OWN_ADDRESS } = process.env;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_ETH_URL);
  const count = await web3.eth.getTransactionCount(OWN_ADDRESS); 
  console.log("eth_getTransactionCount " ,count );
}
main();