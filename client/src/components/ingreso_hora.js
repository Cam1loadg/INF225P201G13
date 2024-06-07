import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/ingreso_hora.css';

function IngresoHora() {
    const [nombre_paciente, setPatientName] = useState('');
    const [correo_paciente, setPatientEmail] = useState('');
    const [rut, setRut] = useState('');
    const [dv, setDv] = useState('');
    const [nombre_doctor, setDoctorName] = useState('');
    const [fecha, setDate] = useState('');
    const [maquina, setMachine] = useState('');
    const [minFecha, setMinFecha] = useState('');

    useEffect(() => {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const offset = now.getTimezoneOffset();
        now.setMinutes(now.getMinutes() - offset);

        const isoString = now.toISOString().slice(0, 16);
        setMinFecha(isoString);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = { nombre_paciente, correo_paciente, rut: `${rut}-${dv}`, nombre_doctor, fecha, maquina };
            console.log(data)
            await axios.post('http://localhost:5000/citas/add', data);
            console.log('Datos enviados correctamente al servidor.');
            alert('Datos enviados correctamente al servidor.');
            setPatientName('');
            setPatientEmail('');
            setRut('');
            setDoctorName('');
            setDate('');
            setMachine('');
        } catch (error) {
            console.error('Error al enviar datos:', error);
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
        <div>
            <h2>Formulario de Ingreso de Datos</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombrePaciente">Nombre del paciente: </label>
                    <input
                        type="text"
                        id="nombrePaciente"
                        value={nombre_paciente}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Ingrese su nombre completo"
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="correoPaciente">Correo del paciente:</label>
                    <input
                        type="email"
                        id="correoPaciente"
                        value={correo_paciente}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="Ingrese su correo electrónico"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rut">Rut:</label>
                    <div className="d-flex">
                        <input
                            type="text"
                            id="rut"
                            value={rut}
                            onChange={handleChangeRut}
                            placeholder="12.345.678"
                            minLength={9}
                            maxLength={10}
                            required
                        />
                        <span className="mx-2">_</span>
                        <input type="text" className="form-control" id="dv" value={dv} readOnly disabled />
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="nombreDoctor">Nombre del doctor:</label>
                    <select
                        id="nombreDoctor"
                        value={nombre_doctor}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un doctor</option>
                        <option value="Dr. Pedro">Dr. Pedro</option>
                        <option value="Dr. Juan">Dr. Juan</option>
                        <option value="Dra. Ignacia">Dra. Ignacia</option>
                        <option value="Dra. Diana">Dra. Diana</option>
                    </select>
                </div>
                <br />
                <div>
                    <label htmlFor="fecha">Fecha y hora:</label>
                    <input
                        type="datetime-local"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setDate(e.target.value)}
                        min={minFecha}
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="maquina">Máquina:</label>
                    <select
                        id="maquina"
                        value={maquina}
                        onChange={(e) => setMachine(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una máquina</option>
                        <option value="Resonancia Magnética">Resonancia Magnética</option>
                        <option value="Topografía TAC">Topografía TAC</option>
                        <option value="Rayos X">Rayos X</option>
                        <option value="Ecografías">Ecografías</option>
                    </select>
                </div>
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default IngresoHora;
