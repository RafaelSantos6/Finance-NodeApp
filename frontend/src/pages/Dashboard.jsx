import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

export default function Dashboard() {
    const { logout, user } = useContext(AuthContext);
    
    const [total, setTotal] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [gastosCategoria, setGastosCategoria] = useState([]);
    const [ultimasDespesas, setUltimasDespesas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarDashboard();
    }, []);

    async function carregarDashboard() {
        try {
            setLoading(true);
            const [resTotal, resCount, resCategoria, resDespesas] = await Promise.all([
                api.get('/dashboard/total-expenses'),
                api.get('/dashboard/expenses-count'),
                api.get('/dashboard/expenses-by-category'),
                api.get('/expenses') 
            ]);

            setTotal(resTotal.data.total);
            setQuantidade(resCount.data.quantidade);
            setGastosCategoria(resCategoria.data);
            setUltimasDespesas(resDespesas.data.slice(0, 5)); 
        } catch (err) {
            console.error("Erro ao carregar dashboard:", err);
            alert("Erro ao carregar os dados.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <h2>Carregando dashboard...</h2>;

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            <header className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h1>Dashboard Financeiro</h1>
                    <p>Olá, {user?.nome}!</p>
                </div>
                <button onClick={logout} style={{ height: '40px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '0 15px', cursor: 'pointer' }}>Sair (Logout)</button>
            </header>

            <div className="cards" style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
                <div className="card" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
                    <h3>Total Gasto</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>R$ {Number(total).toFixed(2)}</p>
                </div>
                <div className="card" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
                    <h3>Qtd. Despesas</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{quantidade}</p>
                </div>
                <div className="card" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
                    <h3>Categorias c/ Gastos</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{gastosCategoria.length}</p>
                </div>
            </div>

            <div className="table-container">
                <h2>Últimas Despesas Cadastradas</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Descrição</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Valor</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Status</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ultimasDespesas.length > 0 ? (
                            ultimasDespesas.map((despesa) => (
                                <tr key={despesa.id}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{despesa.descricao}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>R$ {Number(despesa.valor).toFixed(2)}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{despesa.status}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{despesa.data}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" style={{ padding: '10px', textAlign: 'center' }}>Nenhuma despesa.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}