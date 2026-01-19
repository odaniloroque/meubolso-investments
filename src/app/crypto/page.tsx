import { Sidebar } from '@/components/layout'
import styles from '../page.module.css'

const cryptoAssets = [
    { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin', balance: 0.52, price: 250000, value: 130000, variation: 5.2 },
    { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum', balance: 3.5, price: 15000, value: 52500, variation: 3.8 },
    { symbol: 'SOL', name: 'Solana', network: 'Solana', balance: 45, price: 850, value: 38250, variation: 8.2 },
    { symbol: 'MATIC', name: 'Polygon', network: 'Polygon', balance: 1200, price: 4.5, value: 5400, variation: -2.1 },
    { symbol: 'ARB', name: 'Arbitrum', network: 'Arbitrum', balance: 500, price: 8.2, value: 4100, variation: 1.5 },
    { symbol: 'USDT', name: 'Tether', network: 'Ethereum', balance: 5000, price: 5.0, value: 25000, variation: 0 },
]

const wallets = [
    { label: 'MetaMask Principal', address: '0x1234...abcd', network: 'Ethereum', balance: 82000 },
    { label: 'Ledger', address: '0x5678...efgh', network: 'Multi-chain', balance: 130000 },
    { label: 'Phantom', address: 'Abc1...xyz9', network: 'Solana', balance: 38250 },
    { label: 'Bitcoin Wallet', address: 'bc1q...m8n7', network: 'Bitcoin', balance: 130000 },
]

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

function formatPercentage(value: number) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export default function CryptoPage() {
    const totalValue = cryptoAssets.reduce((acc, asset) => acc + asset.value, 0)

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.content}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>₿ Criptomoedas</h1>
                        <p className={styles.subtitle}>Bitcoin, Ethereum, Solana e outras redes</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button className="btn btn-secondary">Conectar Carteira</button>
                        <button className="btn btn-primary">+ Adicionar Wallet</button>
                    </div>
                </header>

                {/* Summary Cards */}
                <section className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div className="card">
                        <div className="card-subtitle">Total em Crypto</div>
                        <div className="stat-value">{formatCurrency(totalValue)}</div>
                        <span className="stat-change positive">+4.8%</span>
                    </div>
                    <div className="card">
                        <div className="card-subtitle">Bitcoin</div>
                        <div className="stat-value">{formatCurrency(130000)}</div>
                        <span className="stat-change positive">+5.2%</span>
                    </div>
                    <div className="card">
                        <div className="card-subtitle">Altcoins</div>
                        <div className="stat-value">{formatCurrency(totalValue - 130000)}</div>
                        <span className="stat-change positive">+3.5%</span>
                    </div>
                    <div className="card">
                        <div className="card-subtitle">Carteiras</div>
                        <div className="stat-value">{wallets.length}</div>
                    </div>
                </section>

                {/* Main Grid */}
                <section className="grid grid-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    {/* Wallets */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Carteiras Conectadas</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {wallets.map((wallet, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 'var(--spacing-sm)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--bg-tertiary)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                        <div className="asset-icon">👛</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{wallet.label}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                {wallet.address} • {wallet.network}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 600 }}>{formatCurrency(wallet.balance)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Network Distribution */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Distribuição por Rede</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {[
                                { name: 'Bitcoin', value: 130000, color: '#f7931a', percentage: 51 },
                                { name: 'Ethereum', value: 77500, color: '#627eea', percentage: 30 },
                                { name: 'Solana', value: 38250, color: '#9945ff', percentage: 15 },
                                { name: 'Polygon', value: 5400, color: '#8247e5', percentage: 2 },
                                { name: 'Arbitrum', value: 4100, color: '#28a0f0', percentage: 2 },
                            ].map((network) => (
                                <div key={network.name}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                            <span style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                background: network.color
                                            }} />
                                            {network.name}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            {network.percentage}%
                                        </span>
                                    </div>
                                    <div style={{
                                        height: '6px',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: 'var(--radius-full)',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${network.percentage}%`,
                                            height: '100%',
                                            background: network.color,
                                            borderRadius: 'var(--radius-full)'
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Assets Table */}
                <section>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Seus Ativos</h3>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ativo</th>
                                    <th>Rede</th>
                                    <th>Quantidade</th>
                                    <th>Preço</th>
                                    <th>Valor Total</th>
                                    <th>24h</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cryptoAssets.map((asset) => (
                                    <tr key={asset.symbol}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                                <div className="asset-icon">{asset.symbol.slice(0, 2)}</div>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{asset.symbol}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{asset.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge">{asset.network}</span>
                                        </td>
                                        <td>{asset.balance.toLocaleString('pt-BR', { maximumFractionDigits: 8 })}</td>
                                        <td>{formatCurrency(asset.price)}</td>
                                        <td>{formatCurrency(asset.value)}</td>
                                        <td>
                                            <span className={`stat-change ${asset.variation >= 0 ? 'positive' : 'negative'}`}>
                                                {formatPercentage(asset.variation)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}
