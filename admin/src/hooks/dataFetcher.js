import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import useWeb3 from './useWeb3'
import {getContractStake, TokenContract } from '../utils/contractHelpers.js'
import { getFullDisplayBalance, getBalanceNumber } from '../utils/formatBalance'
import useRefresh from './useRefresh'
import environment from '../utils/Environment';
import axios from 'axios';


const useApprove = () => {
    const web3 = useWeb3();
    const { account } = useWeb3React();
    try{
    const ApproveTokens = useCallback(async () => {
        const contract = TokenContract("0xC0731b3633e0340FE72943AE5B5b0261319599Fc", web3)
        const approved = await contract.methods.approve("0xb00d1991b6515C4EF342D6394606F600C9534D45", web3.utils.toWei('1000000000000000', 'ether')).send({ from: account })
            .on('transactionHash', (tx) => { return tx.transactionHash });
        return approved
    }, [account])

    return { Approve: ApproveTokens }
}catch(err){
    console.log("approve err",err)
}
}

const CheckAllowance= ()=>{
    const [balance, setBalance] = useState()
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const contract = TokenContract("0xC0731b3633e0340FE72943AE5B5b0261319599Fc", web3)
    useEffect(() => {
        const fetchBalance = async () => {
            let tallow = await contract.methods.allowance(account, '0xb00d1991b6515C4EF342D6394606F600C9534D45').call()
           let allowance = getBalanceNumber(tallow, 18)
            // setBalance(new BigNumber(balance))
            await   setBalance(allowance)
        }

        if (account) {
            fetchBalance()
        }
    }, [account])

    return balance
}

const StakedAmount= ()=>{
    const [Stakedbalance, setStakedBalance] = useState()
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const contract = getContractStake("0xb00d1991b6515C4EF342D6394606F600C9534D45", web3)
    useEffect(() => {
        const fetchBalance = async () => {
            let tallow = await contract.methods.userInfo(0,account).call()
           await setStakedBalance(parseInt(tallow.amount).toFixed(2))
        }

        if (account) {
            fetchBalance()
        }
    }, [account, contract])

    return Stakedbalance
}


 export const UseTokenBalance = () => {
    const [balance, setBalance] = useState()
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const contract = TokenContract("0xC0731b3633e0340FE72943AE5B5b0261319599Fc", web3)
    useEffect(() => {
        const fetchBalance = async () => {
            let balance = await contract.methods.balanceOf(account).call()
            await setBalance(balance)
        }

        if (account) {
            fetchBalance()
        }
    }, [account, contract])

    return balance
}


const useStake = (amount) => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contract = getContractStake("0xb00d1991b6515C4EF342D6394606F600C9534D45", web3)
    // amount = web3.utils.toWei(amount, 'ether');
    console.log("amounnnttt", amount, account)
    const StakePsr = useCallback(async () => {
        try {
            const approved = await contract.methods.enterStaking(amount).send({ from: account })
                .on('transactionHash', (tx) => { return tx.transactionHash })
                .on('error', () => { return false })
            return approved
        } catch (error) {
            console.log( 'error::::::', error)
            throw error;
        }

    }, [account])

    return { Stake: StakePsr }
}

const useUnStake = (amount) => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contract = getContractStake("0xb00d1991b6515C4EF342D6394606F600C9534D45", web3)
    // amount = web3.utils.toWei(amount, 'ether');
    
    const UnStakePsr = useCallback(async () => {
        console.log("amounnntttunnnnnnn", amount, account)
        try{
        const approved = await contract.methods.leaveStaking( amount).send({ from: account })
            .on('transactionHash', (tx) => { return tx.transactionHash });
        return approved
        }catch (error) {
            console.log(
                'error::::::', error
            )
            throw error;
        }
    }, [account])

    return { UnStakeToken: UnStakePsr }
}
 export default UseTokenBalance

export { useStake, useUnStake, useApprove  ,  CheckAllowance, StakedAmount};