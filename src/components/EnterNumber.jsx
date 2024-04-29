import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import { colors } from "../constants/constants";

const styles = {
  inputGroup: {
    width: "350px",
  },
  inputGroupText: {
    cursor: "pointer",
    backgroundColor: colors.primary,
  },
};

const EnterNumber = ({ onNumberSubmit }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onNumberSubmit(enteredNumber);
    }
  };

  return (
    <>
      {/* <h1 className="mb-3">What was the number?</h1> */}
      <InputGroup className="mb-3" style={styles.inputGroup}>
        <Form.Control
          type="number"
          size="lg"
          placeholder="Number"
          onChange={(e) => {
            setEnteredNumber(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <InputGroup.Text
          style={styles.inputGroupText}
          onClick={() => onNumberSubmit(enteredNumber)}
        >
          <CheckLg color="white" size={16} />
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default EnterNumber;
