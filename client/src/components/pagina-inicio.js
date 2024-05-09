import React from "react";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function PaginaInicio() {
  return (
    <div className="App">
        <Container className="col-md-12 text-center">
            <h1>Bienvenido a la pagina de Salud</h1>
        <Container className="border">
            <br></br>
            <h2>Proporcionamos los siguientes servicios</h2>
            <div className="d-flex justify-content-around">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                      <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={6} />
                  </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                      <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={6} />
                  </Card.Body>
                </Card>
            </div>
            <br></br>
            </Container>
        </Container>
    </div>

  );
}

export default PaginaInicio;