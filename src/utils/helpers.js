import { numbersRange } from "../constants/constants";

export const generateNumber = (currentNumberLength) => {
    const max = numbersRange[currentNumberLength].max;
    const min = numbersRange[currentNumberLength].min;
  
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return number;
  };
  