import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Categorias() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarForm, setMostrarForm] = useState(false);
    
    const [formData, setFormData] = useState({
        id: null,
        nome: ""
    });

    useEffect(() => {
        carregarCategorias();
    }, []);

    async function carregarCategorias() {
        try {
            setLoading(true);
            const response = await api.get("/categories");
            setCategorias(response.data);
        } catch (err) {
            console.error("Erro ao buscar categorias:", err);
            alert("Erro ao carregar a listagem de categorias.");
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const abrirFormNovo = () => {
        setFormData({ id: null, nome: "" });
        setMostrarForm(true);
    };

    const abrirFormEdicao = (categoria) => {
        setFormData({
            id: categoria.id,
            nome: categoria.nome,
            descricao: categoria.descricao
            
        });
        setMostrarForm(true);
    };

    const salvarCategoria = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await api.put(`/categories/${formData.id}`, { nome: formData.nome });
            } else {
                await api.post("/categories", { nome: formData.nome });
            }
            setMostrarForm(false);
            carregarCategorias();
        } catch (err) {
            console.error("Erro ao salvar categoria:", err);
            alert("Erro ao salvar categoria. Verifique os dados inseridos.");
        }
    };

    const excluirCategoria = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta categoria? Atenção: Isso pode afetar despesas vinculadas a ela.")) {
            try {
                await api.delete(`/categories/${id}`);
                carregarCategorias();
            } catch (err) {
                console.error("Erro ao excluir categoria:", err);
                alert("Não foi possível excluir a categoria.");
            }
        }
    };

    if (loading) return <h2 style={{ padding: "20px" }}>Carregando categorias...</h2>;

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div>
                    <button onClick={() => navigate("/dashboard")} style={{ background: "#7f8c8d", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}>
                        ← Voltar ao Dashboard
                    </button>
                    <h1 style={{ display: "inline-block", verticalAlign: "middle", margin: 0 }}>Gerenciar Categorias</h1>
                </div>
                
                <button onClick={abrirFormNovo} style={{ background: "#2ecc71", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                    + Nova Categoria
                </button>
            </div>

            {/* Formulário Dinâmico */}
            {mostrarForm && (
                <form onSubmit={salvarCategoria} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "20px" }}>
                    <h3>{formData.id ? "Editar Categoria" : "Nova Categoria"}</h3>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>Nome da Categoria</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.nome} 
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })} 
                            required 
                            placeholder="Ex: Alimentação, Transporte..." 
                            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={{ background: "#007bff", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            {formData.id ? "Salvar Alterações" : "Cadastrar"}
                        </button>
                        <button type="button" onClick={() => setMostrarForm(false)} style={{ background: "#95a5a6", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {/* Tabela de Listagem */}
            <div style={{ background: "#fff", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ background: "#f5f5f5" }}>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>ID</th>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Nome da Categoria</th>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd", textAlign: "center" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.length > 0 ? (
                            categorias.map((cat) => (
                                <tr key={cat.id} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "12px" }}>{cat.id}</td>
                                    <td style={{ padding: "12px", fontWeight: "500" }}>{cat.nome}</td>
                                    <td style={{ padding: "12px", textAlign: "center" }}>
                                        <button onClick={() => abrirFormEdicao(cat)} style={{ background: "#f39c12", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer", marginRight: "5px" }}>
                                            Editar
                                        </button>
                                        <button onClick={() => excluirCategoria(cat.id)} style={{ background: "#c0392b", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ padding: "15px", textAlign: "center" }}>Nenhuma categoria cadastrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}