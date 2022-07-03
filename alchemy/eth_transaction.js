async function main() {
  require('dotenv').config();
  const BigNumber = require('bignumber.js');
  const { API_GOERLI_URL, PRIVATE_KEY, OWN_ADDRESS, HIS_ADDRESS } = process.env;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_GOERLI_URL);
  const estimateGas = await web3.eth.estimateGas({
    to: HIS_ADDRESS,
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
  });
  // 获取当前链上gas价格
  const gasPrice = await web3.eth.getGasPrice();
  // 未知，关联了发送地址
  const nonce = await web3.eth.getTransactionCount(OWN_ADDRESS, 'latest');
  const transaction = {
    nonce: nonce,
    gas: estimateGas,
    gasPrice: gasPrice,
    to: HIS_ADDRESS,
    value: new BigNumber('10000000000000000'), // eth 最小单位是wei， 1eth = 10^18 wei, value 的单位是wei
  };
  // 签名转账信息
  const signedTx =  await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("Transaction sent!", hash);
      const interval = setInterval(function() {
        console.log("Attempting to get transaction receipt...");
        // 轮训是否转账成功
        web3.eth.getTransactionReceipt(hash, function(err, rec) {
          if (rec) {
            console.log(rec);
            clearInterval(interval);
          }
        });
      }, 1000);
    } else {
      console.log("Something went wrong while submitting your transaction:", error);
    }
  });
}
main();