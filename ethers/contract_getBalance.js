async function main() {
  require('dotenv').config();
  const {  API_GOERLI_URL, OWN_ADDRESS, HIS_ADDRESS, PRIVATE_KEY, GOERLI_USDC } = process.env;
  const { ethers } = require("ethers");
  const provider = new ethers.providers.JsonRpcProvider(API_GOERLI_URL);
  const daiAddress = GOERLI_USDC;
// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
  const daiAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ];
  // The Contract object
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  // Get the ERC-20 token name
  const name = await daiContract.name()
  console.log('contract', 'name', name);
  // 'Dai Stablecoin'

  // Get the ERC-20 token symbol (for tickers and UIs)
  const symbol = await daiContract.symbol()
  console.log('contract', 'symbol', symbol);

  // Get the balance of an address
  let balance = await daiContract.balanceOf(OWN_ADDRESS)

  // { BigNumber: "3118000455884268201631" }

  // Format the DAI for displaying to the user
  balance = ethers.utils.formatUnits(balance, 18)
  
  console.log('contract_getBalance', balance)
}

main();