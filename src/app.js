const express = require('express');
const Expense = require('./models/expense');

const app = express();
app.use(express.json());

// 1. Listar
app.get('/expenses', (req, res) => {
    let lista = Expense.findAll();
    if (req.query.category) {
        lista = lista.filter(e => e.category === req.query.category);
    }
    res.json(lista);
});

// 2. Buscar por ID
app.get('/expenses/:id', (req, res) => {
    const despesa = Expense.findById(req.params.id);
    if (!despesa) return res.status(404).json({ error: "Expense not found" });
    res.json(despesa);
});

// 3. Criar (com Regras de Negócio)
app.post('/expenses', (req, res) => {
    const { title, amount, date } = req.body;

    if (!title) return res.status(400).json({ error: "O título é obrigatório" });
    if (amount <= 0) return res.status(400).json({ error: "O valor deve ser maior que zero" });
    if (new Date(date) > new Date()) return res.status(400).json({ error: "A data não pode ser futura" });

    const nova = Expense.create(req.body);
    res.status(201).json(nova);
});

// 4. Atualizar
app.put('/expenses/:id', (req, res) => {
    const atualizada = Expense.update(req.params.id, req.body);
    if (!atualizada) return res.status(404).json({ error: "Expense not found" });
    res.json(atualizada);
});

// 5. Remover
app.delete('/expenses/:id', (req, res) => {
    if (Expense.delete(req.params.id)) return res.status(204).send();
    res.status(404).json({ error: "Expense not found" });
});

// 6. Extra: Total Geral
app.get('/expenses/summary/total', (req, res) => {
    const total = Expense.findAll().reduce((soma, e) => soma + e.amount, 0);
    res.json({ total });
});

// 7. Extra: Total por Categoria
app.get('/expenses/summary/category', (req, res) => {
    const resumo = Expense.findAll().reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {});
    res.json(resumo);
});

app.listen(3000, () => console.log("Servidor em http://localhost:3000"));