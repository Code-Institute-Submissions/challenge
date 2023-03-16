import React, { useEffect, useState } from "react";

import { Col, Row, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import cardStyle from "../../styles/Card.module.css";

function GroupPage() {
  const { id } = useParams();
  const [group, setGroup] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: group }] = await Promise.all([
          axiosReq.get(`/groups/${id}`),
        ]);
        setGroup({ results: [group] });
        console.log(group);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);
  return (
    <Row className="h-100">
      <Col>
        <Card className={cardStyle.Card}>
          <p>Group component</p>
        </Card>
        <Card className={cardStyle.Card}>
          <Container>Challenges</Container>
        </Card>
      </Col>
    </Row>
  );
}

export default GroupPage;
