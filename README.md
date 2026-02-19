# 🌳 Tamarind

<div align="center">

**Uma aplicação moderna de gerenciamento de tarefas construída com arquitetura de monorepo**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)

</div>

## 📋 Sobre o Projeto

**Tamarind** é uma aplicação completa de produtividade que permite gerenciar tarefas, notas, listas e rotinas diárias. Construída com uma arquitetura moderna de monorepo, oferece uma experiência de usuário fluida e intuitiva com sincronização em tempo real.

### ✨ Principais Funcionalidades

- ✅ **Gerenciamento de Tarefas** - Crie, edite e organize suas tarefas com facilidade
- 📝 **Notas Ricas** - Editor de texto formatado para suas anotações
- 📋 **Listas Personalizadas** - Organize tarefas em listas customizadas
- 🔄 **Rotinas Diárias** - Acompanhe e gerencie suas rotinas com reset automático
- 📊 **Visualização Kanban** - Visualize suas tarefas em formato de quadro Kanban
- 🎨 **Interface Moderna** - Design responsivo com suporte a tema claro/escuro
- 🔐 **Autenticação Segura** - Integração com Clerk para autenticação robusta
- ⏱️ **Pomodoro Timer** - Técnica Pomodoro integrada para melhor produtividade

## 🏗️ Arquitetura

Este projeto utiliza uma arquitetura de **monorepo** gerenciada pelo Turborepo, permitindo compartilhamento de código e configurações entre os diferentes pacotes e aplicações.

```
Tamarind/
├── apps/
│   ├── tamarind-api/      # API REST backend
│   └── tamarind-web/      # Aplicação Next.js frontend
├── packages/
│   ├── eslint-config/      # Configurações compartilhadas do ESLint
│   ├── typescript-config/  # Configurações TypeScript compartilhadas
│   └── ui/                 # Componentes UI compartilhados
└── turbo.json              # Configuração do Turborepo
```

## 🛠️ Stack Tecnológica

### Frontend (`tamarind-web`)
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Clerk** - Autenticação e gerenciamento de usuários
- **Draft.js** - Editor de texto rico
- **Axios** - Cliente HTTP

### Backend (`tamarind-api`)
- **Express.js** - Framework web Node.js
- **MongoDB** - Banco de dados NoSQL
- **Clerk Express** - Middleware de autenticação
- **Node Cron** - Agendamento de tarefas (reset de rotinas)
- **CORS** - Configuração de políticas de origem cruzada

### DevOps & Ferramentas
- **Turborepo** - Build system e cache para monorepo
- **pnpm** - Gerenciador de pacotes
- **ESLint** - Linter de código
- **Prettier** - Formatador de código
- **TypeScript** - Verificação de tipos

## 🚀 Começando

### Pré-requisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 9.0.0
- **MongoDB** (local ou cluster remoto)
- Conta no **Clerk** para autenticação

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/PHCavalcante/Tamarind.git
   cd Tamarind
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto e em cada app conforme necessário:
   
   **Backend (`apps/tamarind-api/.env`):**
   ```env
   STRING_CONNECTION=mongodb://localhost:27017/todoDB
   CORS_ORIGIN=http://localhost:3001
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

   **Frontend (`apps/tamarind-web/.env.local`):**
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Execute o projeto em modo desenvolvimento**
   ```bash
   pnpm dev
   ```

   Isso iniciará:
   - Frontend em `http://localhost:3001`
   - Backend em `http://localhost:3000` (API)

## 📜 Scripts Disponíveis

No diretório raiz, você pode executar:

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia todos os apps em modo desenvolvimento |
| `pnpm build` | Constrói todos os apps e pacotes |
| `pnpm lint` | Executa o linter em todos os pacotes |
| `pnpm format` | Formata o código com Prettier |
| `pnpm check-types` | Verifica tipos TypeScript em todo o projeto |

## 📦 Estrutura do Monorepo

### Apps

- **`tamarind-web`** - Aplicação frontend Next.js
  - Interface de usuário completa
  - Gerenciamento de estado com Context API
  - Componentes reutilizáveis

- **`tamarind-api`** - API REST Express.js
  - Endpoints para tarefas, notas, listas e rotinas
  - Scheduler para reset automático de rotinas
  - Integração com MongoDB


## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">

**Feito com ❤️ por PHCavalcante**

[⬆ Voltar ao topo](#-tamarind)

</div>
