import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signUp } from "../api/api";

const styles = {
  container: {
    minHeight: "calc(100vh - 56px)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    signUp(email, username, password, avatar)
      .then((success) => {
        if (success) {
          setShowSuccess(true);
          setErrorMessage("");
          setEmail("");
          setUsername("");
          setPassword("");
          setAvatar(null);
        } else {
          setErrorMessage("Registration failed. Please try again.");
          setShowSuccess(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowSuccess(false);
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
          {showSuccess && (
            <Alert
              variant="success"
              onClose={() => setShowSuccess(false)}
              dismissible
              style={styles.alert}
            >
              <Alert.Heading>Success</Alert.Heading>
              <p>Successfully registered user.</p>
            </Alert>
          )}
          <div className="mb-4" style={styles.formContainer}>
            <h1>Create</h1>
            <h1 className="mb-4">Account</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="formBasicAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
