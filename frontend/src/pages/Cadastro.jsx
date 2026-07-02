import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { nome, email, senha });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      setErro('Erro ao registrar usuário. Verifique os dados.');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Finance Control</h1>
        <p>Crie sua conta para começar</p>
        
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        
        <form onSubmit={handleCadastro}>
          <input 
            type="text" 
            placeholder="Nome Completo" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
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
          <button type="submit">Cadastrar</button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Já tem uma conta? <Link to="/login">Faça Login</Link>
        </p>
      </div>
    </div>
  );
}