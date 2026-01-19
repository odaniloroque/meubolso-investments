import { Sidebar } from '@/components/layout'
import styles from '../page.module.css'

const b3Assets = [
    { symbol: 'PETR4', name: 'Petrobras PN', type: 'Ação', quantity: 500, avgPrice: 35.20, currentPrice: 37.00, variation: 5.11 },
    { symbol: 'VALE3', name: 'Vale ON', type: 'Ação', quantity: 200, avgPrice: 68.50, currentPrice: 72.30, variation: 5.55 },
    { symbol: 'ITUB4', name: 'Itaú Unibanco PN', type: 'Ação', quantity: 300, avgPrice: 28.00, currentPrice: 29.50, variation: 5.36 },
    { symbol: 'HGLG11', name: 'CSHG Logística', type: 'FII', quantity: 100, avgPrice: 155.00, currentPrice: 162.50, variation: 4.84 },
    { symbol: 'XPLG11', name: 'XP Log', type: 'FII', quantity: 80, avgPrice: 98.00, currentPrice: 101.20, variation: 3.27 },
    { symbol: 'BOVA11', name: 'iShares Ibovespa', type: 'ETF', quantity: 50, avgPrice: 110.00, currentPrice: 115.80, variation: 5.27 },
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

export default function B3Page() {
    const totalInvested = b3Assets.reduce((acc, asset) => acc + (asset.quantity * asset.avgPrice), 0)
    const totalCurrent = b3Assets.reduce((acc, asset) => acc + (asset.quantity * asset.currentPrice), 0)
    const totalVariation = ((totalCurrent - totalInvested) / totalInvested) * 100

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.content}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>🏛️ Investimentos B3</h1>
                        <p className={styles.subtitle}>Sua carteira de ações, FIIs e ETFs</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button className="btn btn-secondary">Sincronizar CEI</button>
                        <button className="btn btn-primary">+ Adicionar Ativo</button>
                    </div>
                </header>

                {/* Summary Cards */}
                <section className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div className="card">
                        <div className="card-subtitle">Total Investido</div>
                        <div className="stat-value">{formatCurrency(totalInvested)}</div>
                    </div>
                    <div className="card">
                        <div className="card-subtitle">Valor Atual</div>
                        <div className="stat-value">{formatCurrency(totalCurrent)}</div>
                    </div>
                    <div className="card">
                        <div className="card-subtitle">Lucro/Prejuízo</div>
                        <div className="stat-value">{formatCurrency(totalCurrent - totalInvested)}</div>
                        <span className={`stat-change ${totalVariation >= 0 ? 'positive' : 'negative'}`}>
                            {formatPercentage(totalVariation)}
                        </span>
                    </div>
                    <div className="card">
                        <div className="card-subtitle">Ativos</div>
                        <div className="stat-value">{b3Assets.length}</div>
                    </div>
                </section>

                {/* Assets Table */}
                <section>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Seus Ativos</h3>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <button className="btn btn-ghost">Ações</button>
                                <button className="btn btn-ghost">FIIs</button>
                                <button className="btn btn-ghost">ETFs</button>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ativo</th>
                                    <th>Tipo</th>
                                    <th>Quantidade</th>
                                    <th>Preço Médio</th>
                                    <th>Preço Atual</th>
                                    <th>Total</th>
                                    <th>Variação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {b3Assets.map((asset) => (
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
                                            <span className={`badge ${asset.type === 'Ação' ? 'badge-info' : asset.type === 'FII' ? 'badge-success' : 'badge-warning'}`}>
                                                {asset.type}
                                            </span>
                                        </td>
                                        <td>{asset.quantity}</td>
                                        <td>{formatCurrency(asset.avgPrice)}</td>
                                        <td>{formatCurrency(asset.currentPrice)}</td>
                                        <td>{formatCurrency(asset.quantity * asset.currentPrice)}</td>
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
