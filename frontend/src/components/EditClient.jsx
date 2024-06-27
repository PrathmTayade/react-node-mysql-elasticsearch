// src/components/EditClient.js
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useClient, useUpdateClient } from "../hooks/api";

const EditClient = () => {
  const { id } = useParams();
  const { data: client, isLoading, error } = useClient(id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const updateClientMutation = useUpdateClient(id);

  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
    }
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClientMutation.mutate({ name, email });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
        Update Client
      </Button>
    </Form>
  );
};

export default EditClient;
