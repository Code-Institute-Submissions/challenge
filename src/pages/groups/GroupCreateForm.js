import React, { useState } from "react";

import appStyles from "../../App.module.css";
import cardStyles from "../../styles/Card.module.css";

import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";

function GroupCreateForm() {
  const [errors, setErrors] = useState({});

  const [groupData, setGroupData] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
  });

  const { title, category, description, tags } = groupData;

  const handleChange = (e) => {
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  const textFields = (
    <div>
      <Form.Group>
        <Form.Label className="">
          <h5 className="mb-0">Title:</h5>
        </Form.Label>
        <Form.Control
          type="text"
          rows={6}
          name="title"
          placeholder="pick a title for your group!"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <h5 className="mb-0 mt-2">Category:</h5>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option value="ETC">Other</option>
          <option value="SPI">Spiritual</option>
          <option value="FIN">Financial</option>
          <option value="CAR">Career</option>
          <option value="INT">Intellectual</option>
          <option value="FIT">Fitness</option>
          <option value="SOC">Social</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="">
          <h5 className="mb-0 mt-2">Description:</h5>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          placeholder="ex.: A group for all marathon lovers, weekly challenges"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="">
          <h5 className="mb-0 mt-2">Tags:</h5>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="tags"
          placeholder="category isn't enough? Add tags! format: running, marathorn, weekly"
          value={tags}
          onChange={handleChange}
        />
      </Form.Group>
      <Button onClick={() => {}}>cancel</Button>
      <Button type="submit">create</Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col>
          <h1>Group Creation</h1>
          <Card className={cardStyles.Card}>
            <Container>
              <div>{textFields}</div>
            </Container>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}

export default GroupCreateForm;
