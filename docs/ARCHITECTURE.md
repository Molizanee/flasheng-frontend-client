# core - Arquitetura Frontend

## Visao Geral

O core e um gerador de resumos profissionais otimizados com IA, que combina dados do GitHub e do LinkedIn para criar curriculos prontos para processos seletivos modernos.

Este documento descreve a arquitetura do frontend, os fluxos de usuario e a comunicacao com o backend.

---

## Stack Tecnologica

| Tecnologia | Versao | Proposito |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 7.x | Build tool / dev server |
| TypeScript | 5.9 | Tipagem estatica |
| Tailwind CSS | 4.x | Estilos utilitarios |
| React Router | 7.x | Roteamento SPA |
| Supabase JS | latest | Autenticacao (GitHub OAuth) |

---

## Estrutura de Arquivos

```
src/
├── main.tsx                         # Bootstrap: BrowserRouter + App
├── App.tsx                          # Rotas + AuthProvider
├── index.css                        # Tailwind + tema customizado
│
├── lib/
│   ├── supabase.ts                  # Cliente Supabase (apenas auth)
│   └── api.ts                       # HTTP client para o backend
│
├── contexts/
│   └── AuthContext.tsx               # Provider de autenticacao + hook useAuth
│
├── hooks/
│   └── useResumes.ts                # Hooks para resumos e créditos (localStorage)
│
├── pages/
│   ├── Landing.tsx                   # Landing page (publica)
│   ├── Login.tsx                     # Pagina de login com GitHub
│   ├── AuthCallback.tsx              # Processamento do callback OAuth
│   ├── Generate.tsx                  # Wizard: Upload → PIX → Geração
│   └── Dashboard.tsx                 # Dashboard com grid de resumos
│
├── components/
│   ├── Navbar.tsx                    # Navbar da landing (auth-aware)
│   ├── Hero.tsx                      # Hero section (auth-aware CTA)
│   ├── CTASection.tsx                # CTA section (auth-aware)
│   ├── ProblemSection.tsx            # Secao "O Problema"
│   ├── HowItWorks.tsx                # Secao "Como Funciona"
│   ├── Features.tsx                  # Secao "Diferenciais"
│   ├── Footer.tsx                    # Footer
│   ├── ProtectedRoute.tsx            # Route guard (redireciona se nao autenticado)
│   ├── FileUpload.tsx                # Upload de PDF com drag & drop
│   ├── PixPayment.tsx                # QR Code PIX mockado + auto-confirmacao
│   ├── GenerationProgress.tsx        # Polling do job + barra de progresso
│   ├── ui/
│   │   ├── Button.tsx                # Botao reutilizavel (Link ou button)
│   │   ├── Badge.tsx                 # Badge/pill
│   │   └── GlassCard.tsx             # Card com efeito glassmorphism
│   └── dashboard/
│       ├── DashboardNavbar.tsx        # Navbar do dashboard (tabs: Resumos | Créditos)
│       ├── ResumeGrid.tsx             # Grid responsivo de cards
│       └── ResumeCard.tsx             # Card individual com preview + download
```

---

## Rotas

| Rota | Componente | Protegida | Descricao |
|---|---|---|---|
| `/` | `Landing` | Nao | Landing page de marketing |
| `/login` | `Login` | Nao | Pagina de login com GitHub |
| `/auth/callback` | `AuthCallback` | Nao | Callback do OAuth do Supabase |
| `/generate` | `Generate` | Sim | Wizard de geração de resumo |
| `/dashboard` | `Dashboard` | Sim | Dashboard do usuario |

Rotas protegidas usam o componente `ProtectedRoute`, que verifica se o usuario esta autenticado via `useAuth()`. Se nao estiver, redireciona para `/login`.

---

## Fluxo de Autenticacao

### Diagrama

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Usuario  │────>│  /login   │────>│ Supabase │────>│  GitHub  │
│          │     │           │     │  OAuth   │     │  OAuth   │
└─────────┘     └──────────┘     └──────────┘     └──────────┘
                                                        │
                                                        │ Autoriza
                                                        ▼
