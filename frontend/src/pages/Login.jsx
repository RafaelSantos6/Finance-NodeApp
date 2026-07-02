import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loadingReq, setLoadingReq] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoadingReq(true);
    try {
      await login(email, senha); 
    } catch (error) {
      setErro('Email ou senha incorretos.');
      console.error(error);
    } finally {
      setLoadingReq(false);
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
        <button type="submit" disabled={loadingReq}>{loadingReq ? 'Entrando...' : 'Entrar'}</button>
      </form>
      <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
    </div>
  );
}