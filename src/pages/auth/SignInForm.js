import React, { useContext, useState } from "react";
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
import { SetCurrentUserContext } from "../../App";

const SignInForm = () => {
  const setCurrentUser = useContext(SetCurrentUserContext);

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user)
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col>
        <Card className={cardStyle.Card}>
          <Container>
            <h1>Sign In</h1>
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
              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="d-none">password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Button variant="primary" type="submit">
                Sign In
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-2">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          <Container>
            <Link to="/signup">
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Card>
      </Col>
    </Row>
  );
};

export default SignInForm;
