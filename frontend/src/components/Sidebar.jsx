import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const itemStyle = (path) => ({
    padding: '12px 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '500',
    borderRadius: '6px',
    marginBottom: '8px',
    background: isActive(path) ? '#34495e' : 'transparent',
    color: '#fff',
    transition: 'background 0.2s',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  });

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      background: '#2c3e50',
      color: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxPadding: '20px',
      padding: '20px',
      boxSizing: 'border-box',
      borderRight: '1px solid #1a252f'
    }}>
      <div>
        <div style={{ marginBottom: '30px', borderBottom: '1px solid #34495e', paddingBottom: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#2ecc71' }}>Finanças App</h2>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#bdc3c7' }}>Olá, {user?.nome}!</p>
        </div>

        <nav>
          <button 
            onClick={() => navigate('/dashboard')} 
            style={itemStyle('/dashboard')}
          >
            📊 Dashboard
          </button>

          <button 
            onClick={() => navigate('/categorias')} 
            style={itemStyle('/categorias')}
          >
            ⚙️ Categorias
          </button>
        </nav>
      </div>

      <div>
        <button 
          onClick={logout} 
          style={{
            width: '100%',
            padding: '12px',
            background: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          🚪 Sair da Sessão
        </button>
      </div>
    </div>
  );
}