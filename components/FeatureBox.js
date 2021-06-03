import React, { Fragment } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

import classes from "./FeatureBox.module.css";

const FeatureBox = ({ feedback }) => {
  return (
    <Row className={classes.row}>
      <Col sm={10}>
        <Link href="/">
          <a>{feedback.title}</a>
        </Link>
        <p>{feedback.content}</p>
      </Col>
      <Col sm={2} className="align-self-center">
        <Button>Upvote {feedback.votes}</Button>
      </Col>
    </Row>
  );
};

export default FeatureBox;