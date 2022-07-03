async function main() {
  require('dotenv').config();
  const {  API_GOERLI_URL, OWN_ADDRESS, HIS_ADDRESS, PRIVATE_KEY } = process.env;
  const Web3 = require('web3');
  const web3 = new Web3(API_GOERLI_URL);
  const signedTx = await web3.eth.accounts.signTransaction({
    // nonce:  可选，默认值 web3.eth.getTransactionCount().
    from: OWN_ADDRESS,
    to: HIS_ADDRESS,
    gas: 2000000,
    value: web3.utils.toWei('0.001'),
  }, PRIVATE_KEY);
  const transaction = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  console.log('eth_sendSignedTransaction', transaction.transactionHash);
}

main();