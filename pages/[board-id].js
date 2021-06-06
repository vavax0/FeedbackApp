import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import FeatureBox from "../components/FeatureBox";

import FEEDBACK_DATA from "../server/data";

import classes from "../styles/index.module.css";

const index = () => {
  return (
    <Container className={classes.container}>
      {FEEDBACK_DATA.map((feedback) => {
        return (
          <FeatureBox
            className={classes.container__box}
            feedback={feedback}
            key={feedback.id}
          />
        );
      })}
    </Container>
  );
};

export default index;