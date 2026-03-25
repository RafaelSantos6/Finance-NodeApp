const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'expenses.json');

const readData = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const Expense = {
    findAll: () => readData(),
    
    findById: (id) => {
        const expenses = readData();
        // Convertemos o id para número para garantir a comparação correta
        return expenses.find(e => e.id === Number(id));
    },

    create: (data) => {
        const expenses = readData();
        
        // Lógica para ID sequencial: pega o ID do último item e soma 1
        const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : 0;
        const newId = lastId + 1;

        const newExpense = {
            id: newId,
            title: data.title,
            amount: data.amount,
            category: data.category,
            date: data.date,
            description: data.description || ""
        };

        expenses.push(newExpense);
        writeData(expenses);
        return newExpense;
    },

    update: (id, data) => {
        const expenses = readData();
        const index = expenses.findIndex(e => e.id === Number(id));
        if (index === -1) return null;

        // Atualiza mantendo o ID original
        expenses[index] = { ...expenses[index], ...data, id: Number(id) };
        writeData(expenses);
        return expenses[index];
    },

    delete: (id) => {
        const expenses = readData();
        const filtered = expenses.filter(e => e.id !== Number(id));
        if (expenses.length === filtered.length) return false;
        writeData(filtered);
        return true;
    }
};

module.exports = Expense;