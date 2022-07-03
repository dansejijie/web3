// 以下代码不可用
async function main() {
  require('dotenv').config();
  const {  API_GOERLI_URL, OWN_ADDRESS, HIS_ADDRESS, PRIVATE_KEY, PASSWORD } = process.env;
  const Web3 = require('web3');
  const web3 = new Web3(API_GOERLI_URL);

  await web3.eth.personal.importRawKey(PRIVATE_KEY, PASSWORD)
  await web3.eth.personal.unlockAccount(OWN_ADDRESS, PASSWORD, 1000)
  const transaction = {
    from: OWN_ADDRESS,
    to: HIS_ADDRESS,
    gas: 2000000,
    value: web3.utils.toWei('0.001'),
  }
  const result = await web3.eth.sendTransaction(transaction)
  console.log('eth_sendSignedTransaction', result.transactionHash);
}

main();