import React, { useState } from "react";
import { Container, Row, Col, Form, Input, Button, Spinner } from "reactstrap";
import validator from "validator";
import axios from "axios";
import Results from "./Results";

const Body = () => {
  const [valid, setValid] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || !validator.isURL(value)) {
      setValid(false);
      setInvalid(true);
    } else {
      setInvalid(false);
      setValid(true);
    }
    setUrl(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) {
      setLoading(true);
      
      axios.get(`http://localhost:5000/api?url=${url}`).then((res) => {
        console.log(res);
        setResult(res.data);
        setShowResult(true);
        setLoading(false);
      });
    }
  };

  return (
    <Container className="mt-5">
      <Form>
        <Row noGutters>
          <Col md={10}>
            <Input
              name="url"
              placeholder="Enter a web page URL"
              type="url"
              bsSize="lg"
              valid={valid}
              invalid={invalid}
              onChange={handleChange}
            />
          </Col>
          <Col md={2} className="d-flex flex-row-reverse">
            <Button color="primary h-auto" size="lg" onClick={handleSubmit}>
              Analyze
            </Button>
          </Col>
        </Row>
      </Form>
      {loading ? (
        <div className="mt-4 text-center">
          <Spinner color="primary" type="grow" />
        </div>
      ) : (
        showResult && <Results result={result} />
      )}
    </Container>
  );
};

export default Body;
