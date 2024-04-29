import { ProgressBar } from "react-bootstrap";
import { colors } from "../constants/constants";

const styles = {
  heading: {
    // color: colors.primary,
  },
  progressBar: {
    width: "600px",
  },
};

const RememberNumber = ({ targetNumber, remainingTimerSeconds }) => (
  <>
    <h2 className="mb-3" style={styles.heading}>{targetNumber}</h2>
    <ProgressBar now={remainingTimerSeconds * 10} style={styles.progressBar} />
  </>
);

export default RememberNumber;
