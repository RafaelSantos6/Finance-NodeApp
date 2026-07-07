import React from 'react';

export default function FiltrosDespesas({ filtros, setFiltros, categorias }) {
  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limparFiltros = () => {
    setFiltros({ categoriaId: '', status: '', data: '', valorMax: '' });
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '15px', 
      flexWrap: 'wrap', 
      marginBottom: '20px', 
      background: '#f8f9fa', 
      padding: '15px', 
      borderRadius: '8px',
      border: '1px solid #ddd' 
    }}>
      <div style={{ flex: '1 1 150px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Categoria</label>
        <select name="categoriaId" value={filtros.categoriaId} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
          <option value="">Todas</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: '1 1 120px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Status</label>
        <select name="status" value={filtros.status} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
          <option value="">Todos</option>
          <option value="PENDENTE">Pendente</option>
          <option value="PAGA">Paga</option>
        </select>
      </div>

      <div style={{ flex: '1 1 150px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Data</label>
        <input type="date" name="data" value={filtros.data} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ flex: '1 1 150px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Valor Máximo (R$)</label>
        <input type="number" step="0.01" name="valorMax" value={filtros.valorMax} onChange={handleChange} placeholder="Ex: 500" style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button type="button" onClick={limparFiltros} style={{ background: '#95a5a6', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}