import { useRouter } from "next/dist/client/router";
import React, { useEffect, useReducer } from "react";
import { Fragment } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../store/actions/userActions";
import { wrapper } from "../store/store";

const account = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.userLogin);
  const { loading, userInfo, error, isAuthenticated } = userSelector;

  const router = useRouter();

  console.log("Loading " + loading);
  console.log("Authenticated " + isAuthenticated);

  useEffect(() => {
    if (loading === "loading") return;
    if (loading === "failed" && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, dispatch]);

  return (
    <Fragment>
      <Container>
        <Row>
          <h1>Settings</h1>
        </Row>
      </Container>
    </Fragment>
  );
};

// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ params, req, res, query }) => {
//       await store.dispatch(verifyUser());
//     }
// );

export default account;
