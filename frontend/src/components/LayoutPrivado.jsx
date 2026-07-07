import React from 'react';
import Sidebar from './Sidebar';

export default function LayoutPrivado({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ 
        flex: 1, 
        marginLeft: '260px',
        background: '#f8f9fa', 
        minHeight: '100vh',
        boxSizing: 'border-box' 
      }}>
        {children}
      </div>
    </div>
  );
}