async function main() {
  require('dotenv').config();
  const {  API_ETH_URL, OWN_ADDRESS, HIS_ADDRESS, PRIVATE_KEY } = process.env;
  const { ethers } = require("ethers");
  // 浏览器下，metamask 插件安装注入 window 情况
  // const provider = new ethers.providers.Web3Provider(window.ethereum)
  // rpc 模式
  const provider = new ethers.providers.JsonRpcProvider(API_ETH_URL);
  const signer = provider.getSigner()

  const blockNumber = await provider.getBlockNumber()
  console.log('blockNumber', blockNumber);

  let balance = await provider.getBalance(OWN_ADDRESS)
  balance = ethers.utils.formatEther(balance)
  console.log('provider_getBalance', balance);
}

main();