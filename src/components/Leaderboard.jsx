import { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import LeaderboardItem from "./LeaderboardItem";
import { fetchLeaderboardData } from "../api/api";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: "calc(100vh - 56px)",
    display: "flex",
    justifyContent: "center",
  },
  spinner: {
    position: "absolute",
    top: "50%",
  },
  alert: {
    width: "600px",
    minHeight: "100px",
  },
  leaderboardContainer: {
    width: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
};

const Leaderboard = ({ onLogout }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    fetchLeaderboardData()
      .then((data) => {
        setLeaderboardData(data);
      })
      .catch((error) => {
        if (
          error.message === "Error: Token not found. Please log in." ||
          error.message === "Your session has expired. Please log in again."
        ) {
          onLogout();
          navigate("/login");
        } else {
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      {isLoading ? (
        <Spinner style={styles.spinner} animation="border" variant="primary" />
      ) : (
        <>
          {errorMessage ? (
            <Alert variant="danger" style={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          ) : (
            <div style={styles.leaderboardContainer}>
              <h1 className="mb-4" style={{ textAlign: "center" }}>
                {leaderboardData.length > 0
                  ? "Leaderboard"
                  : "Be the first to make your mark on the leaderboard"}
              </h1>
              {leaderboardData.map((entry, index) => (
                <LeaderboardItem
                  key={index}
                  username={entry.username}
                  levelReached={entry.levelReached}
                  userRank={index + 1}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
