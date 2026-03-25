const fs = require('fs');

const Expense = {
    // LISTAR (GET /expenses)
    findAll: () => {
        const dados = fs.readFileSync('./src/data/expenses.json');
        return JSON.parse(dados);
    },

    // BUSCAR POR ID (GET /expenses/:id)
    findById: (id) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        return lista.find(e => e.id === Number(id));
    },

    // CRIAR (POST /expenses)
    create: (dados) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        const novoId = lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;

        const novaDespesa = {
            id: novoId,
            title: dados.title,
            amount: dados.amount,
            category: dados.category,
            date: dados.date,
            description: dados.description || ""
        };

        lista.push(novaDespesa);
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(lista, null, 2));
        return novaDespesa;
    },

    // ATUALIZAR (PUT /expenses/:id)
    update: (id, dadosNovos) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        const index = lista.findIndex(e => e.id === Number(id));
        
        if (index === -1) return null;

        // Atualiza os campos mantendo o ID original
        lista[index] = { ...lista[index], ...dadosNovos, id: Number(id) };
        
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(lista, null, 2));
        return lista[index];
    },

    // REMOVER (DELETE /expenses/:id)
    delete: (id) => {
        const lista = JSON.parse(fs.readFileSync('./src/data/expenses.json'));
        const filtrados = lista.filter(e => e.id !== Number(id));

        if (lista.length === filtrados.length) return false;

        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(filtrados, null, 2));
        return true;
    }
};

module.exports = Expense;