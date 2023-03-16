import React from "react";
import {
  Card,
  Media,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";

import cardStyles from "../../styles/Card.module.css";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

const Group = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    created_at,
    updated_at,
    title,
    category,
    tags,
    members,
    members_count,
    member_id,
    groupPage,
    setGroups,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLeave = async () => {
    try {
      const { data } = await axiosRes.delete(`/members/${member_id}`);
      setGroups((prevGroups) => ({
        ...prevGroups,
        results: prevGroups.results.map((group) => {
          return group.id === id
            ? {
                ...group,
                members_count: group.members_count - 1,
                member_id: null,
              }
            : group;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoin = async () => {
    try {
      const { data } = await axiosRes.post("/members/", { group: id });
      setGroups((prevGroups) => ({
        ...prevGroups,
        results: prevGroups.results.map((group) => {
          return group.id === id
            ? {
                ...group,
                members_count: group.members_count + 1,
                member_id: data.id,
              }
            : group;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={cardStyles.Card}>
      <Card.Header>
        <Media className="">
          <Link to={`/profiles/${profile_id}`}>
            {owner}
            <Avatar src={profile_image} height={20} />
          </Link>
          {/*Have created at, and updated at as a tooltip, indication that it has
          been updated */}
          <span>{updated_at}</span>
          <span>{created_at}</span>
          <span>{is_owner && "edit"}</span>
        </Media>
      </Card.Header>
      <Card.Body>
        <Link to={`/groups/${id}`}>
          {title && <Card.Title>{title}</Card.Title>}
        </Link>
        {/*tags should be linkable to search, individually listed here, styled*/}
        <span>{category}</span>
        <span>{tags}</span>

        <div>
          <span>Members: {members_count}</span>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't unfollow groups you own</Tooltip>}
            >
              <Button>Leave Group</Button>
            </OverlayTrigger>
          ) : member_id ? (
            <Button onClick={handleLeave}>Leave Group</Button>
          ) : currentUser ? (
            <Button onClick={handleJoin}>Join Group</Button>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to join groups</Tooltip>}
            >
              <Button>Join Group</Button>
            </OverlayTrigger>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Group;
