import { Sidebar } from '@/components/layout'
import styles from '../page.module.css'

const integrations = [
    {
        id: 'b3-cei',
        name: 'B3 - CEI',
        description: 'Canal Eletrônico do Investidor',
        icon: '🏛️',
        status: 'connected',
        lastSync: '2024-01-15 10:30',
        itemsSynced: 24
    },
    {
        id: 'nuinvest',
        name: 'NuInvest',
        description: 'Corretora Nubank',
        icon: '💜',
        status: 'available',
        lastSync: null,
        itemsSynced: 0
    },
    {
        id: 'xp',
        name: 'XP Investimentos',
        description: 'Corretora XP',
        icon: '🟡',
        status: 'available',
        lastSync: null,
        itemsSynced: 0
    },
    {
        id: 'binance',
        name: 'Binance',
        description: 'Exchange de Criptomoedas',
        icon: '🟨',
        status: 'connected',
        lastSync: '2024-01-15 09:15',
        itemsSynced: 156
    },
    {
        id: 'metamask',
        name: 'MetaMask',
        description: 'Carteira EVM',
        icon: '🦊',
        status: 'connected',
        lastSync: '2024-01-15 11:00',
        itemsSynced: 42
    },
    {
        id: 'phantom',
        name: 'Phantom',
        description: 'Carteira Solana',
        icon: '👻',
        status: 'available',
        lastSync: null,
        itemsSynced: 0
    },
]

const partnerApps = [
    {
        id: 'kinvo',
        name: 'Kinvo',
        description: 'Consolidador de investimentos',
        icon: '📊',
        status: 'available'
    },
    {
        id: 'gorila',
        name: 'Gorila',
        description: 'Gestão de patrimônio',
        icon: '🦍',
        status: 'available'
    },
    {
        id: 'tradingview',
        name: 'TradingView',
        description: 'Análise técnica',
        icon: '📈',
        status: 'coming_soon'
    },
]

export default function IntegrationsPage() {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.content}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>🔗 Integrações</h1>
                        <p className={styles.subtitle}>Conecte suas contas e sincronize automaticamente</p>
                    </div>
                </header>

                {/* Connected Integrations */}
                <section style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-md)' }}>
                        Corretoras e Exchanges
                    </h2>
                    <div className="grid grid-3">
                        {integrations.map((integration) => (
                            <div key={integration.id} className="card" style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                        <span style={{ fontSize: '2rem' }}>{integration.icon}</span>
                                        <div>
                                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>{integration.name}</h3>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{integration.description}</p>
                                        </div>
                                    </div>
                                    <span className={`badge ${integration.status === 'connected' ? 'badge-success' : ''
                                        }`}>
                                        {integration.status === 'connected' ? 'Conectado' : 'Conectar'}
                                    </span>
                                </div>

                                {integration.status === 'connected' && (
                                    <div style={{
                                        marginTop: 'var(--spacing-md)',
                                        paddingTop: 'var(--spacing-md)',
                                        borderTop: '1px solid var(--border-color)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '0.75rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        <span>Última sync: {integration.lastSync}</span>
                                        <span>{integration.itemsSynced} itens</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Partner Apps */}
                <section style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-md)' }}>
                        Apps Parceiros
                    </h2>
                    <div className="grid grid-3">
                        {partnerApps.map((app) => (
                            <div key={app.id} className="card" style={{
                                cursor: app.status === 'coming_soon' ? 'not-allowed' : 'pointer',
                                opacity: app.status === 'coming_soon' ? 0.6 : 1
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                        <span style={{ fontSize: '2rem' }}>{app.icon}</span>
                                        <div>
                                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>{app.name}</h3>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.description}</p>
                                        </div>
                                    </div>
                                    <span className={`badge ${app.status === 'coming_soon' ? 'badge-warning' : ''
                                        }`}>
                                        {app.status === 'coming_soon' ? 'Em breve' : 'Conectar'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* API Section */}
                <section>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">🔧 API para Desenvolvedores</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                            Crie suas próprias integrações usando nossa API REST. Perfeito para automações e apps customizados.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button className="btn btn-primary">Gerar API Key</button>
                            <button className="btn btn-secondary">Ver Documentação</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
