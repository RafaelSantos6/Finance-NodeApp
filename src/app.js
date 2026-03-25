const express = require('express');
const Expense = require('./models/expense');

const app = express();
app.use(express.json());

// 1. Listar todas as despesas (com filtros opcionais)
app.get('/expenses', (req, res) => {
    let list = Expense.findAll();
    const { category, date } = req.query;

    if (category) list = list.filter(e => e.category === category);
    if (date) list = list.filter(e => e.date === date);

    res.json(list);
});

// 2. Buscar despesa por ID (importante: tratar como número)
app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id); // Converte a string da URL para número
    const expense = Expense.findById(id);
    
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
});

// 3. Criar nova despesa (com validações)
app.post('/expenses', (req, res) => {
    const { title, amount, date } = req.body;

    // Regras de Negócio
    if (!title) return res.status(400).json({ error: "O campo title é obrigatório" });
    if (amount <= 0) return res.status(400).json({ error: "O campo amount deve ser maior que zero" });
    
    // Validação de data (não pode ser no futuro)
    if (new Date(date) > new Date()) {
        return res.status(400).json({ error: "O campo date não pode ser no futuro" });
    }

    const newExpense = Expense.create(req.body);
    res.status(201).json(newExpense);
});

// 4. Atualizar despesa
app.put('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const updated = Expense.update(id, req.body);
    
    if (!updated) return res.status(404).json({ error: "Expense not found" });
    res.json(updated);
});

// 5. Remover despesa
app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const success = Expense.delete(id);
    
    if (!success) return res.status(404).json({ error: "Expense not found" });
    res.status(204).send(); // Sucesso sem conteúdo
});

// 6. Resumo Total
app.get('/expenses/summary/total', (req, res) => {
    const total = Expense.findAll().reduce((sum, e) => sum + e.amount, 0);
    res.json({ total: Number(total.toFixed(2)) });
});

// 7. Resumo por Categoria
app.get('/expenses/summary/category', (req, res) => {
    const summary = Expense.findAll().reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {});
    res.json(summary);
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});