import { Button } from "react-bootstrap";

const styles = {
  instruction: {
    color: "gray",
  },
};

const LostGame = ({ levelReached, resetGame }) => (
  <>
    <p style={styles.instruction}>Oops! Looks like you lost.</p>
    <p style={styles.instruction}>
      You were on Level {levelReached}, but don't worry, you can try again!
    </p>
    <Button variant="primary" size="md" onClick={resetGame}>
      Try Again
    </Button>
  </>
);

export default LostGame;
