import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Add({ addLevel }) {
  const [inputValue, setInputValue] = useState(0);
  const [selectValue, setSelectValue] = useState("cm3");
  const measures = {
    cm3: 1,
    lts: 1000,
    mm3: 0.001,
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addLevel(parseFloat(inputValue) * measures[selectValue], selectValue);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
        <Form.Label column>Agregar al Tanque</Form.Label>
        <Col>
          <Form.Control
            type="number"
            placeholder="Enter capacity"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Select
            aria-label="Default select example"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {Object.keys(measures).map((measure) => (
              <option key={measure} value={measure}>
                {measure}
              </option>
            ))}
          </Form.Select>
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

export { Add };
