import React from 'react';

export default function CardResumo({ title, value, color = '#333' }) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, background: '#fff' }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: color }}>{value}</p>
    </div>
  );
}