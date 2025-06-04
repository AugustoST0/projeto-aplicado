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
import Contato from './components/pages/Contato';
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
                  <Route path="/contato" element={<Contato />} />
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
