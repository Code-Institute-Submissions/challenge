import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import cardStyle from "../../styles/Card.module.css";

import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col>
        <Card className={cardStyle.Card}>
          <Container>
            <h1>sign up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group className="mb-3" controlId="password1">
                <Form.Label className="d-none">password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group className="mb-3" controlId="password2">
                <Form.Label className="d-none">confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-2">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          <Container>
            <Link to="/signin">
              Already have an account? <span>Sign in</span>
            </Link>
          </Container>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpForm;