┌─────────┐     ┌──────────────┐     ┌──────────────────────┐
│Dashboard│<────│/auth/callback │<────│ Supabase retorna:    │
│         │     │               │     │ - JWT (access_token) │
│         │     │ Captura e     │     │ - provider_token     │
│         │     │ salva tokens  │     │   (GitHub token)     │
└─────────┘     └──────────────┘     └──────────────────────┘
```

### Detalhes Tecnicos

1. **Login**: O usuario clica "Entrar com GitHub" na pagina `/login`.
2. **OAuth**: O Supabase redireciona para o GitHub OAuth com os scopes: `read:user`, `user:email`, `repo`.
3. **Callback**: Apos autorizacao, o GitHub redireciona de volta para `/auth/callback`.
4. **Captura de Tokens**: O `AuthContext` escuta `onAuthStateChange` e quando detecta `SIGNED_IN`:
   - Salva o `provider_token` (GitHub access token) no `localStorage` com a chave `core_github_provider_token`.
   - O `session.access_token` (JWT do Supabase) fica disponivel via `useAuth().session`.
5. **Redirecionamento**: O usuario e redirecionado para `/generate`.

### Tokens Importantes

| Token | Onde fica | Para que serve |
|---|---|---|
| `session.access_token` | Memoria (Supabase SDK) | JWT do Supabase, identifica o usuario |
| `provider_token` | `localStorage` (`core_github_provider_token`) | Token de acesso do GitHub, usado para chamar a API do backend |

### Seguranca

- O `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` sao **publicos** (seguros para o frontend).
- O `provider_token` do GitHub e armazenado no `localStorage`. Em uma versao de producao, considere usar `httpOnly cookies` via backend.
- O frontend **nunca** acessa o `SERVICE_ROLE_KEY` ou o `JWT_SECRET` do Supabase.

---

## Comunicacao com o Backend

### URL Base

Configurada via variavel de ambiente `VITE_BACKEND_URL` (padrao: `http://localhost:8000`).

### Cliente HTTP

O arquivo `src/lib/api.ts` exporta um objeto `api` com metodos tipados para cada endpoint.

### Endpoints Utilizados

#### 1. `POST /api/v1/resume/generate`

**Proposito**: Submeter um job de geração de resumo.

**Request**:
```
Content-Type: multipart/form-data

Fields:
- github_token: string    (provider_token do GitHub, obtido do OAuth)
- linkedin_pdf: File      (arquivo PDF do LinkedIn enviado pelo usuario)
```

**Response** (202 Accepted):
```json
{
  "job_id": "uuid",
  "status": "pending",
  "message": "Resume generation job created"
}
```

**Quando e chamado**: Apos o usuario fazer upload do PDF e pagar (ou ter créditos).

#### 2. `GET /api/v1/resume/{job_id}`

**Proposito**: Verificar o status de um job de geração (polling).

**Response** (200):
```json
{
  "id": "uuid",
  "status": "pending | processing | completed | failed",
  "github_username": "user" | null,
  "html_url": "https://..." | null,
  "pdf_url": "https://..." | null,
  "error": "mensagem de erro" | null,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

**Polling**: O frontend faz polling a cada 3 segundos ate o status ser `completed` ou `failed`.

#### 3. `GET /api/v1/resume/{job_id}/download`

**Proposito**: Obter as URLs de download do resumo gerado.

**Response** (200):
```json
{
  "html_url": "https://...",
  "pdf_url": "https://..."
}
```

**Quando e chamado**: Quando o usuario clica nos botoes "Baixar PDF" ou "Baixar HTML" no dashboard.

### Fluxo de Chamadas

```
1. Usuario faz upload do PDF do LinkedIn
2. Usuario paga via PIX (mockado, auto-confirma em ~8s)
3. Frontend chama POST /api/v1/resume/generate
   └── Envia: github_token + linkedin_pdf
   └── Recebe: job_id
4. Frontend faz polling GET /api/v1/resume/{job_id}
   └── A cada 3s ate status = "completed" ou "failed"
5. Quando completo, salva dados no localStorage
6. No dashboard, ao clicar download:
   └── Chama GET /api/v1/resume/{job_id}/download
   └── Abre a URL em nova aba
