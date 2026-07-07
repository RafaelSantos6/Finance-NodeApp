import React from 'react';

export default function TabelaDespesas({ despesas, abrirFormularioEdicao, excluirDespesa }) {
  return (
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
          <tr><td colSpan="5" style={{ padding: '15px', textAlign: 'center' }}>Nenhuma despesa encontrada.</td></tr>
        )}
      </tbody>
    </table>
  );
}