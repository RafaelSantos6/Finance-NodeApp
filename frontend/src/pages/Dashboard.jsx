import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {

    const [despesas, setDespesas] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        try {

            const response = await api.get("/expenses");

            console.log("Despesas:", response.data);

            setDespesas(response.data);

            setQuantidade(response.data.length);

            const soma = response.data.reduce(
                (acc, item) => acc + Number(item.valor),
                0
            );

            setTotal(soma);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="dashboard">

            <header className="header">
                <h1>Dashboard Financeiro</h1>
            </header>

            <div className="cards">

                <div className="card">
                    <h3>Total Gasto</h3>
                    <p>R$ {total.toFixed(2)}</p>
                </div>

                <div className="card">
                    <h3>Quantidade</h3>
                    <p>{quantidade}</p>
                </div>

            </div>

            <div className="table-container">

                <h2>Despesas</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>
                        {despesas.length > 0 ? (
                            despesas.map((despesa) => (
                                <tr key={despesa.id}>
                                    <td>{despesa.descricao}</td>
                                    <td>
                                        R$ {Number(despesa.valor).toFixed(2)}
                                    </td>
                                    <td>{despesa.status}</td>
                                    <td>{despesa.data}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">
                                    Nenhuma despesa cadastrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

        </div>
    );
}