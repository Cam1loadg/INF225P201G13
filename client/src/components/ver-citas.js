import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import moment from 'moment';

const Horas = props => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Rut</th>
        <th>Nombre Doctor</th>
        <th>Fecha</th>
        <th>Máquina</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>{props.cita.rut}</th>
        <th>{props.cita.nombre_doctor}</th>
        <th>{props.cita.fecha ? moment(props.cita.fecha).format('DD/MM/YYYY HH:mm') : "N/A"}</th>
        <th>{props.cita.maquina}</th>
        <td>
          <Button variant="primary" size="sm" onClick={() => props.handleModify(props.cita._id)}>Modificar</Button>
          <Button variant="danger" size="sm" onClick={() => props.handleDelete(props.cita._id)}>Eliminar</Button>
        </td>
      </tr>
    </tbody>
  </Table>
)

class VerCitas extends Component {
  constructor(props){
    super(props);

    this.onChangeRut = this.onChangeRut.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      rut: '',
      nombre_doctor: '',
      fecha: new Date(),
      maquina: '',
      horas: []
    }
  }

  handleModify(id) {
    // Implement the modify logic here
    console.log("Modify entry with ID:", id);
  }

  handleDelete(id) {
    const confirmed = window.confirm("Estas seguro que quieres eliminar esta hora?");
    if (confirmed) {
      axios.delete(`http://localhost:5000/citas/${id}`)
        .then(response => {
          console.log("Cita deleted successfully");
          axios.get(`http://localhost:5000/citas/rut/${this.state.rut}`)
          .then(response => {
            this.setState({ horas: response.data });
          })
          .catch(error => {
            console.error("Error fetching cita data after deletion:", error);
          });
        })
        .catch(error => {
          console.error("Error deleting cita:", error);
        });
    }
  }

  onChangeRut(e) {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    
    let formattedRut = inputValue.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');

    this.setState({
      rut: formattedRut
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    axios.get(`http://localhost:5000/citas/rut/${this.state.rut}`)
      .then(response => {
        this.setState({ horas: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  listaCitas() {
    return this.state.horas.map(citaactual => {
      return <Horas 
                cita={citaactual} 
                key={citaactual._id}
                handleModify={this.handleModify}
                handleDelete={this.handleDelete}
              />
    })
  }

  render() {
    return (
      <div className="App">
        <div className="col-md-12">
          <Card>
            <Card.Header>Ver Hora Agendada</Card.Header>
            <Card.Body>
              <Card.Text> Escriba su rut en la casilla:</Card.Text>
            </Card.Body>
            <Container>
              <Form onSubmit={this.onSubmit}>
                <InputGroup className="md-12">
                  <Form.Control 
                    placeholder="12.345.678-9"
                    aria-label="Rut"
                    aria-describedby="rutHelp"
                    value={this.state.rut}
                    onChange={this.onChangeRut}
                    maxLength={12}
                  />
                  <Button variant="outline-secondary" type="submit"> Enviar </Button>
                </InputGroup>
                <Form.Text id="rutHelp" muted>El rut debe ser en el formato 12.345.678-9.</Form.Text>
              </Form>
            </Container>
          </Card>
        </div>
        {this.listaCitas()}
      </div>
    )
  }
}

export default VerCitas;
