import { Button } from "react-bootstrap";

const LostGame = ({ levelReached, resetGame }) => (
  <>
    <h1>Oops! Looks like you lost.</h1>
    <p>You were on Level {levelReached}, but don't worry, you can try again!</p>
    <Button variant="primary" size="md" onClick={resetGame}>
      Try Again
    </Button>
  </>
);

export default LostGame;
