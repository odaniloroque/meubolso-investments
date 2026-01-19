// Bitcoin Client
// Uses public APIs for balance and transaction queries

export interface BitcoinConfig {
    apiUrl?: string
}

export interface BitcoinUTXO {
    txid: string
    vout: number
    value: number // in satoshis
    status: {
        confirmed: boolean
        block_height?: number
        block_time?: number
    }
}

export interface BitcoinTransaction {
    txid: string
    status: {
        confirmed: boolean
        block_height?: number
        block_time?: number
    }
    fee: number
    vin: Array<{
        prevout: {
            scriptpubkey_address: string
            value: number
        }
    }>
    vout: Array<{
        scriptpubkey_address: string
        value: number
    }>
}

const MEMPOOL_API = 'https://mempool.space/api'

export class BitcoinClient {
    private apiUrl: string

    constructor(config?: BitcoinConfig) {
        this.apiUrl = config?.apiUrl || MEMPOOL_API
    }

    /**
     * Get address balance
     */
    async getBalance(address: string): Promise<{ confirmed: number; unconfirmed: number }> {
        try {
            const response = await fetch(`${this.apiUrl}/address/${address}`)
            const data = await response.json()

            return {
                confirmed: data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum,
                unconfirmed: data.mempool_stats.funded_txo_sum - data.mempool_stats.spent_txo_sum,
            }
        } catch (error) {
            console.error(`Error fetching Bitcoin balance for ${address}:`, error)
            return { confirmed: 0, unconfirmed: 0 }
        }
    }

    /**
     * Get UTXOs for an address
     */
    async getUTXOs(address: string): Promise<BitcoinUTXO[]> {
        try {
            const response = await fetch(`${this.apiUrl}/address/${address}/utxo`)
            return await response.json()
        } catch (error) {
            console.error(`Error fetching UTXOs for ${address}:`, error)
            return []
        }
    }

    /**
     * Get transaction history
     */
    async getTransactions(address: string): Promise<BitcoinTransaction[]> {
        try {
            const response = await fetch(`${this.apiUrl}/address/${address}/txs`)
            return await response.json()
        } catch (error) {
            console.error(`Error fetching transactions for ${address}:`, error)
            return []
        }
    }

    /**
     * Get transaction details
     */
    async getTransaction(txid: string): Promise<BitcoinTransaction | null> {
        try {
            const response = await fetch(`${this.apiUrl}/tx/${txid}`)
            return await response.json()
        } catch (error) {
            console.error(`Error fetching transaction ${txid}:`, error)
            return null
        }
    }

    /**
     * Get current BTC price in USD
     */
    async getPriceUSD(): Promise<number | null> {
        try {
            const response = await fetch(`${this.apiUrl}/v1/prices`)
            const data = await response.json()
            return data.USD || null
        } catch (error) {
            console.error('Error fetching BTC price:', error)
            return null
        }
    }

    /**
     * Convert satoshis to BTC
     */
    static satoshiToBTC(satoshis: number): number {
        return satoshis / 100_000_000
    }

    /**
     * Convert BTC to satoshis
     */
    static btcToSatoshi(btc: number): number {
        return Math.floor(btc * 100_000_000)
    }
}

export const createBitcoinClient = (config?: BitcoinConfig) => new BitcoinClient(config)
