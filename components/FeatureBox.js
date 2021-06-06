import React, { Fragment, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

import classes from "./FeatureBox.module.css";
import { listFeedbackList } from "../store/actions/getFeedbackListAction";
import { GlobalContext } from "../store/Provider";

const FeatureBox = ({ feedback }) => {
  // const { feedbackState, feedbackDispatch } = useContext(GlobalContext);
  // useEffect(() => {
  //   listFeedbackList()(feedbackDispatch);
  //   const { loading, feedbackList, error } = feedbackState;
  //   console.log(feedbackList);
  // }, []);

  return (
    <Row className={classes.row}>
      <Col sm={10}>
        <Link href="/">
          <a>
            {feedback.title}
            <span> #{feedback.id}</span>
          </a>
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
