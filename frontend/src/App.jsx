import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ClientList from "./components/ClientList";
import ClientForm from "./components/ClientForm";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg" navbar className="p-2">
        <Navbar.Brand href="/">Company Management</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Company</Nav.Link>
          <Nav.Link href="/clients/new">Create Client</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id/edit" element={<ClientForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
