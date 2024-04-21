import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Nav, Navbar } from 'react-bootstrap';
import VerCitas from "./components/ver-citas";
import PaginaInicio from "./components/pagina-inicio";
import IngresoHora from "./components/ingreso_hora";

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Página salud</Navbar.Brand>
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">Inicio</Link>
            <Link to={"/ingreso_hora"} className="nav-link">Ingresar Hora</Link>
            <Link to={"/ver-citas"} className="nav-link">Mis Horas</Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/ingreso_hora" element={<IngresoHora />} />
          <Route path="/ver-citas" element={<VerCitas />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
