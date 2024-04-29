import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    onLogout();
  };

  return (
    <>
      <Navbar bg="transparent" data-bs-theme="light">
        <Container>
          {/* <Navbar.Brand as={Link} to="/">Mindmaze</Navbar.Brand> */}
          <Nav className="me-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  Log in
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Create account
                </Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/game">
                  Game
                </Nav.Link>
                <Nav.Link as={Link} to="/leaderboard">
                  Leaderboard
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
