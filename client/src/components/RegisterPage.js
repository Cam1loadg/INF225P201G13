import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [dv, setDv] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cargo, setCargo] = useState('');

  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/user/register', userData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name === '' || rut === '' || dv === '' || password === '' || confirmPassword === '' || cargo === '') {
        window.alert('Por favor rellena todos los campos');
    } else if (password !== confirmPassword) {
        window.alert('Las contraseñas no son iguales');
    } else {
        try {
            const response = await registerUser({ name, rut: `${rut}-${dv}`, password, cargo });
            if (response.message === 'Invalid RUT format') {
                window.alert('El RUT ingresado no es válido, verifica e intenta nuevamente');
                return;
            } 
            if (response.message === 'User already exists') {
                window.alert('Ya existe un usuario con este RUT');
                return;
            } 
            if (response.message === 'User registered successfully') {
                window.alert('Registro exitoso');
                window.location.href = '/login';
                return;
            }
        } catch (error) {
            console.log(error);
            window.alert('Error en registro. Intenta nuevamente.');
        }
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
      <h2>Registrar</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <FontAwesomeIcon icon={faUser} /> Nombre
          </label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            <FontAwesomeIcon icon={faKey} /> Confirmar Contraseña
          </label>
          <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">
            <FontAwesomeIcon icon={faIdBadge} /> Cargo
          </label>
          <select className="form-select" id="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)}>
            <option value="">Select Cargo</option>
            <option value="TENS">TENS</option>
            <option value="Secretaría">Secretaría</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      <div className="mt-3">
        <p>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
