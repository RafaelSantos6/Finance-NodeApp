import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

export default function Dashboard() {
    const { logout, user } = useContext(AuthContext);
    
    // Estados do Dashboard
    const [despesas, setDespesas] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [gastosCategoria, setGastosCategoria] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para o CRUD de Despesas
    const [categorias, setCategorias] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        descricao: '',
        valor: '',
        data: '',
        status: 'PENDENTE',
        categoriaId: ''
    });

    useEffect(() => {
        carregarDashboard();
        carregarCategorias(); // Precisamos das categorias para o Select do formulário
    }, []);

    async function carregarDashboard() {
        try {
            setLoading(true);
            const [resTotal, resCount, resCategoria, resDespesas] = await Promise.all([
                api.get('/dashboard/total-expenses'),
                api.get('/dashboard/expenses-count'),
                api.get('/dashboard/expenses-by-category'),
                api.get('/expenses') // Lista todas as despesas para a tabela
            ]);

            setTotal(resTotal.data.total);
            setQuantidade(resCount.data.quantidade);
            setGastosCategoria(resCategoria.data);
            setDespesas(resDespesas.data);
        } catch (err) {
            console.error("Erro ao carregar dashboard:", err);
            alert("Erro ao carregar os dados.");
        } finally {
            setLoading(false);
        }
    }

    async function carregarCategorias() {
        try {
            const response = await api.get('/categories');
            setCategorias(response.data);
        } catch (err) {
            console.error("Erro ao carregar categorias", err);
        }
    }

    // --- FUNÇÕES DO CRUD ---

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const abrirFormularioNova = () => {
        setFormData({ id: null, descricao: '', valor: '', data: '', status: 'PENDENTE', categoriaId: '' });
        setMostrarForm(true);
    };

    const abrirFormularioEdicao = (despesa) => {
        setFormData({
            id: despesa.id,
            descricao: despesa.descricao,
            valor: despesa.valor,
            data: despesa.data,
            status: despesa.status,
            categoriaId: despesa.categoriaId
        });
        setMostrarForm(true);
    };

    const salvarDespesa = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                // Editar despesa existente
                await api.put(`/expenses/${formData.id}`, formData);
                alert("Despesa atualizada!");
            } else {
                // Criar nova despesa
                await api.post('/expenses', formData);
                alert("Despesa criada com sucesso!");
            }
            setMostrarForm(false);
            carregarDashboard(); // Atualiza a tabela e os cards de estatísticas
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar despesa.");
        }
    };

    const excluirDespesa = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
            try {
                await api.delete(`/expenses/${id}`);
                carregarDashboard(); // Atualiza a tela
            } catch (error) {
                console.error(error);
                alert("Erro ao excluir.");
            }
        }
    };

    if (loading) return <h2>Carregando dashboard...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1>Dashboard Financeiro</h1>
                    <p>Olá, {user?.nome}!</p>
                </div>
                <button onClick={logout} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    Sair
                </button>
            </header>

            {/* Cards de Resumo */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, background: '#fff' }}>
                    <h3>Total Gasto</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>R$ {Number(total).toFixed(2)}</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, background: '#fff' }}>
                    <h3>Qtd. Despesas</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{quantidade}</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, background: '#fff' }}>
                    <h3>Categorias Usadas</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{gastosCategoria.length}</p>
                </div>
            </div>

            {/* Controle de Despesas */}
            <div style={{ background: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Minhas Despesas</h2>
                    <button onClick={abrirFormularioNova} style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Nova Despesa
                    </button>
                </div>

                {/* Formulário Criar/Editar (Só aparece se mostrarForm for true) */}
                {mostrarForm && (
                    <form onSubmit={salvarDespesa} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
                        <input type="text" name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleInputChange} required style={{ flex: '1 1 200px', padding: '8px' }} />
                        <input type="number" step="0.01" name="valor" placeholder="Valor (R$)" value={formData.valor} onChange={handleInputChange} required style={{ flex: '1 1 120px', padding: '8px' }} />
                        <input type="date" name="data" value={formData.data} onChange={handleInputChange} required style={{ flex: '1 1 150px', padding: '8px' }} />
                        
                        <select name="status" value={formData.status} onChange={handleInputChange} style={{ flex: '1 1 120px', padding: '8px' }}>
                            <option value="PENDENTE">Pendente</option>
                            <option value="PAGA">Paga</option>
                        </select>
                        
                        <select name="categoriaId" value={formData.categoriaId} onChange={handleInputChange} required style={{ flex: '1 1 150px', padding: '8px' }}>
                            <option value="">Selecione a Categoria</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Salvar</button>
                            <button type="button" onClick={() => setMostrarForm(false)} style={{ background: '#95a5a6', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
                        </div>
                    </form>
                )}

                {/* Tabela de Despesas */}
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Descrição</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Valor</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Data</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {despesas.length > 0 ? (
                            despesas.map((despesa) => (
                                <tr key={despesa.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{despesa.descricao}</td>
                                    <td style={{ padding: '12px', color: '#e74c3c', fontWeight: 'bold' }}>R$ {Number(despesa.valor).toFixed(2)}</td>
                                    <td style={{ padding: '12px' }}>{despesa.status}</td>
                                    <td style={{ padding: '12px' }}>{new Date(despesa.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button onClick={() => abrirFormularioEdicao(despesa)} style={{ background: '#f39c12', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>Editar</button>
                                        <button onClick={() => excluirDespesa(despesa.id)} style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Excluir</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" style={{ padding: '15px', textAlign: 'center' }}>Nenhuma despesa cadastrada.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}