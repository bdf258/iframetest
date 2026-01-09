import { useState } from "react";

const useCasesToCreateState = () => {
  const [casesToCreate, setCasesToCreate] = useState([]);

  const addToCasesToCreate = (value) => {
    if (value.constituentID === undefined || value.emailID === undefined)
      return;

    setCasesToCreate([...casesToCreate, value]);
  };

  return [casesToCreate, addToCasesToCreate];
};

export default useCasesToCreateState;
