'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'B3 - Bolsa', href: '/b3', icon: '🏛️' },
    { name: 'Crypto', href: '/crypto', icon: '₿' },
    { name: 'Lançamentos', href: '/manual', icon: '📝' },
    { name: 'Integrações', href: '/integrations', icon: '🔗' },
    { name: 'Carteiras', href: '/wallets', icon: '👛' },
    { name: 'Relatórios', href: '/reports', icon: '📈' },
    { name: 'Configurações', href: '/settings', icon: '⚙️' },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span className={styles.logoIcon}>💰</span>
                <span>MeuBolso</span>
            </div>

            <nav className={styles.nav}>
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`${styles.link} ${pathname === item.href ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.footer}>
                <div className={styles.user}>
                    <div className={styles.avatar}>U</div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Usuário</span>
                        <span className={styles.userEmail}>usuario@email.com</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
