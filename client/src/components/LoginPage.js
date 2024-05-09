import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const LoginPage = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/user/login', { rut, password })
      if (response.data.message === 'Login successful'){
        localStorage.setItem('token', response.data.token);
        window.alert('Ingreso exitoso');
        window.location.href = '/';
      }
    }
    catch(error){
      console.log(error);
      window.alert('Error al ingresar. Intenta nuevamente.');
    }
  };

  const handleChangeRut = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    let formattedRut = inputValue.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    setRut(formattedRut);
  }   

  return (
    <div className="container mt-5">
      <h2>Ingreso</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="rut" className="form-label">
            <FontAwesomeIcon icon={faUser} /> RUT
          </label>
          <input type="text" className="form-control" id="rut" value={rut} onChange={handleChangeRut} maxLength={12} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <FontAwesomeIcon icon={faKey} /> Contraseña
          </label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
      <div className="mt-3">
        <p>¿No tienes cuenta? <Link to="/register">Registrar aquí</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
