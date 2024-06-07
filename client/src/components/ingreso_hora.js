import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/ingreso_hora.css';

function IngresoHora() {
    const [nombre_paciente, setPatientName] = useState('');
    const [correo_paciente, setPatientEmail] = useState('');
    const [rut, setRut] = useState('');
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
            const data = { nombre_paciente, correo_paciente, rut, nombre_doctor, fecha, maquina };
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
        let formattedRut = inputValue.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
        setRut(formattedRut);
    }

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
                    <input
                        type="text"
                        id="rut"
                        value={rut}
                        onChange={handleChangeRut}
                        placeholder="12.345.678-9"
                        minLength={11}
                        maxLength={12}
                        required
                    />
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
