import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import NewPostForm from "../../components/NewPostForm";

const newPost = () => {
  const router = useRouter();

  const boardId = router.query.boardId;

  return <NewPostForm boardId={boardId} />;
};

export default newPost;
