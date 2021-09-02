import React, { Fragment, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BoardHeader from "../../components/BoardHeader";
import FeatureBox from "../../components/FeatureBox";
import { listBoardDetails } from "../../store/actions/boardActions";
import { wrapper } from "../../store/store";
import classes from "../../styles/[boardId].module.css";
import Modal from "react-modal";
import { useRouter } from "next/dist/client/router";
import NewPostForm from "../../components/NewPostForm";

Modal.setAppElement("#__next");

const index = () => {
  const boardListSelector = useSelector((state) => state.boardDetails);
  const { loading, error, board } = boardListSelector;

  const router = useRouter();
  const boardId = router.query.boardId;

  const feedbackList = board.feedbackItems;

  return (
    <Container className={classes.container}>
      <BoardHeader boardId={boardId} board={board}></BoardHeader>
      <Row className={classes.container__list}>
        {feedbackList.map((feedback) => {
          return (
            <FeatureBox
              className={classes.container__box}
              feedback={feedback._id}
              id={feedback.feedbackId}
              key={feedback.feedbackId}
            />
          );
        })}
      </Row>
      <Modal
        isOpen={router.asPath === `/${boardId}/new-post`}
        onRequestClose={() => router.push(`/${boardId}/`)}
      >
        <NewPostForm boardId={boardId} />
      </Modal>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, res, query }) => {
      await store.dispatch(listBoardDetails(query.boardId));
    }
);

export default index;
