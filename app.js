require('dotenv').config();
const express = require('express');
const sequelize = require('./src/data/database.js');

const authRoutes = require('./src/routes/auth.js');
const expenseRoutes = require('./src/routes/routes.js');
const dashboardRoutes = require('./src/routes/dashboard.js');
const authMiddleware = require('./src/middlewares/auth.js');
const categoryRoutes = require('./src/routes/category.js');


sequelize.sync()
.then(() => console.log("Banco de dados conectado"))
.catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

const app = express();
app.use(express.json());

// Rotas Públicas
app.use("/", authRoutes);

app.use(authMiddleware);
app.use("/categories", categoryRoutes);

// Rotas Privadas 
app.use("/expenses", expenseRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;