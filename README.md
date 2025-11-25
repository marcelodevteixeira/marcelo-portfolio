# Marcelo Teixeira | Portfólio Profissional (Dados & IA)

Este é o repositório oficial do portfólio profissional de Marcelo Teixeira. Uma aplicação web moderna, desenvolvida para demonstrar expertise em Engenharia de Dados, Inteligência Artificial e Desenvolvimento Full Stack.

O projeto combina um design sofisticado (Dark Mode + Glassmorphism) com funcionalidades avançadas de IA generativa e integração com banco de dados em tempo real.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-blue)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind_|_Supabase_|_Gemini-8B5CF6)

## 🚀 Funcionalidades Principais

*   **Assistente Virtual com IA (Gemini 2.5):** Chatbot integrado capaz de responder perguntas sobre meu currículo e **analisar imagens**. Se você enviar um cartão de visita ou print do LinkedIn, a IA extrai os dados e gera um "Contact Card" interativo.
*   **Gestão de Conteúdo (Supabase):** Projetos e mensagens de contato são gerenciados dinamicamente via banco de dados PostgreSQL.
*   **Design Responsivo & Animações:** Interface fluida com animações de entrada (`reveal-on-scroll`), efeitos de spotlight e vidro (glassmorphism).
*   **Modo Fallback:** O sistema foi projetado para não quebrar. Se o banco de dados falhar, ele carrega dados de demonstração automaticamente.

## 🛠️ Stack Tecnológica

*   **Frontend:** React 19, TypeScript, Vite
*   **Estilização:** Tailwind CSS (Custom Config & Animations)
*   **Ícones:** Lucide React
*   **Backend as a Service:** Supabase (Database & API)
*   **Inteligência Artificial:** Google Gemini API (`@google/genai`)

## 📦 Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/portfolio-marcelo.git
cd portfolio-marcelo
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione suas chaves (você precisará de contas no Supabase e Google AI Studio):

```env
# Google Gemini AI (Geração de texto e visão computacional)
VITE_API_KEY=sua_chave_api_google_aqui

# Supabase (Banco de dados)
VITE_SUPABASE_URL=sua_url_supabase_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_supabase_aqui
```

### 4. Rodar o projeto
```bash
npm run dev
```
O app estará disponível em `http://localhost:5173`.

## 🗄️ Estrutura do Banco de Dados (Supabase)

Para que o formulário de contato e a lista de projetos funcionem, crie as seguintes tabelas no seu projeto Supabase:

### Tabela: `messages`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Primary Key (Default: `uuid_generate_v4()`) |
| name | text | Nome do remetente |
| email | text | Email de contato |
| message| text | Conteúdo da mensagem |
| created_at | timestamp | Default: `now()` |

### Tabela: `projects`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | int8 | Primary Key |
| title | text | Título do projeto |
| description | text | Descrição curta |
| technologies | text[] | Array de strings (ex: `{'Python', 'AWS'}`) |
| image_url | text | URL da imagem de capa |
| demo_url | text | Link para demo (opcional) |
| github_url | text | Link para código (opcional) |

## 📄 Licença

Este projeto é de uso pessoal para portfólio.
© 2024 Marcelo Teixeira.
