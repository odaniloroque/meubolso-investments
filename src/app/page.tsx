import { Sidebar } from '@/components/layout'
import styles from './page.module.css'

// Dados mockados para demonstração
const portfolioSummary = {
  totalValue: 152847.32,
  variation: 3.24,
  variationValue: 4789.12,
}

const allocationData = [
  { name: 'Ações', value: 45000, color: '#6366f1', percentage: 29.4 },
  { name: 'FIIs', value: 32000, color: '#8b5cf6', percentage: 20.9 },
  { name: 'Renda Fixa', value: 28000, color: '#22c55e', percentage: 18.3 },
  { name: 'Cripto', value: 35847.32, color: '#f59e0b', percentage: 23.5 },
  { name: 'Outros', value: 12000, color: '#0ea5e9', percentage: 7.9 },
]

const topAssets = [
  { symbol: 'BTC', name: 'Bitcoin', value: 25000, variation: 5.2, type: 'Crypto' },
  { symbol: 'PETR4', name: 'Petrobras PN', value: 18500, variation: -1.3, type: 'Ação' },
  { symbol: 'HGLG11', name: 'CSHG Logística', value: 15000, variation: 0.8, type: 'FII' },
  { symbol: 'ETH', name: 'Ethereum', value: 8500, variation: 3.7, type: 'Crypto' },
  { symbol: 'VALE3', name: 'Vale ON', value: 12000, variation: 2.1, type: 'Ação' },
]

const recentTransactions = [
  { date: '2024-01-15', asset: 'BTC', type: 'Compra', quantity: 0.05, value: 2500 },
  { date: '2024-01-14', asset: 'HGLG11', type: 'Dividendo', quantity: 15, value: 142.50 },
  { date: '2024-01-12', asset: 'PETR4', type: 'Compra', quantity: 100, value: 3850 },
  { date: '2024-01-10', asset: 'ETH', type: 'Staking', quantity: 0.02, value: 45 },
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

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Visão geral dos seus investimentos</p>
          </div>
          <div className={styles.headerActions}>
            <button className="btn btn-secondary">Atualizar</button>
            <button className="btn btn-primary">+ Novo Lançamento</button>
          </div>
        </header>

        {/* Portfolio Summary */}
        <section className={styles.summarySection}>
          <div className={`card ${styles.summaryCard}`}>
            <div className={styles.summaryLabel}>Patrimônio Total</div>
            <div className={styles.summaryValue}>{formatCurrency(portfolioSummary.totalValue)}</div>
            <div className={styles.summaryChange}>
              <span className={`stat-change ${portfolioSummary.variation >= 0 ? 'positive' : 'negative'}`}>
                {formatPercentage(portfolioSummary.variation)}
              </span>
              <span className={styles.summaryChangeValue}>
                {formatCurrency(portfolioSummary.variationValue)} esse mês
              </span>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className={`grid grid-4 ${styles.statsGrid}`}>
          <div className="card">
            <div className="card-subtitle">B3 - Bolsa</div>
            <div className="stat-value">{formatCurrency(77000)}</div>
            <span className="stat-change positive">+2.4%</span>
          </div>
          <div className="card">
            <div className="card-subtitle">Criptomoedas</div>
            <div className="stat-value">{formatCurrency(35847.32)}</div>
            <span className="stat-change positive">+4.8%</span>
          </div>
          <div className="card">
            <div className="card-subtitle">Renda Fixa</div>
            <div className="stat-value">{formatCurrency(28000)}</div>
            <span className="stat-change positive">+0.9%</span>
          </div>
          <div className="card">
            <div className="card-subtitle">Outros</div>
            <div className="stat-value">{formatCurrency(12000)}</div>
            <span className="stat-change negative">-0.3%</span>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className={`grid grid-2 ${styles.mainGrid}`}>
          {/* Allocation */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Alocação por Categoria</h3>
            </div>
            <div className={styles.allocationList}>
              {allocationData.map((item) => (
                <div key={item.name} className={styles.allocationItem}>
                  <div className={styles.allocationInfo}>
                    <span
                      className={styles.allocationDot}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={styles.allocationName}>{item.name}</span>
                  </div>
                  <div className={styles.allocationValues}>
                    <span className={styles.allocationValue}>{formatCurrency(item.value)}</span>
                    <span className={styles.allocationPercent}>{item.percentage}%</span>
                  </div>
                  <div className={styles.allocationBar}>
                    <div
                      className={styles.allocationBarFill}
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Assets */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Maiores Posições</h3>
            </div>
            <div className={styles.assetsList}>
              {topAssets.map((asset) => (
                <div key={asset.symbol} className={styles.assetItem}>
                  <div className={styles.assetInfo}>
                    <div className="asset-icon">{asset.symbol.slice(0, 2)}</div>
                    <div>
                      <div className={styles.assetSymbol}>{asset.symbol}</div>
                      <div className={styles.assetName}>{asset.name}</div>
                    </div>
                  </div>
                  <div className={styles.assetValues}>
                    <div className={styles.assetValue}>{formatCurrency(asset.value)}</div>
                    <span className={`stat-change ${asset.variation >= 0 ? 'positive' : 'negative'}`}>
                      {formatPercentage(asset.variation)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className={styles.transactionsSection}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Transações Recentes</h3>
              <button className="btn btn-ghost">Ver todas</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Ativo</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.date}</td>
                    <td>
                      <span className="badge">{tx.asset}</span>
                    </td>
                    <td>
                      <span className={`badge ${tx.type === 'Compra' ? 'badge-success' : tx.type === 'Dividendo' ? 'badge-info' : 'badge-warning'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td>{tx.quantity}</td>
                    <td>{formatCurrency(tx.value)}</td>
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
