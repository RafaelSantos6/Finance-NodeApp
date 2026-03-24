# Personal Expenses API

API para gerenciamento de despesas pessoais desenvolvida em Node.js com Express.

## Como Executar
1. Instalar dependências: `npm install`
2. Iniciar servidor: `node src/app.js`
3. Aceder em: `http://localhost:3030`

## Rotas Principal
| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /expenses | Lista todas as despesas |
| POST | /expenses | Cria uma nova despesa |
| GET | /expenses/:id | Busca despesa por ID |
| PUT | /expenses/:id | Atualiza uma despesa |
| DELETE | /expenses/:id | Remove uma despesa |