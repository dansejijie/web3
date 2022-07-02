async function main() {
  require('dotenv').config();
  const { API_ETH_URL, PRIVATE_KEY, OWN_ADDRESS, HIS_ADDRESS } = process.env;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_ETH_URL);
  const estimateGas = await web3.eth.estimateGas({
    to: HIS_ADDRESS,
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
  });
  // 获取当前链上gas价格
  // const gasPrice = await web3.eth.getGasPrice();
  // 未知，关联了发送地址
  const nonce = await web3.eth.getTransactionCount(OWN_ADDRESS, 'latest');
  const maxPriorityFeePerGas = await web3.eth.getMaxPriorityFeePerGas()
  const transaction = {
    nonce: nonce,
    gas: estimateGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas, // 选填，矿工优先级小费，加速矿工打包
    // gasPrice: gasPrice, // 去除gasPrice字段则表示 eip_1559
    to: HIS_ADDRESS,
    value: 100, // value: 指定的是wei， TODO，如何指定eth转账，或其他Token转账
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