import React from 'react';

export default function FormDespesa({ formData, handleInputChange, salvarDespesa, setMostrarForm, categorias }) {
  return (
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
  );
}