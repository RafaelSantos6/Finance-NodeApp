const express = require('express');
const expenseRoutes = require('./src/routes/routes.js');
const sequelize = require('./src/data/database.js');

sequelize.sync()
.then(() => {
    console.log("Banco de dados conectado");
})
.catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
});

const app = express();

app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

module.exports = app;