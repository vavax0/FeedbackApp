import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BoardHeader from "../../components/BoardHeader";
import FeedbackItemDetails from "../../components/FeedbackItemDetails";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listBoardDetails } from "../../store/actions/boardActions";
import { getFeedbackDetails } from "../../store/actions/feedbackActions";
import classes from "../../styles/[feedbackItemId].module.css";

const FeedbackItem = ({}) => {
  const router = useRouter();
  const { boardId, feedbackItemId } = router.query;

  const dispatch = useDispatch();
  const feedbackItemSelector = useSelector(
    (state) => state.feedbackItemDetails
  );

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(getFeedbackDetails(boardId, feedbackItemId));
  }, [dispatch, router.isReady]);

  const { loading, error, feedbackItem } = feedbackItemSelector;
  const feedbackDetails = feedbackItem.feedback;

  return (
    <>
      <BoardHeader boardId={boardId} board={feedbackItem}></BoardHeader>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
      {loading ? (
        <div></div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className={classes.container}>
          <Row className={classes.container__list}>
            <FeedbackItemDetails
              feedbackItem={feedbackDetails}
            ></FeedbackItemDetails>
          </Row>
        </Container>
      )}
    </>
  );
};

export default FeedbackItem;
