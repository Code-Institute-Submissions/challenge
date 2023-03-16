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
import styles from "../../styles/GroupsPage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function GroupsPage(message, filter = "") {
  const [groups, setGroups] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await axiosReq.get(`/groups/?search=${query}`);
        setGroups(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchGroups();
    }, 1000);
  }, [query, pathname]);

  return (
    <Row>
      <Col>
        <i className={`fas fa-search ${styles.SearchIcon}`}></i>
        <Form className={styles.SearcBar} onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="search groups"
            className={`mb-2 ${styles.FromControl}`}
          />
        </Form>
        {hasLoaded ? (
          <>
            {groups.results.length ? (
              <InfiniteScroll
                children={groups.results.map((group) => (
                  <Group key={group.id} {...group} setGroups={setGroups} />
                ))}
                dataLength={groups.results.length}
                loader={<Assets spinner />}
                hasMore={!!groups.next}
                next={() => fetchMoreData(groups, setGroups)}
              />
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
