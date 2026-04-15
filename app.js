const express = require('express');
const expenseRoutes = require('./src/routes/routes.js');

const app = express();
app.use(express.json());

app.use("/expenses", expenseRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
