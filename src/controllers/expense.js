const Expense = require('../model/expense');

class ExpenseController {
   listar = (req, res) => {
        let lista = Expense.findAll();
        if (req.query.categoria) {
            lista = lista.filter(e => e.categoria === req.query.categoria);
        }
        res.json(lista);
    };

    buscarPorId = (req, res) => {
        const despesa = Expense.findById(req.params.id);
        if (!despesa) return res.status(404).json({ error: "Expense not found" });
        res.json(despesa);
    };

    criar = (req, res) => {
        const { titulo, custo, data } = req.body;
        if (!titulo) return res.status(400).json({ error: "O título é obrigatório" });
        if (custo <= 0) return res.status(400).json({ error: "O valor deve ser maior que zero" });
        if (new Date(data) > new Date()) return res.status(400).json({ error: "A data não pode ser futura" });

        const nova = Expense.create(req.body);
        res.status(201).json(nova);
    };

     atualizar = (req, res) => {
        const atualizada = Expense.update(req.params.id, req.body);
        if (!atualizada) return res.status(404).json({ error: "Expense not found" });
        res.json(atualizada);
    };

        remover = (req, res) => {
            if (Expense.delete(req.params.id)) return res.status(204).send();
            res.status(404).json({ error: "Expense not found" });
        };
        

}


module.exports = new ExpenseController();
