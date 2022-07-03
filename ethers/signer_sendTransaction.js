async function main() {
  require('dotenv').config();
  const {  API_GOERLI_URL, OWN_ADDRESS, HIS_ADDRESS, PRIVATE_KEY } = process.env;
  const { ethers } = require("ethers");
  // rpc 模式
  const provider = new ethers.providers.JsonRpcProvider(API_GOERLI_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  // Send 1 ether to an ens name.
  const tx = await signer.sendTransaction({
    from: OWN_ADDRESS,
    to: HIS_ADDRESS,
    value: ethers.utils.parseEther("0.001")
  });
  console.log('signer_sendTransaction', tx);
}

main();