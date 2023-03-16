import React, { useEffect, useState } from "react";

import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";

import Group from "./Group";

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
        <Group {...group.results[0]} setGroups={setGroup} groupPage />
        <Container>Challenges</Container>
      </Col>
    </Row>
  );
}

export default GroupPage;
