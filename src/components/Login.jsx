import { useState } from "react";
import { Alert, Spinner, Button, Form } from "react-bootstrap";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 56px)",
  },
  alert: {
    width: "600px",
  },
  formContainer: {
    border: "1px solid lightgray",
    borderRadius: "20px",
    padding: "30px",
    width: "600px",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    login(username, password)
      .then(() => {
        onLogin();
        navigate("/profile");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          {errorMessage && (
            <Alert variant="danger" style={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          )}
          <div className="mb-4" style={styles.formContainer}>
            <h1>Welcome</h1>
            <h1 className="mb-4">Back</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
