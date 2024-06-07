import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const LoginPage = () => {
  const [rut, setRut] = useState('');
  const [dv, setDv] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/user/login', { rut: `${rut}-${dv}`, password })
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
    let formattedRut = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    setRut(formattedRut);
  }

  const calculateDv = (rut) => {
    let cleanRut = rut.replace(/\./g, '');
    let total = 0;
    let factor = 2;
    for (let i = cleanRut.length - 1; i >= 0; i--) {
      total += cleanRut.charAt(i) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    const remainder = total % 11;
    const dv = 11 - remainder;
    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
  };

  useEffect(() => {
    if (rut.length >= 9) {
      setDv(calculateDv(rut));
    } else {
      setDv('');
    }
  }, [rut]);

  return (
    <div className="container mt-5">
      <h2>Ingreso</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="rut" className="form-label">
            <FontAwesomeIcon icon={faUser} /> RUT
          </label>
          <div className="d-flex">
            <input type="text" className="form-control" id="rut" value={rut} onChange={handleChangeRut} minLength={9} maxLength={10} />
            <span className="mx-2">_</span>
            <input type="text" className="form-control" id="dv" value={dv} readOnly disabled />
          </div>
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
