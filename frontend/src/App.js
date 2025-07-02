import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PopupProvider } from './contexts/PopupContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/pages/auth/Login';
import Cadastro from './components/pages/auth/Cadastro';
import Layout from './components/layout/Layout';
import Produtos from './components/pages/Produtos';
import Container from './components/layout/Container';
import Pedido from './components/pages/Pedido';
import Perfil from './components/pages/Perfil';
import Historico from './components/pages/Historico';
import Controle from './components/pages/Controle';
import ProtectedRoute from './components/pages/ProtectedRoute';
import Interceptors from './services/Interceptors';

function App() {
  return (
    <Router>
      <CarrinhoProvider>
        <PopupProvider>
          <AuthProvider>
            <Interceptors />
            <Container>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Cadastro />} />
                <Route element={<Layout />}>
                  <Route path="/" element={<Produtos />} />
                  <Route path="/pedido" element={<Pedido />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/historico" element={<Historico />} />
                    <Route path="/controle" element={<Controle />} />
                  </Route>
                </Route>
              </Routes>
            </Container>
          </AuthProvider>
        </PopupProvider>
      </CarrinhoProvider>
    </Router>
  )
}

export default App;
