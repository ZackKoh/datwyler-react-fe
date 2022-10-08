import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';

const root = () => {
  return (
    <div>
      <NavBar bg="primary" variant="dark">
        <Container>
          <NavBar.Brand>Sample Bank App</NavBar.Brand>
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>New Loan</Nav.Link>
          </Nav>
        </Container>
      </NavBar>
    </div>
  );
};

export default root;