```

### Nota sobre Autenticacao no Backend

Atualmente, o backend recebe o `github_token` (provider_token do GitHub) diretamente no body da requisicao de geração. **Nao ha autenticacao por JWT do Supabase nos endpoints**.

Para uma versao de producao, recomenda-se:
1. Enviar o JWT do Supabase no header `Authorization: Bearer <token>`.
2. O backend valida o JWT usando o `JWT_SECRET` do Supabase.
3. O backend extrai o `user_id` do JWT para associar o resumo ao usuario correto.
4. O `provider_token` do GitHub pode ser armazenado no backend apos o primeiro login, em vez de ser enviado pelo frontend a cada requisicao.

---

## Sistema de Créditos (Mockado)

O sistema de créditos esta **mockado no frontend** usando `localStorage`. Nao ha endpoints de backend para gerenciar créditos.

### Regras

- 1 credito = 1 geração de resumo
- 1 credito = R$ 10,00
- Créditos sao armazenados em `localStorage` com a chave `core_credits`
- Ao "pagar" via PIX (mockado), 1 credito e adicionado
- Ao iniciar uma geração, 1 credito e consumido
- Se a geração falhar, o credito e devolvido

### Chaves no localStorage

| Chave | Tipo | Descricao |
|---|---|---|
| `core_credits` | `number` (string) | Quantidade de créditos do usuario |
| `core_resumes` | `SavedResume[]` (JSON) | Lista de resumos gerados |
| `core_github_provider_token` | `string` | Token de acesso do GitHub |

### Para migrar para o backend

Quando o backend implementar endpoints de créditos, sera necessario:
1. Criar endpoints: `GET /api/v1/credits`, `POST /api/v1/credits/purchase`
2. Substituir as funcoes `getCredits()`, `addCredit()`, `consumeCredit()` em `Generate.tsx` por chamadas a API
3. Substituir o hook `useCredits()` em `useResumes.ts` por chamadas a API
4. Remover as chaves de `localStorage` relacionadas

---

## Fluxo Completo do Usuario

### 1. Primeiro Acesso

```
Landing Page (/)
    │
    ├── Clica "Gerar Resumo Agora"
    │
    ▼
Login (/login)
    │
    ├── Clica "Entrar com GitHub"
    ├── Redireciona para GitHub OAuth
    ├── Autoriza acesso (repos, email)
    │
    ▼
Auth Callback (/auth/callback)
    │
    ├── Captura session + provider_token
    ├── Salva provider_token no localStorage
    │
    ▼
Generate (/generate)
    │
    ├── Step 1: Upload do PDF do LinkedIn
    ├── Step 2: Pagamento PIX (QR Code mockado)
    │   └── Auto-confirma em ~8 segundos
    ├── Step 3: Geração do resumo
    │   ├── POST /api/v1/resume/generate
    │   └── Polling GET /api/v1/resume/{job_id}
    │
    ▼
Dashboard (/dashboard)
    │
    ├── Visualiza grid de resumos gerados
    ├── Baixa resumos em PDF ou HTML
    ├── Ve créditos restantes
    └── Gera novos resumos
```

### 2. Acessos Subsequentes

```
Landing Page (/) ou Dashboard (/dashboard)
    │
    ├── Ja esta autenticado (sessao Supabase ativa)
    │
    ▼
Dashboard (/dashboard)
    │
    ├── Clica "Gerar Novo Resumo"
    │
    ▼
Generate (/generate)
    │
    ├── Se tem créditos: pula pagamento
    ├── Se nao tem créditos: paga via PIX
    └── Gera resumo normalmente
```

---

## Variaveis de Ambiente

Arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
VITE_BACKEND_URL=http://localhost:8000
```

**Importante**: Todas as variaveis devem ter o prefixo `VITE_` para serem expostas ao cliente pelo Vite.

---

## Como Rodar

```bash
# Instalar dependencias
npm install

# Configurar variaveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Rodar em desenvolvimento
npm run dev

# Build para producao
npm run build

# Preview do build
npm run preview
```

### Pre-requisitos para o Supabase

1. Criar um projeto no [Supabase](https://supabase.com)
2. Em Authentication > Providers > GitHub:
   - Habilitar o provider
   - Configurar `Client ID` e `Client Secret` do GitHub OAuth App
   - Adicionar `http://localhost:5173/auth/callback` como Redirect URL
3. Copiar `Project URL` e `anon public key` de Settings > API para o `.env`

### Pre-requisitos para o Backend

O backend deve estar rodando em `http://localhost:8000` (ou a URL configurada em `VITE_BACKEND_URL`) com os seguintes endpoints:
- `POST /api/v1/resume/generate`
- `GET /api/v1/resume/{job_id}`
- `GET /api/v1/resume/{job_id}/download`

Documentacao da API disponivel em `http://localhost:8000/docs`.
