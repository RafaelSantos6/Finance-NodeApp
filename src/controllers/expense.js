const Expense = require('../models/expense');

class ExpenseController {
  listar = async (req,res) => {
    try {
        const despesas = await Expense.findAll();
        res.json(despesas);
    } catch (error) {
        res.status(500).json({ error: "Error to find expenses" });
    }
};

    buscarPorId = async (req, res) => {
        try {
        const despesa = await Expense.findByPk(req.params.id);
        if (!despesa) return res.status(404).json({ error: "Expense not found" });
        res.json(despesa);
    } catch (error) {
        res.status(500).json({ error: "Error to find expense" });
    }
};

    criar = async (req, res) => {
    try {
        const { titulo, custo, data } = req.body;

        const nova = await Expense.create(req.body); 
        res.status(201).json(nova);
    } catch (error) {
        res.status(500).json({ error: "Error to create expense" });
    }
};

     atualizar = async (req, res) => {
        try {
        const atualizada = await Expense.update(req.body, { where: { id: req.params.id } });
        if (!atualizada[0]) return res.status(404).json({ error: "Expense not found" });
        res.json({ message: "Expense updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error to update expense" });
    }
};

        remover = async (req, res) => {
            try {
                const deletada = await Expense.destroy({ where: { id: req.params.id } });
                if (!deletada) return res.status(404).json({ error: "Expense not found" });
                res.status(204).send();
            } catch (error) {
                res.status(500).json({ error: "Error to delete expense" });
            }
        };
        

}


module.exports = new ExpenseController();
