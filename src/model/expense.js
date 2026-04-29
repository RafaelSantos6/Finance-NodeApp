const fs = require('fs');

const ExpenseModel = {
    findAll: () => {
        const dados = fs.readFileSync('./src/data/expenses.json');
        return JSON.parse(dados);
    },

    findById: (id) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        return lista.find(e => e.id === Number(id));
    },

    create: (dados) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        const novoId = lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;

        const novaDespesa = {
            id:Number(novoId),
            title: dados.title,
            custo: dados.custo,
            category: dados.category,
            date: dados.date,
            description: dados.description || ""
        };

        lista.push(novaDespesa);
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(lista, null, 2));
        return novaDespesa;
    },

    update: (id, dadosNovos) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        const index = lista.findIndex(e => e.id === Number(id));
        
        if (index === -1) return null;

        lista[index] = { ...lista[index], ...dadosNovos, id: Number(id) };
        
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(lista, null, 2));
        return lista[index];
    },

    delete: (id) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        const filtrados = lista.filter(e => e.id !== Number(id));

        if (lista.length === filtrados.length) return false;

        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(filtrados, null, 2));
        return true;
    }
};

module.exports = ExpenseModel;