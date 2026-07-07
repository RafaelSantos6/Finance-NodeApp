import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import Categorias from '../pages/Categorias';
import PrivateRoute from './PrivateRoute';
import LayoutPrivado from '../components/LayoutPrivado'; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      <Route path="/dashboard" element={
        <PrivateRoute>
          <LayoutPrivado>
            <Dashboard />
          </LayoutPrivado>
        </PrivateRoute>
      } />
      
      <Route path="/categorias" element={
        <PrivateRoute>
          <LayoutPrivado>
            <Categorias />
          </LayoutPrivado>
        </PrivateRoute>
      } />
    </Routes>
  );
}