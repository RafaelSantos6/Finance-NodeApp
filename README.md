# Personal Expenses API
Readme formatado no gemini
## Como Executar
## Instalação

Instalar dependências:

```bash
npm install
```

Executar migrations:

```bash
npx sequelize-cli db:migrate
```

Executar seeders:

```bash
npx sequelize-cli db:seed:all
```

Iniciar a aplicação:

```bash
npm run dev
```

ou

```bash
node server.js
```

Documentação Swagger:

```text
http://localhost:3000/api-docs
```

---

## Autenticação

```http
POST /users
POST /auth/login
```

---

## Categorias

```http
GET    /categories
GET    /categories/:id
POST   /categories
PUT    /categories/:id
DELETE /categories/:id
```

---

## Despesas

```http
GET    /expenses
GET    /expenses/:id
POST   /expenses
PUT    /expenses/:id
DELETE /expenses/:id
```

### Filtros

```http
GET /expenses?status=PAGA
GET /expenses?categoria=1
GET /expenses?valorMin=100&valorMax=1000
GET /expenses?dataInicio=2026-01-01&dataFim=2026-12-31
```

---

## Dashboard

```http
GET /dashboard/total-expenses
GET /dashboard/expenses-count
GET /dashboard/expenses-by-category
```

---

## Variáveis de Ambiente

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=finance_db
DB_USER=root
DB_PASSWORD=sua_senha


JWT_SECRET=seu_token
JWT_EXPIRES_IN=1d
```
