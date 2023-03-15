import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import cardStyle from "../../styles/Card.module.css";

import { Form, Button, Col, Row, Container, Card } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row>
      <Col>
        <Card className={cardStyle.Card}>
          <Container>
            <h1>sign up</h1>
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password1">
                <Form.Label className="d-none">password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password1"
                  name="password1"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password2">
                <Form.Label className="d-none">confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  name="password2"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
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
