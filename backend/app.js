require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./src/data/database.js');

const authRoutes = require('./src/routes/auth.js');
const expenseRoutes = require('./src/routes/routes.js');
const dashboardRoutes = require('./src/routes/dashboard.js');
const authMiddleware = require('./src/middlewares/auth.js');
const categoryRoutes = require('./src/routes/category.js');

const cors = require('cors');

// Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Personal Expenses API',
            version: '1.0.0',
            description: 'API para controle de despesas pessoais',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

sequelize.sync()
.then(() => console.log("Banco de dados conectado"))
.catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas Públicas de Autenticação
app.use("/", authRoutes);

app.use(authMiddleware);

// Rotas Privadas 
app.use("/categories", categoryRoutes);
app.use("/expenses", expenseRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;