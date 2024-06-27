import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    name: "",
    cin: "",
    status: "",
    address: "",
    email: "",
    pin: "",
    directors: [],
  });

  useEffect(() => {
    if (isEditing) {
      fetchClient();
    }
  }, []);

  const fetchClient = async () => {
    try {
      const response = await apiService.getCompanyById(id);
      setFormData(response);
    } catch (error) {
      console.error("Error fetching client:", error);
      // Handle error state or show notification
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await apiService.updateCompany(id, formData);
        if (res) {
          toast.success("Client upadted successfully!");
          fetchClient();
        }
      } else {
        const res = await apiService.createCompany(formData);
        if (res) {
          toast.success("Client created successfully!");
        }
      }
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error(`Error saving client: ${error.response.data?.error}`);
    }
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Client" : "Create Client"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCIN">
          <Form.Label>CIN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CIN"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPin">
          <Form.Label>PIN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PIN"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Directors Input - Example */}
        {/* <Form.Group controlId="formDirectors">
          <Form.Label>Directors</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter directors (comma separated)"
            name="directors"
            value={formData.directors.join(", ")}
            onChange={handleChange}
          />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          {isEditing ? "Update" : "Create"}
        </Button>
      </Form>
    </div>
  );
};

export default ClientForm;
