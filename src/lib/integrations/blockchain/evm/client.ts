// EVM (Ethereum Virtual Machine) Networks Client
// Supports: Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, Base

import { Network } from '@/generated/prisma'

export interface EVMConfig {
    rpcUrls: Partial<Record<Network, string>>
}

export interface TokenBalance {
    contractAddress: string
    symbol: string
    name: string
    decimals: number
    balance: string
    balanceFormatted: number
}

export interface EVMTransaction {
    hash: string
    from: string
    to: string
    value: string
    timestamp: Date
    blockNumber: number
    gasUsed: string
    status: 'success' | 'failed'
}

const DEFAULT_RPC_URLS: Partial<Record<Network, string>> = {
    ETHEREUM: 'https://eth.llamarpc.com',
    POLYGON: 'https://polygon.llamarpc.com',
    BSC: 'https://bsc-dataseed.binance.org',
    ARBITRUM: 'https://arb1.arbitrum.io/rpc',
    OPTIMISM: 'https://mainnet.optimism.io',
    AVALANCHE: 'https://api.avax.network/ext/bc/C/rpc',
    BASE: 'https://mainnet.base.org',
}

export class EVMClient {
    private config: EVMConfig

    constructor(config?: Partial<EVMConfig>) {
        this.config = {
            rpcUrls: { ...DEFAULT_RPC_URLS, ...config?.rpcUrls },
        }
    }

    /**
     * Get native token balance (ETH, MATIC, BNB, etc)
     */
    async getNativeBalance(address: string, network: Network): Promise<string> {
        const rpcUrl = this.config.rpcUrls[network]
        if (!rpcUrl) throw new Error(`No RPC URL configured for ${network}`)

        try {
            const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [address, 'latest'],
                    id: 1,
                }),
            })

            const data = await response.json()
            return data.result || '0x0'
        } catch (error) {
            console.error(`Error fetching native balance for ${address} on ${network}:`, error)
            return '0x0'
        }
    }

    /**
     * Get ERC-20 token balances
     * Uses external API (e.g., Alchemy, Moralis) for efficiency
     */
    async getTokenBalances(address: string, network: Network): Promise<TokenBalance[]> {
        // TODO: Implement using Alchemy/Moralis API
        console.log(`Fetching token balances for ${address} on ${network}`)
        return []
    }

    /**
     * Get transaction history
     */
    async getTransactionHistory(
        address: string,
        network: Network,
        startBlock?: number
    ): Promise<EVMTransaction[]> {
        // TODO: Implement using Etherscan/Polygonscan API
        console.log(`Fetching tx history for ${address} on ${network} from block ${startBlock}`)
        return []
    }

    /**
     * Get current gas price
     */
    async getGasPrice(network: Network): Promise<string> {
        const rpcUrl = this.config.rpcUrls[network]
        if (!rpcUrl) throw new Error(`No RPC URL configured for ${network}`)

        try {
            const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_gasPrice',
                    params: [],
                    id: 1,
                }),
            })

            const data = await response.json()
            return data.result || '0x0'
        } catch (error) {
            console.error(`Error fetching gas price for ${network}:`, error)
            return '0x0'
        }
    }

    /**
     * Format wei to ether
     */
    static weiToEther(wei: string): number {
        const weiBigInt = BigInt(wei)
        const divisor = BigInt(10 ** 18)
        const wholePart = weiBigInt / divisor
        const fractionalPart = weiBigInt % divisor
        return Number(wholePart) + Number(fractionalPart) / Number(divisor)
    }
}

export const createEVMClient = (config?: Partial<EVMConfig>) => new EVMClient(config)
