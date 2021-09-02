import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

import classes from "./FeedbackItemDetails.module.css";

const FeedbackItemDetails = ({ feedbackItem }) => {
  return (
    <Container className={classes.container__box}>
      <Row>
        <Col>
          <h1>{feedbackItem.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <p>Subscribe to updates</p>
        </Col>
        <Col md={8}>
          <Button>Upvote</Button>
        </Col>
      </Row>
      <Row>
        <Col md={2}></Col>
        <Col md={10}>
          <p>{feedbackItem.body}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackItemDetails;
