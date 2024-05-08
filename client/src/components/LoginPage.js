import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';


const LoginPage = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with RUT:', rut, 'and password:', password);
  };

  const handleChangeRut = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    let formattedRut = inputValue.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    setRut(formattedRut);
  }   

  return (
    <div className="container mt-5">
      <h2>Login</h2>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="mt-3">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
