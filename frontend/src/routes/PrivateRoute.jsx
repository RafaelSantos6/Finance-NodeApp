import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando dados da sessão...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}