import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModificarCitaForm({ id, dataDate, onClose }) {
  const [fecha, setFecha] = useState(dataDate);

  useEffect(() => {
    const parsedDate = dataDate ? new Date(dataDate) : new Date();
    parsedDate.setHours(parsedDate.getHours() - 4);

    const formattedDate = parsedDate.toISOString().slice(0, 16);
    setFecha(formattedDate);
    }, [dataDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = { fecha: fecha };
      await axios.put(`http://localhost:5000/citas/modify/${id}`, data);
      console.log('Fecha modificada correctamente en el servidor.');
      onClose();
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div>
      <h2>Modificar fecha de cita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fecha">Nueva fecha de cita:</label>
          <input
            type="datetime-local"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Guardar cambios</button>
        <button onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
}

export default ModificarCitaForm;
