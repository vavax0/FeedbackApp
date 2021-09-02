import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedbackPost } from "../store/actions/feedbackActions";
import FormContainer from "./FormContainer";

const NewPostForm = ({ boardId }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const feedbackSubmit = useSelector((state) => state.feedbackSubmit);
  const { loading, error, feedbackInfo } = feedbackSubmit;

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(submitFeedbackPost(title, body, boardId));
    router.push(`/[boardId]?boardId=${boardId}`);
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="details"
            placeholder="Enter details"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Create post
        </Button>
      </Form>
    </FormContainer>
  );
};

export default NewPostForm;
