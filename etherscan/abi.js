async function main() {
  const axios = require('axios');
  const tunnel = require('tunnel');
  require('dotenv').config();
  const { ETHERSCAN_APIKEY, API_GOERLI_URL } = process.env;

  // TODO 暂不支持代理，无法访问 https://github.com/sebs/etherscan-api/issues/83
  // const api = require('etherscan-api').init(ETHERSCAN_APIKEY);
  // const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  // const abi = api.contract.getabi(USDT);

  // api 调用 http://cw.hubwiz.com/card/c/etherscan-api/1/2/2/

  const Web3 = require('web3');
  const web3 = new Web3(API_GOERLI_URL);
  const version = web3.version.api;
  const http = axios.create({
    baseURL: 'http://api.etherscan.io',
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    proxy: false,
    httpsAgent: tunnel.httpsOverHttp({
      proxy: {
        host: '127.0.0.1',
        port: '7890',
      },
    }),
  });
  const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const res = await http.get(`/api?module=contract&action=getabi&address=${USDT}`)
  console.log('abi', res);
// $.getJSON('http://api.etherscan.io', function (data) {
//     var contractABI = "";
//     contractABI = JSON.parse(data.result);
//     if (contractABI != ''){
//         var MyContract = web3.eth.contract(contractABI);
//         var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
//         var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
//         console.log("result1 : " + result);            
//         var result = myContractInstance.members(1);
//         console.log("result2 : " + result);
//     } else {
//         console.log("Error" );
//     }            
// });
  
  console.log('abi', abi);
}

main();