import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import FiltrosDespesas from "../components/FiltrosDespesas";
import CardResumo from "../components/CardResumo";
import FormDespesa from "../components/FormDespesa";
import TabelaDespesas from "../components/TabelaDespesas";

export default function Dashboard() {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [despesas, setDespesas] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [gastosCategoria, setGastosCategoria] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filtros, setFiltros] = useState({ categoriaId: '', status: '', data: '', valorMax: '' });
    const [categorias, setCategorias] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [formData, setFormData] = useState({ id: null, descricao: '', valor: '', data: '', status: 'PENDENTE', categoriaId: '' });

    useEffect(() => {
        carregarDashboard();
        carregarCategorias();
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
            setDespesas(resDespesas.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function carregarCategorias() {
        try {
            const response = await api.get('/categories');
            setCategorias(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const abrirFormularioNova = () => { setFormData({ id: null, descricao: '', valor: '', data: '', status: 'PENDENTE', categoriaId: '' }); setMostrarForm(true); };
    const abrirFormularioEdicao = (d) => { setFormData({ id: d.id, descricao: d.descricao, valor: d.valor, data: d.data, status: d.status, categoriaId: d.categoriaId }); setMostrarForm(true); };

    const salvarDespesa = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) await api.put(`/expenses/${formData.id}`, formData);
            else await api.post('/expenses', formData);
            setMostrarForm(false);
            carregarDashboard();
        } catch (error) {
            console.error(error);
        }
    };

    const excluirDespesa = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
            try {
                await api.delete(`/expenses/${id}`);
                carregarDashboard();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const despesasFiltradas = despesas.filter(d => {
        const c = filtros.categoriaId ? String(d.categoriaId) === filtros.categoriaId : true;
        const s = filtros.status ? d.status === filtros.status : true;
        const dt = filtros.data ? d.data === filtros.data : true;
        const v = filtros.valorMax ? Number(d.valor) <= Number(filtros.valorMax) : true;
        return c && s && dt && v;
    });

    if (loading) return <h2>Carregando dashboard...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1>Dashboard Financeiro</h1>
                    <p>Olá, {user?.nome}!</p>
                </div>
            </header>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <CardResumo title="Total Gasto" value={`R$ ${Number(total).toFixed(2)}`} color="#e74c3c" />
                <CardResumo title="Qtd. Despesas" value={quantidade} />
                <CardResumo title="Categorias Usadas" value={gastosCategoria.length} />
            </div>

            <FiltrosDespesas filtros={filtros} setFiltros={setFiltros} categorias={categorias} />

            <div style={{ background: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Minhas Despesas</h2>
                    <button onClick={abrirFormularioNova} style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>+ Nova Despesa</button>
                </div>

                {mostrarForm && <FormDespesa formData={formData} handleInputChange={handleInputChange} salvarDespesa={salvarDespesa} setMostrarForm={setMostrarForm} categorias={categorias} />}
                <TabelaDespesas despesas={despesasFiltradas} abrirFormularioEdicao={abrirFormularioEdicao} excluirDespesa={excluirDespesa} />
            </div>
        </div>
    );
}