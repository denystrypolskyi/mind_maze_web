import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Image,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { EnvelopeFill, PencilSquare, PersonFill } from "react-bootstrap-icons";
import {
  fetchUserInfo,
  fetchUserAvatar,
  updateUserInfo,
  updateUserAvatar,
} from "../api/api";
import { useNavigate } from "react-router-dom";
import { AVATAR_BASE_URL } from "../constants/constants";

const styles = {
  container: {
    minHeight: "calc(100vh - 56px)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  spinner: {
    position: "absolute",
    top: "50%",
  },
  alert: {
    width: "600px",
    minHeight: "100px",
  },
  profileContainer: {
    width: "600px",
    maxHeight: "380px",
    backgroundColor: "white",
    border: "1px solid lightgray",
    borderRadius: "20px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "128px",
    minHeight: "128px",
    cursor: "pointer",
  },
  hiddenInput: {
    display: "none",
  },
};

const Profile = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchUserInfo(), fetchUserAvatar()])
      .then(([userData, fileName]) => {
        const avatarPath = `${AVATAR_BASE_URL}/${fileName}`;
        setUserInfo(userData);
        setAvatarUrl(avatarPath);
      })
      .catch((error) => {
        if (
          error.message === "Error: Token not found. Please log in." ||
          error.message === "Your session has expired. Please log in again."
        ) {
          onLogout();
          navigate("/login");
        } else {
          setSuccessMessage("");
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAvatarChange = (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    updateUserAvatar(file)
      .then((message) => {
        setAvatarUrl(URL.createObjectURL(file));
        setErrorMessage("");
        setSuccessMessage(message);
      })
      .catch((error) => {
        if (
          error.message === "Error: Token not found. Please log in." ||
          error.message === "Your session has expired. Please log in again."
        ) {
          onLogout();
          navigate("/login");
        } else {
          setSuccessMessage("");
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveChanges = () => {
    setIsLoading(true);
    updateUserInfo(userInfo)
      .then((response) => {
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        setErrorMessage("");
        setSuccessMessage(response.data.message);
      })
      .catch((error) => {
        if (
          error.message === "Error: Token not found. Please log in." ||
          error.message === "Your session has expired. Please log in again."
        ) {
          onLogout();
          navigate("/login");
        } else {
          setSuccessMessage("");
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={styles.container}>
      {isLoading ? (
        <Spinner style={styles.spinner} animation="border" variant="primary" />
      ) : (
        <>
          {errorMessage && (
            <Alert variant="danger" style={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          )}
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage("")}
              dismissible
              style={styles.alert}
            >
              <Alert.Heading>Success</Alert.Heading>
              <p>{successMessage}</p>
            </Alert>
          )}
          <h1 className="mb-4">Profile</h1>
          <div className="mb-4" style={styles.profileContainer}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={styles.hiddenInput}
              onChange={handleAvatarChange}
            />
            <Image
              className="mb-4"
              style={styles.image}
              src={avatarUrl}
              roundedCircle
              onClick={handleAvatarClick}
              onMouseOver={(e) =>
                (e.currentTarget.style.filter = "brightness(70%)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.filter = "brightness(100%)")
              }
            />
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <PersonFill size={16} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={userInfo.username}
                disabled={isUsernameDisabled}
                onChange={(e) =>
                  setUserInfo((previousValue) => ({
                    ...previousValue,
                    username: e.target.value,
                  }))
                }
              />
              <InputGroup.Text
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsUsernameDisabled((previousValue) => !previousValue);
                }}
              >
                <PencilSquare size={16} />
              </InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <EnvelopeFill size={16} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={userInfo.email}
                disabled={isEmailDisabled}
                onChange={(e) =>
                  setUserInfo((previousValue) => ({
                    ...previousValue,
                    email: e.target.value,
                  }))
                }
              />
              <InputGroup.Text
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setIsEmailDisabled((previousValue) => !previousValue)
                }
              >
                <PencilSquare size={16} />
              </InputGroup.Text>
            </InputGroup>
            <Button onClick={saveChanges} variant="success">
              Save Changes
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
