# 💰 App Financeiro Full Stack

Uma aplicação robusta e moderna para controle de finanças pessoais, desenvolvida para gerenciar transações financeiras com precisão, segurança e uma interface de alto nível.

---

## 🚀 Sobre o Projeto

O **App Financeiro** é uma solução completa (End-to-End) que permite aos usuários anotar e monitorar sua saúde financeira. Com ele, você pode registrar entradas (recebimentos) e saídas (gastos), visualizar o histórico e gerenciar sua conta de forma intuitiva.

### ✨ Funcionalidades Principais

- **🔒 Autenticação de Usuário:** Sistema de Login e Registro com validação de credenciais.
- **📊 Controle de Transações:** Fluxo completo de CRUD (Criar, Ler, Atualizar e Deletar) para seus gastos e ganhos.
- **👤 Gestão de Perfil:** Página dedicada para atualizar nome, e-mail e senha com interface moderna.
- **🛡️ Backend de Alta Performance:** API construída com FastAPI para respostas rápidas e seguras.
- **🎨 UI Moderna:** Interface construída com Tailwind CSS, focada em tons de Slate e Emerald Green para uma experiência visual limpa.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza tecnologias de ponta para garantir escalabilidade e performance:

### **Frontend**

- **React.js**: Biblioteca principal para construção da interface.
- **Tailwind CSS**: Estilização baseada em utilitários para um design responsivo e moderno.
- **React Router Dom**: Gerenciamento de rotas e navegação entre páginas.

### **Backend**

- **FastAPI**: Framework Python moderno e rápido para construção de APIs.
- **SQLAlchemy**: ORM para mapeamento e manipulação do banco de dados de forma eficiente.
- **Uvicorn**: Servidor ASGI de alta performance.

---

## 📦 Como rodar o projeto

### 1. Clonar o repositório

git clone [https://github.com/gutaosb/AppFinanceiro.git](https://github.com/gutaosb/AppFinanceiro.git)
cd AppFinanceiro 2. Configurar o Backend (Python)

# Navegue até a pasta do backend

cd backend

# Crie e ative um ambiente virtual

python -m venv venv

# No Linux/Mac:

source venv/bin/activate

# No Windows:

venv\Scripts\activate

# Instale as dependências

pip install -r requirements.txt

# Inicie o servidor

uvicorn main:app --reload 3. Configurar o Frontend (React)

# Em um novo terminal, na pasta raiz do projeto

cd frontend

# Instale as dependências

npm install

# Inicie a aplicação

npm run dev
🎨 Design System
A aplicação segue uma identidade visual contemporânea:

Cores Principais: Emerald-600 (Verde) para ações positivas e Slate-900 para tipografia.

Componentes: Cards com bordas arredondadas (2xl), sombras suaves e transições de estado (hover/active).
