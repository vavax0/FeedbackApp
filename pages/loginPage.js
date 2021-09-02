import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyUser } from "../store/actions/userActions";


const loginPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSelector = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userSelector;

  const verify = () => {
    dispatch(verifyUser());
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login("ada@example.com", "123456"));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
        <Button onClick={verify}>VERIFY</Button>
      </Form>

      <Row className="py-3">
        <Col>New Customer? </Col>
      </Row>
    </FormContainer>
  );
};

export default loginPage;
