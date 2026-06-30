require('dotenv').config();

const express = require('express');
const expenseRoutes = require('./src/routes/routes.js');

const authRoutes = require('./src/routes/auth.js');
const sequelize = require('./src/data/database.js');
const Expense = require('./src/models/expense.js');


sequelize.sync()
.then(() => {
    console.log("Banco de dados conectado");
})
.catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
});
const app = express();

app.use(express.json());

app.use("/", authRoutes); 

// Rotas privadas
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;