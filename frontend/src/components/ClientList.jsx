import React, { useState, useEffect } from "react";
import { Table, Button, Form, Pagination, Container } from "react-bootstrap";
import apiService from "../api/apiService";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [originalCompanies, setOriginalCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, [currentPage]);

  const fetchCompanies = async () => {
    try {
      const response = await apiService.getAllCompanies({ page: currentPage });
      setCompanies(response.clients);
      setTotalPages(response.totalPages);
      // Store original companies when fetching for the first time
      if (currentPage === 1) {
        setOriginalCompanies(response.clients);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      // Handle error state or show notification
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteCompany(id);
      // Update companies list after deletion
      setCompanies(companies.filter((company) => company._id !== id));
      setOriginalCompanies(
        originalCompanies.filter((company) => company._id !== id)
      );
    } catch (error) {
      console.error("Error deleting company:", error);
      // Handle error state or show notification
    }
  };

  const handleSearch = async () => {
    try {
      const response = await apiService.searchCompanies(searchTerm);
      setCompanies(response);

      // todo get page no as well
      setTotalPages(1);
    } catch (error) {
      console.error("Error searching companies:", error);
      // Handle error state or show notification
    }
  };

  const handleClearSearch = async () => {
    setSearchTerm("");
    setCompanies(originalCompanies); // Restore original list
    setTotalPages(Math.ceil(originalCompanies.length / 10)); // Adjust totalPages based on original list length
  };

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h2>Companies List</h2>
      <Form inline className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name, CIN, email..."
          className="mr-sm-2 mb-2"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
        <Button variant="outline-success" onClick={handleSearch}>
          Search
        </Button>
        {searchTerm && (
          <Button
            variant="secondary"
            className="ml-2"
            onClick={handleClearSearch}
          >
            Clear Search
          </Button>
        )}
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>CIN</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={company._id}>
              <td>{index + 1}</td>
              <td>{company._source.name}</td>
              <td>{company._source.cin}</td>
              <td>{company._source.status}</td>
              <td className="d-flex p-2 gap-2">
                <Button
                  onClick={() => navigate(`/clients/${company._id}/edit`)}
                  variant="primary"
                  size="sm"
                  className=""
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(company._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default ClientList;
