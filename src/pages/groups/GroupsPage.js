import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Group from "./Group";
import NoResults from "../../assets/no-results.png";
import Assets from "../../components/Assets";

function GroupsPage(message, filter = "") {
  const [groups, setGroups] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await axiosReq.get(`/groups/?${filter}`);
        setGroups(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchGroups();
  }, [filter, pathname]);

  return (
    <Row>
      <Col>
        {hasLoaded ? (
          <>
            {groups.results.length ? (
              groups.results.map((group) => (
                <Group key={group.id} {...group} setGroups={setGroups} />
              ))
            ) : (
              <Container>
                <Assets src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Assets spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default GroupsPage;
