import { ProgressBar } from "react-bootstrap";

const styles = {
  // number: {
  //   fontSize: "20px",
  // },
  instruction: {
    color: "gray",
  },
  progressBar: {
    width: "600px",
  },
};

const RememberNumber = ({ targetNumber, remainingTimerSeconds }) => (
  <>
    <p style={styles.instruction}>
      You have limited time to memorize the number.
    </p>
    <p style={styles.instruction}>Pay close attention!</p>
    <h4 className="mb-3" style={styles.number}>
    {/* <p className="mb-3" style={styles.number}> */}
      {targetNumber}
    </h4>
    <ProgressBar now={remainingTimerSeconds * 10} style={styles.progressBar} />
  </>
);

export default RememberNumber;
