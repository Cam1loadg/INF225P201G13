import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Nav, Navbar } from 'react-bootstrap';
import VerCitas from "./components/ver-citas";
import PaginaInicio from "./components/pagina-inicio";
import IngresoHora from "./components/ingreso_hora";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import { jwtDecode } from "jwt-decode";

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const handleLogout = () => {
  localStorage.removeItem('token');
  window.alert('Sesión terminada')
  window.location.href = '/';
};

const getUserNameFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.name;
  }
  return null;
};

function App() {
  const userName = getUserNameFromToken();
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Página salud</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/"} className="nav-link">Inicio</Link>
              <Link to={"/ingreso_hora"} className="nav-link">Ingresar Hora</Link>
              <Link to={"/ver-citas"} className="nav-link">Mis Horas</Link>
            </Nav>
            <Nav>
              {isLoggedIn() ? (
                  <>
                    <div className="nav-link">Sesión: <span style={{ color: 'lime' }}>{userName}</span></div>
                    <Link to="/" className="nav-link" onClick={handleLogout} style={{ color: 'red' }}>Cerrar Sesión</Link>
                  </>
                ) : (
                  <Link to="/login" className="nav-link">Ingreso</Link>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/ingreso_hora" element={<IngresoHora />} />
          <Route path="/ver-citas" element={<VerCitas />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
