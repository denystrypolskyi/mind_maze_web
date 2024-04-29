import { colors } from "../constants/constants";

const LeaderboardItem = ({ username, levelReached, userRank }) => {
  const rankColors = {
    1: colors.gold,
    2: colors.silver,
    3: colors.bronze,
  };

  const styles = {
    container: {
      minHeight: "100px",
      display: "flex",
      flexDirection: "row",
      backgroundColor: rankColors[userRank] || "white",
      border: `1px solid ${rankColors[userRank] || "lightgray"}`,
      borderRadius: 20,
      marginBottom: 10,
      padding: 10,
    },
    rankContainer: {
      width: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    rankText: {
      width: 25,
      borderRadius: 20,
      textAlign: "center",
      fontWeight: "bold",
      color: rankColors[userRank] || "white",
      backgroundColor: colors.darkGray,
    },
    userInfoContainer: {
      marginLeft: 10,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.rankContainer}>
        <p style={styles.rankText}>{userRank}</p>
      </div>
      <div style={styles.userInfoContainer}>
        <p style={{ fontWeight: "bold" }}>{username}</p>
        <p>Level {levelReached}</p>
      </div>
    </div>
  );
};

export default LeaderboardItem;
