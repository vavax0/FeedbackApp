import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import FeatureBox from "../components/FeatureBox";

import classes from "../styles/index.module.css";

const index = ({ feedbackData }) => {
  useEffect(() => {
    fetch("/api/new").then((res) => {
      if (res.ok) {
        const data = res.json();
        console.log("Done");
        console.log(data);
        return;
      } else {
        console.log("error");
        return;
      }
    });
  }, []);

  return (
    <Container className={classes.container}>
      {feedbackData.map((feedback) => {
        return (
          <FeatureBox
            className={classes.container__box}
            feedback={feedback}
            key={feedback.id}
          />
        );
      })}
      <p>{process.env.PORT}</p>
    </Container>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:5000/api/new`);
  const data = await res.json();
  console.log("Done");
  console.log(data);

  // Pass data to the page via props
  return { props: { feedbackData: data } };
}

export default index;
