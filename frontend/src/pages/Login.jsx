import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      const { user, token } = response.data;

      localStorage.setItem('@App:token', token);
      localStorage.setItem('@App:user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (error) {
      setErro('Email ou senha incorretos.');
      console.error(error);
    }
  };

  return (
<div className="auth-container">
    <div className="auth-card">   
    
          <h1>Finance Control</h1>
        <p>Controle de despesas pessoais</p>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
    </div>
  );
}