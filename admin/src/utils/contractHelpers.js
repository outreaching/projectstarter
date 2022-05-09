import web3NoAccount from './web3'
import tokenAbi from './tokenAbi.json'
import PrjtStrterAbi from './PrjtStrterAbi.json'
import poolContract from './poolContract.json'


const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    // console.log('_web3',_web3);
    return new _web3.eth.Contract(abi, address)
}

export const TokenContract = (address, web3) => {
    return getContract(tokenAbi, address, web3)
}

export const getContractStake= (address, web3) => {
    return getContract(PrjtStrterAbi, address, web3)
}

export const getPoolContract= (address, web3) => {
    return getContract(poolContract, address, web3)
}


// export default TokenContract;