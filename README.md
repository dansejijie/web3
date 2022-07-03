# TODO

## ethers

- 合约签名转账

## etherscan

- 接口 abi timeout ，猜测是代理问题

## web3

- 合约转账

# 新人学习 Web3 过程

## eth_transaction

- 指定 ETH 转账

* 指定 Token 转账

## baseFeePerGas vs maxPriorityFeePerGas vs maxFeePerGas

- baseFeePerGas 由网络决定而非矿工， 基本费用，用于燃烧

* maxPriorityFeePerGas 矿工小费，提高打包优先级

* maxFeePerGas 交易最大花费， maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas

## testnet

Average block time: 15 seconds.
Chain ID: 5
Status Dashboard:
https://stats.goerli.net/
https://goerli.ethstats.io/
Block Explorer:
https://goerli.etherscan.io/
Faucet:
https://goerlifaucet.com

## web3 eth_sendSignedTransaction

- sendSignedTransaction 签名需要通过 web3.eth.accounts.signTransaction

* sendTransaction 账户需要解锁
  \*\* web3.eth.personal 估计在测试网不可用， wuf

## ehers signer

- https://ethereum.stackexchange.com/questions/103502/how-to-set-private-key-for-ethers-signer

* uni3swap goerli https://app.uniswap.org/#/swap?chain=goerli
