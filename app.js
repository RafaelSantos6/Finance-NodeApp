require('dotenv').config();

const express = require('express');
const expenseRoutes = require('./src/routes/routes.js');
const authRoutes = require('./src/routes/auth.js');

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