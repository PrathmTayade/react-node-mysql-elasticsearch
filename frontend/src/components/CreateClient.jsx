// src/components/CreateClient.js
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCreateClient } from "../hooks/api";

const CreateClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const createClientMutation = useCreateClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    createClientMutation.mutate({ name, email });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Client
      </Button>
    </Form>
  );
};

export default CreateClient;
