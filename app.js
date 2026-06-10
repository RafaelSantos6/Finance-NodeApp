require('dotenv').config();

const express = require('express');
const expenseRoutes = require('./src/routes/routes.js');
<<<<<<< HEAD
const authRoutes = require('./src/routes/auth.js');
=======
const sequelize = require('./src/data/database.js');
const Expense = require('./src/model/expense.js');


sequelize.sync()
.then(() => {
    console.log("Banco de dados conectado");
})
.catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
});
>>>>>>> 7a927f12f1c095a1765dcfaaa44f41955c789d2f

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