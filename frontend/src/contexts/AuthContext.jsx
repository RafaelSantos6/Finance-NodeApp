import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Persistência de sessão: Verifica se já tem usuário salvo
    const recoveredUser = localStorage.getItem('@App:user');
    const token = localStorage.getItem('@App:token');

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha });
    const { user, token } = response.data;

    localStorage.setItem('@App:user', JSON.stringify(user));
    localStorage.setItem('@App:token', token);
    
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}