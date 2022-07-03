// uni3 guide ethers https://docs.uniswap.org/sdk/guides/using-ethers
async function main() {
  require('dotenv').config();
  const {  API_ETH_URL, PRIVATE_KEY } = process.env;
  const { ethers } = require("ethers");
  // rpc 模式
  const provider = new ethers.providers.JsonRpcProvider(API_ETH_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // 以太坊合约地址，需要以太坊的RPC
  const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8'
  const poolImmutablesAbi = [
    'function factory() external view returns (address)',
    'function token0() external view returns (address)',
    'function token1() external view returns (address)',
    'function fee() external view returns (uint24)',
    'function tickSpacing() external view returns (int24)',
    'function maxLiquidityPerTick() external view returns (uint128)',
  ]
  const poolContract = new ethers.Contract(poolAddress, poolImmutablesAbi, provider)

  const factory = await poolContract.factory();
  const token0 = await poolContract.token0();
  const token1 = await poolContract.token1();
  const fee = await poolContract.fee();
  const tickSpacing = await poolContract.tickSpacing();
  const maxLiquidityPerTick = await poolContract.maxLiquidityPerTick();

  console.log('factory', factory, 'token0', token0, 'token1', token1, 'fee', fee, 'tickSpacing', tickSpacing, 'maxLiquidityPerTick', maxLiquidityPerTick)
}

main();