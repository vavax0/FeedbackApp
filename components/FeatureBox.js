import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import classes from "./FeatureBox.module.css";
import { useRouter } from "next/dist/client/router";

const FeatureBox = ({ feedback, id }) => {
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <Row className={classes.row}>
      <Col sm={10}>
        <b>{feedback.title} </b>
        <span>#{id}</span>
        <Link href={`/${boardId}/${feedback._id}`}>
          <a>
            <p>{feedback.body}</p>
          </a>
        </Link>
      </Col>
      <Col sm={2} className="align-self-center">
        <Button>Upvote {feedback.votes}</Button>
      </Col>
    </Row>
  );
};

export default FeatureBox;
