# 🚀 Trampo — Plataforma Web de Conexão entre Freelancers e Demandantes

O **Trampo** é uma plataforma Web criada para conectar **freelancers** e **demandantes**, permitindo a publicação de anúncios, envio de propostas, negociação, avaliação e comunicação entre as partes.

Este repositório segue o padrão **Monorepo**, contendo o **Frontend**, **Backend** e **Banco de Dados** organizados em módulos independentes.

---

## 📂 Estrutura do Projeto (Monorepo)

```text
Trampo/
├── trampo-backend/      → API .NET 8 (TrampoAuthApi)
├── trampo-database/     → Scripts SQL (DDL + Seeds)
└── trampo-frontend/     → React + Vite + TypeScript + Tailwind

```
---
### 🔹 **Backend (`trampo-backend/`)**

Implementado em **.NET 8 Web API**, com autenticação JWT e Entity Framework Core.

Arquitetura atual:

```text
trampo-backend/
├── bin/
├── obj/
├── DTOs/
├── Models/
├── Properties/
├── Services/
├── appsettings.json
├── appsettings.Development.json
├── Program.cs
├── TrampoAuthApi.csproj
└── TrampoAuthApi.sln
```

Funcionalidades já implementadas:

- Cadastro e login com JWT
- Refresh Token (cookie seguro)
- Estrutura para endpoints REST
- Organização em DTO / Service / Models
- Configuração preparada para PostgreSQL

---

### 🔹 **Frontend (`trampo-frontend/`)**

Aplicação desenvolvida em **React + Vite + TypeScript**, usando:

- **Zustand** para estado global  
- **Axios** com interceptors de refresh token  
- **TailwindCSS**  
- **React Hook Form + Zod**  
- Modal de Login / Cadastro  
- Navbar dinâmica  
- Integração com a API de autenticação  

Estrutura principal:

```text
trampo-frontend/
├── src/
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── .env (não versionado)
```

---

### 🔹 **Database (`trampo-database/`)**

Pasta dedicada ao banco de dados PostgreSQL:

- DDL (estrutura das tabelas)
- Seeds iniciais (categorias, skills, etc.)
- Scripts para migração

Estrutura esperada:

```text
trampo-database/
├── ddl/
│ └── trampo_schema.sql
├── seeds/
│ ├── categories.sql
│ ├── skills.sql
└── README.md
```

(*Será populado conforme o projeto avança.*)

---

# ⚙️ Como Rodar o Projeto

## ▶️ **Frontend**

```bash
cd trampo-frontend
npm install
npm run dev

Acessar:
👉 http://localhost:5173
```

## ▶️ **Backend**

```bash
cd trampo-backend
dotnet restore
dotnet run

A API inicia em algo como:
👉 http://localhost:5156
```

## ▶️ **Banco de Dados**

Após criar o banco:

Abra o Supabase / Railway / Postgres local

Execute o arquivo:

```bash
trampo-database/ddl/trampo_schema.sql
```

Configure a connection string no backend:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=...;Port=5432;Database=trampo;Username=...;Password=..."
}
```


🧩 Requisitos Funcionais Atendidos (Resumo)

Autenticação JWT (login/cadastro)

Refresh token via cookie seguro

Gerenciamento de sessão

Estrutura pronta para anúncios, propostas e chat

Base para integração Front + Back

Arquitetura limpa para expansão futura

--

🚀 Tecnologias
💻 Frontend

React (TS)

Vite

TailwindCSS

Zustand

Axios

Zod

🛠️ Backend

.NET 8 Web API

Entity Framework Core

JWT Authentication

CORS

Clean Architecture

🗄️ Banco

PostgreSQL

Scripts DDL + Seeds

---

📘 Documentação

Toda documentação oficial está no Notion:
🔗 https://www.notion.so/Plataforma-Web-de-Conex-o-entre-Freelancers-e-Demandantes-Trampo-2612e1fcc3cf80e29bf6daaf0a4db12d

--

👤 Autor

Kayque Augusto Cassiano Milhome
Desenvolvedor Full Stack • Criador do Projeto Trampo

📄 Licença

Projeto acadêmico — livre para estudos.

