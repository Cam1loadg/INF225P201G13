import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
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
    if (name === '' || rut === '' || password === '' || confirmPassword === '' || cargo === ''){
        window.alert('Por favor rellena todos los campos');
    }
    else{
        if (password === confirmPassword){
            try {
                const response = await registerUser({ name, rut, password, cargo });
                if (response.message === 'User already exists') {
                    window.alert('Ya existe un usuario con este RUT');
                    return;
                }
                if (response.message === 'User registered successfully'){
                  window.alert('Registro exitoso');
                  window.location.href = '/login';
                }
            } 
            catch (error) {
                console.log(error);
                window.alert('Error en registro. Intenta nuevamente.');
            }
        }
        else{
            window.alert('Las contraseñas no son iguales');
        }
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
          <input type="text" className="form-control" id="rut" value={rut} onChange={handleChangeRut} minLength={11} maxLength={12} />
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
