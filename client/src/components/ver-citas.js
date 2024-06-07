import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import moment from 'moment';
import ModificarCitaForm from "./modificar_cita";

const Horas = props => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Rut</th>
        <th>Correo</th>
        <th>Nombre Doctor</th>
        <th>Fecha</th>
        <th>Máquina</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>{props.cita.rut}</th>
        <th>{props.cita.correo_paciente}</th>
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
    this.handleModify = this.handleModify.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      rut: '',
      dv: '',
      nombre_doctor: '',
      fecha: new Date(),
      maquina: '',
      horas: [],
      isModifyFormOpen: false,
      appointmentToModify: null
    }
  }

  handleModify(id) {
    axios.get(`http://localhost:5000/citas/${id}`)
      .then(response => {
        this.setState({ fecha: response.data.fecha });
        this.setState({ isModifyFormOpen: true, appointmentToModify: id });
      })
      .catch(error => {
        console.error("Error fetching cita data: ", error);
      });
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

  handleClose = () => {
    this.setState({ isModifyFormOpen: false, appointmentToModify: null });
  
    axios.get(`http://localhost:5000/citas/rut/${this.state.rut}-${this.state.dv}`)
      .then(response => {
        this.setState({ horas: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeRut(e) {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    
    let formattedRut = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.setState({
      rut: formattedRut
    });

    if (formattedRut.length >= 9) {
      this.setState({ dv: this.calculateDv(inputValue) });
    } else {
      this.setState({ dv: '' });
    }
  }

  calculateDv(rut) {
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
  }

  onSubmit(e) {
    e.preventDefault();
  
    axios.get(`http://localhost:5000/citas/rut/${this.state.rut}-${this.state.dv}`)
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
    if (this.state.isModifyFormOpen) {
      return (
        <ModificarCitaForm 
          id={this.state.appointmentToModify} 
          dataDate={this.state.fecha}
          onClose={this.handleClose} 
        />
      );
    }
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
                    placeholder="12.345.678"
                    aria-label="Rut"
                    aria-describedby="rutHelp"
                    value={this.state.rut}
                    onChange={this.onChangeRut}
                    minLength={9}
                    maxLength={10}
                  />
                  <span className="mx-2">-</span>
                  <Form.Control 
                    aria-label="DV"
                    aria-describedby="dvHelp"
                    value={this.state.dv}
                    readOnly
                    style={{ width: '50px' }}
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
