import Link from "next/link";
import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FeatureBox from "../components/FeatureBox";
import { wrapper } from "../store/store";

// import { GlobalContext } from "../store/Provider";

import classes from "../styles/index.module.css";

const index = ({ feedbackData }) => {
  return (
    <>
      <Link href={`/account`}>Hey</Link>
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     await store.dispatch(listFeedbackList());
//   }
// );

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:5000/api/new`);
//   const data = await res.json();
//   console.log("Done");
//   console.log(data);

//   // Pass data to the page via props
//   return { props: { feedbackData: data } };
// }

export default index;
