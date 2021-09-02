import React from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import classes from "./BoardHeader.module.css";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";

const BoardHeader = ({ board, boardId }) => {
  const router = useRouter();

  return (
    <Row className={classes.container__header}>
      <Col>
        <h1>{board.name}</h1>
        <h4>{board.header}</h4>
        <p>{board.description}</p>
        {router.pathname === `/[boardId]` && (
          <Link
            href={`/[boardId]?boardId=${boardId}`}
            as={`/${boardId}/new-post`}
          >
            <a>Request a feature</a>
          </Link>
        )}
      </Col>
    </Row>
  );
};

export default BoardHeader;
