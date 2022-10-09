import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import { Outlet, Link } from 'react-router-dom';
import styles from './root.module.css';

const root = () => {
  return (
    <div>
      <NavBar bg="info" variant="light">
        <Container className={styles.navContainer}>
          <NavBar.Brand>Sample Bank App</NavBar.Brand>
          <Nav className="me-auto">
            <Nav.Item className={styles.navItem}>
              <Link to="/">Home</Link>
            </Nav.Item>
            <Nav.Item className={styles.navItem}>
              <Link to="/customer">All Customers</Link>
            </Nav.Item>
            <Nav.Item className={styles.navItem}>
              <Link to="/new-customer">New Credit Line</Link>
            </Nav.Item>
          </Nav>
        </Container>
      </NavBar>
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  );
};

export default root;
