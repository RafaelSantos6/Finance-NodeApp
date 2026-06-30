# Personal Expenses API
Readme formatado no gemini
## Como Executar
1. Instalar dependências: `npm install`
2. Iniciar servidor: `npm start`
3. Aceder em: `http://localhost:3000`

## Rotas Principal
| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /expenses | Lista todas as despesas |
| POST | /expenses | Cria uma nova despesa |
| GET | /expenses/:id | Busca despesa por ID |
| PUT | /expenses/:id | Atualiza uma despesa |
| DELETE | /expenses/:id | Remove uma despesa |

## comandos do banco
1. npx sequelize-cli db:create
2. npx sequelize-cli db:migrate
3. npx sequelize-cli db:seed:all