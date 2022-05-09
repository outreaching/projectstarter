import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from '../hooks/useWeb3'
const useEthBalance = () => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const { account } = useWeb3React()
    const web3 = useWeb3()
    useEffect(() => {
        const fetchBalance = async () => {
            const res = await web3.eth.getBalance(account)
            setBalance(new BigNumber(res))
        }
        if (account) {
            fetchBalance()
        }
    }, [account])
    return balance
}

export default useEthBalance
export { useEthBalance };