import React, { useState } from "react";

import cardStyles from "../../styles/Card.module.css";

import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function GroupCreateForm() {
  const [errors, setErrors] = useState({});

  const [groupData, setGroupData] = useState({
    title: "",
    category: "",
    tags: [],
  });

  const { title, category, tags } = groupData;

  const history = useHistory();

  const handleChange = (e) => {
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("tags", tags);

    try {
      const { data } = await axiosReq.post("/groups/", formData);
      history.push(`/groups/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
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
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <h5 className="mb-0 mt-2">Category:</h5>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option value="Other">Other</option>
          <option value="Spiritual">Spiritual</option>
          <option value="Financial">Financial</option>
          <option value="Career">Career</option>
          <option value="Intellectual">Intellectual</option>
          <option value="Fitness">Fitness</option>
          <option value="Social">Social</option>
        </Form.Control>
      </Form.Group>
      {errors.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors.tags?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        cancel
      </Button>
      <Button type="submit">create</Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
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
