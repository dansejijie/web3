# eth_transaction

- 指定 ETH 转账

* 指定 Token 转账

# baseFeePerGas vs maxPriorityFeePerGas vs maxFeePerGas

- baseFeePerGas 由网络决定而非矿工， 基本费用，用于燃烧

* maxPriorityFeePerGas 矿工小费，提高打包优先级

* maxFeePerGas 交易最大花费， maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas
