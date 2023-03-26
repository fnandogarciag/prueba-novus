import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Max({ max, changeMax }) {
  const [input, setInput] = useState(max);
  const onSubmit = (e) => {
    e.preventDefault();
    changeMax(parseFloat(input));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
        <Form.Label column>Cambiar Capacidad</Form.Label>
        <Col>
          <Form.Control
            type="number"
            placeholder="Enter capacity"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Cambiar
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export { Max };
