import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import getNodeUrl from './getRpcUrl'
import { Web3Provider } from "@ethersproject/providers"

const ConnectorNames = {
    Injected: "injected",
    WalletConnect: "walletconnect",
    BSC: "bsc"
}

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID)

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector,
}

export const getLibrary = (provider) => {
    try {
        return provider
    } catch (error) {
        console.log("web3 provider not found", error)
    }
}

export const getLibraryForSign = (provider) => {
    try {
        const library = new Web3Provider(provider);
        return library
    } catch (error) {
        console.log("web3 provider not found", error)
    }
}