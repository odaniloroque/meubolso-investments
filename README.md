# 💰 MeuBolso - Sistema de Controle de Investimentos

Sistema completo para gerenciamento de investimentos consolidando **B3**, **Blockchain** e **integrações externas**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Módulos](#-módulos)
- [Roadmap](#-roadmap)
- [Changelog](#-changelog)

---

## 🎯 Sobre o Projeto

MeuBolso é uma aplicação web para controle e consolidação de investimentos de múltiplas fontes:

| Fonte | Descrição |
|-------|-----------|
| 🏛️ **B3** | Ações, FIIs, ETFs e BDRs da bolsa brasileira |
| ⛓️ **Blockchain** | Bitcoin, Ethereum, Solana e redes EVM |
| 🔗 **Integrações** | APIs de corretoras e apps parceiros |
| 📝 **Manual** | Lançamentos manuais de qualquer ativo |

---

## ✨ Funcionalidades

### Dashboard Unificado
- Patrimônio total consolidado
- Variação mensal e histórico
- Distribuição por categoria de ativo
- Maiores posições do portfólio
- Transações recentes

### Módulo B3
- Visualização de ações, FIIs e ETFs
- Lucro/prejuízo por ativo
- Preço médio e variação
- Sincronização com CEI (preparado)

### Módulo Crypto
- Suporte multi-chain (EVM, Bitcoin, Solana)
- Carteiras conectadas
- Distribuição por rede
- Tokens e balances em tempo real

### Lançamentos Manuais
- Formulário completo para entrada manual
- Suporte a todos os tipos de ativos
- Cálculo automático de valores
- Importação CSV/Excel (em desenvolvimento)

### Integrações
- Conexão com corretoras (NuInvest, XP)
- Exchanges (Binance)
- Wallets (MetaMask, Phantom)
- Apps parceiros (Kinvo, Gorila)
- API para desenvolvedores

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Estilização** | CSS Modules, Design System customizado |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL + Prisma ORM |
| **Blockchain** | JSON-RPC (EVM), Mempool.space (BTC), Solana Web3 |

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL (opcional, para persistência)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/odaniloroque/meubolso-investments.git
cd meubolso-investments

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# 4. Configurar banco de dados (opcional)
npx prisma migrate dev

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

---

## 📁 Estrutura do Projeto

```
meubolso-investments/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── app/                   # Páginas Next.js (App Router)
│   │   ├── page.tsx           # Dashboard principal
│   │   ├── b3/                # Página de investimentos B3
│   │   ├── crypto/            # Página de criptomoedas
│   │   ├── manual/            # Lançamentos manuais
│   │   └── integrations/      # Integrações com parceiros
│   ├── components/
│   │   └── layout/            # Componentes de layout (Sidebar)
│   └── lib/
│       ├── db.ts              # Cliente Prisma
│       └── integrations/      # Clientes de integração
│           ├── b3/            # Cliente B3/CEI
│           └── blockchain/    # Clientes blockchain
│               ├── evm/       # Ethereum, Polygon, BSC, etc.
│               ├── bitcoin/   # Bitcoin (mempool.space)
│               └── solana/    # Solana RPC
└── package.json
```

---

## 📦 Módulos

### Cliente B3 (`src/lib/integrations/b3/`)
```typescript
import { createB3Client } from '@/lib/integrations/b3'

const client = createB3Client({ cpf: '...' })
const positions = await client.getPositions()
const transactions = await client.getTransactions(startDate, endDate)
```

### Cliente EVM (`src/lib/integrations/blockchain/evm/`)
```typescript
import { createEVMClient, EVMClient } from '@/lib/integrations/blockchain/evm'

const client = createEVMClient()
const balance = await client.getNativeBalance(address, 'ETHEREUM')
const tokens = await client.getTokenBalances(address, 'POLYGON')

// Converter wei para ether
const eth = EVMClient.weiToEther(balance)
```

### Cliente Bitcoin (`src/lib/integrations/blockchain/bitcoin/`)
```typescript
import { createBitcoinClient, BitcoinClient } from '@/lib/integrations/blockchain/bitcoin'

const client = createBitcoinClient()
const { confirmed, unconfirmed } = await client.getBalance(address)
const utxos = await client.getUTXOs(address)

// Converter satoshis para BTC
const btc = BitcoinClient.satoshiToBTC(confirmed)
```

### Cliente Solana (`src/lib/integrations/blockchain/solana/`)
```typescript
import { createSolanaClient, SolanaClient } from '@/lib/integrations/blockchain/solana'

const client = createSolanaClient()
const lamports = await client.getBalance(address)
const tokens = await client.getTokenBalances(address)

// Converter lamports para SOL
const sol = SolanaClient.lamportsToSOL(lamports)
```

---

## 🗺️ Roadmap

- [x] Setup inicial (Next.js + TypeScript + Prisma)
- [x] Schema do banco de dados
- [x] Clientes de integração blockchain
- [x] Sistema de design (tema escuro premium)
- [x] Dashboard unificado
- [x] Página B3
- [x] Página Crypto
- [x] Página de lançamentos manuais
- [x] Página de integrações
- [ ] Autenticação (NextAuth.js)
- [ ] Conexão real com APIs (B3, exchanges)
- [ ] Importação CSV/Excel
- [ ] Relatórios de performance
- [ ] Alertas e notificações
- [ ] App mobile (React Native)

---

## 📝 Changelog

### v0.1.0 (2026-01-19)
**Initial Release - MVP**

#### Adicionado
- ✅ Projeto Next.js 15 com TypeScript
- ✅ Schema Prisma completo (User, Asset, Transaction, Wallet, Integration)
- ✅ Cliente B3 para integração com CEI
- ✅ Cliente EVM multi-chain (Ethereum, Polygon, BSC, Arbitrum, etc.)
- ✅ Cliente Bitcoin (via mempool.space API)
- ✅ Cliente Solana (RPC nativo)
- ✅ Sistema de design com tema escuro premium
- ✅ Componente Sidebar com navegação
- ✅ Dashboard principal com visão consolidada
- ✅ Página de investimentos B3
- ✅ Página de criptomoedas multi-chain
- ✅ Página de lançamentos manuais
- ✅ Página de integrações com parceiros

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Odanilo Roque**

- GitHub: [@odaniloroque](https://github.com/odaniloroque)

---

<p align="center">
  Feito com ❤️ para organizar seus investimentos
</p>
