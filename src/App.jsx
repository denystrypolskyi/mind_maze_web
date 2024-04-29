import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import Game from "./components/Game";
import { checkAuthentication } from "./api/api";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const isAuthenticated = await checkAuthentication();
        setIsLoggedIn(isAuthenticated);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (isLoading) {
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" variant="primary" />
    </div>;
  }

  if (errorMessage) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "calc(100vh - 56px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Alert variant="danger" style={{ width: "600px" }}>
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      </div>
    );
  }
  return (
    <Router>
      <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route
              path="/leaderboard"
              element={<Leaderboard onLogout={handleLogout} />}
            />
            <Route
              path="/profile"
              element={<Profile onLogout={handleLogout} />}
            />
            <Route path="/game" element={<Game />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
