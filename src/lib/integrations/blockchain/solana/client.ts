// Solana Client
// Uses public RPC and APIs for balance and transaction queries

export interface SolanaConfig {
    rpcUrl?: string
}

export interface SolanaTokenBalance {
    mint: string
    symbol?: string
    name?: string
    amount: string
    decimals: number
    uiAmount: number
}

export interface SolanaTransaction {
    signature: string
    slot: number
    blockTime: number | null
    fee: number
    status: 'success' | 'failed'
    type: string
}

const DEFAULT_RPC = 'https://api.mainnet-beta.solana.com'

export class SolanaClient {
    private rpcUrl: string

    constructor(config?: SolanaConfig) {
        this.rpcUrl = config?.rpcUrl || DEFAULT_RPC
    }

    /**
     * Get SOL balance
     */
    async getBalance(address: string): Promise<number> {
        try {
            const response = await fetch(this.rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getBalance',
                    params: [address],
                }),
            })

            const data = await response.json()
            return data.result?.value || 0
        } catch (error) {
            console.error(`Error fetching SOL balance for ${address}:`, error)
            return 0
        }
    }

    /**
     * Get SPL token balances
     */
    async getTokenBalances(address: string): Promise<SolanaTokenBalance[]> {
        try {
            const response = await fetch(this.rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getTokenAccountsByOwner',
                    params: [
                        address,
                        { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
                        { encoding: 'jsonParsed' },
                    ],
                }),
            })

            const data = await response.json()
            const accounts = data.result?.value || []

            return accounts.map((account: {
                account: {
                    data: {
                        parsed: {
                            info: {
                                mint: string
                                tokenAmount: {
                                    amount: string
                                    decimals: number
                                    uiAmount: number
                                }
                            }
                        }
                    }
                }
            }) => {
                const info = account.account.data.parsed.info
                return {
                    mint: info.mint,
                    amount: info.tokenAmount.amount,
                    decimals: info.tokenAmount.decimals,
                    uiAmount: info.tokenAmount.uiAmount,
                }
            })
        } catch (error) {
            console.error(`Error fetching token balances for ${address}:`, error)
            return []
        }
    }

    /**
     * Get transaction signatures
     */
    async getTransactionSignatures(address: string, limit = 10): Promise<string[]> {
        try {
            const response = await fetch(this.rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getSignaturesForAddress',
                    params: [address, { limit }],
                }),
            })

            const data = await response.json()
            return (data.result || []).map((item: { signature: string }) => item.signature)
        } catch (error) {
            console.error(`Error fetching transaction signatures for ${address}:`, error)
            return []
        }
    }

    /**
     * Get transaction details
     */
    async getTransaction(signature: string): Promise<SolanaTransaction | null> {
        try {
            const response = await fetch(this.rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getTransaction',
                    params: [signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }],
                }),
            })

            const data = await response.json()
            const tx = data.result

            if (!tx) return null

            return {
                signature,
                slot: tx.slot,
                blockTime: tx.blockTime,
                fee: tx.meta?.fee || 0,
                status: tx.meta?.err ? 'failed' : 'success',
                type: 'unknown',
            }
        } catch (error) {
            console.error(`Error fetching transaction ${signature}:`, error)
            return null
        }
    }

    /**
     * Convert lamports to SOL
     */
    static lamportsToSOL(lamports: number): number {
        return lamports / 1_000_000_000
    }

    /**
     * Convert SOL to lamports
     */
    static solToLamports(sol: number): number {
        return Math.floor(sol * 1_000_000_000)
    }
}

export const createSolanaClient = (config?: SolanaConfig) => new SolanaClient(config)
