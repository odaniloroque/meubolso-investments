'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout'
import styles from '../page.module.css'
import formStyles from './form.module.css'

type AssetType = 'STOCK' | 'FII' | 'ETF' | 'CRYPTO' | 'FIXED_INCOME' | 'OTHER'
type TransactionType = 'BUY' | 'SELL' | 'DIVIDEND' | 'TRANSFER'

interface FormData {
    assetType: AssetType
    symbol: string
    name: string
    transactionType: TransactionType
    quantity: string
    price: string
    date: string
    notes: string
}

const assetTypes: { value: AssetType; label: string }[] = [
    { value: 'STOCK', label: 'Ação' },
    { value: 'FII', label: 'FII' },
    { value: 'ETF', label: 'ETF' },
    { value: 'CRYPTO', label: 'Criptomoeda' },
    { value: 'FIXED_INCOME', label: 'Renda Fixa' },
    { value: 'OTHER', label: 'Outro' },
]

const transactionTypes: { value: TransactionType; label: string }[] = [
    { value: 'BUY', label: 'Compra' },
    { value: 'SELL', label: 'Venda' },
    { value: 'DIVIDEND', label: 'Dividendo / JCP' },
    { value: 'TRANSFER', label: 'Transferência' },
]

export default function ManualPage() {
    const [formData, setFormData] = useState<FormData>({
        assetType: 'STOCK',
        symbol: '',
        name: '',
        transactionType: 'BUY',
        quantity: '',
        price: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
    })

    const [recentEntries] = useState([
        { date: '2024-01-15', asset: 'PETR4', type: 'Compra', quantity: 100, value: 3520 },
        { date: '2024-01-14', asset: 'BTC', type: 'Compra', quantity: 0.05, value: 12500 },
        { date: '2024-01-12', asset: 'HGLG11', type: 'Dividendo', quantity: 15, value: 142.50 },
    ])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // TODO: Save to database
        alert('Lançamento registrado com sucesso!')
    }

    const totalValue = parseFloat(formData.quantity || '0') * parseFloat(formData.price || '0')

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.content}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>📝 Lançamentos Manuais</h1>
                        <p className={styles.subtitle}>Adicione investimentos manualmente ou importe de arquivos</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button className="btn btn-secondary">Importar CSV</button>
                        <button className="btn btn-secondary">Importar Excel</button>
                    </div>
                </header>

                <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
                    {/* Form */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Novo Lançamento</h3>
                        </div>

                        <form onSubmit={handleSubmit} className={formStyles.form}>
                            <div className={formStyles.row}>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Tipo de Ativo</label>
                                    <select
                                        name="assetType"
                                        value={formData.assetType}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        {assetTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Tipo de Operação</label>
                                    <select
                                        name="transactionType"
                                        value={formData.transactionType}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        {transactionTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={formStyles.row}>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Símbolo / Ticker</label>
                                    <input
                                        type="text"
                                        name="symbol"
                                        value={formData.symbol}
                                        onChange={handleChange}
                                        placeholder="Ex: PETR4, BTC, HGLG11"
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Nome (opcional)</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ex: Petrobras PN"
                                        className="input"
                                    />
                                </div>
                            </div>

                            <div className={formStyles.row}>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Quantidade</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="0"
                                        step="any"
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Preço Unitário (R$)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0,00"
                                        step="0.01"
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={formStyles.row}>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Data</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className={formStyles.field}>
                                    <label className={formStyles.label}>Valor Total</label>
                                    <div className={formStyles.calculatedValue}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
                                    </div>
                                </div>
                            </div>

                            <div className={formStyles.field}>
                                <label className={formStyles.label}>Observações (opcional)</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Notas sobre esta transação..."
                                    className="input"
                                    rows={3}
                                />
                            </div>

                            <div className={formStyles.actions}>
                                <button type="button" className="btn btn-secondary">Limpar</button>
                                <button type="submit" className="btn btn-primary">Salvar Lançamento</button>
                            </div>
                        </form>
                    </div>

                    {/* Recent Entries */}
                    <div>
                        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <div className="card-header">
                                <h3 className="card-title">Lançamentos Recentes</h3>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Ativo</th>
                                        <th>Tipo</th>
                                        <th>Qtd</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentEntries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.date}</td>
                                            <td><span className="badge">{entry.asset}</span></td>
                                            <td>
                                                <span className={`badge ${entry.type === 'Compra' ? 'badge-success' : 'badge-info'}`}>
                                                    {entry.type}
                                                </span>
                                            </td>
                                            <td>{entry.quantity}</td>
                                            <td>
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entry.value)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">💡 Dicas</h3>
                            </div>
                            <ul style={{
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-sm)',
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <li>• Use o símbolo oficial do ativo (ex: PETR4, HGLG11, BTC)</li>
                                <li>• Para criptomoedas, você pode ter frações (ex: 0.005 BTC)</li>
                                <li>• Dividendos e JCP podem ser registrados com quantidade 0</li>
                                <li>• Importe arquivos CSV da sua corretora para agilizar</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
