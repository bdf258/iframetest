import { Button } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import React from "react";

const ButtonBar = (props) => {
  const { setAction, nextStep, flagList } = props;

  const action = (action) => {
    nextStep();
    setAction(action);
  };

  return (
    <React.Fragment>
      <Button onClick={() => action("delete")} isDisabled={flagList.length < 1}>
        Delete
      </Button>
      <Button onClick={() => action("merge")} isDisabled={flagList.length < 2}>
        Merge
      </Button>
      <Button onClick={() => action("edit")} isDisabled={flagList.length !== 1}>
        Edit
      </Button>
    </React.Fragment>
  );
};

ButtonBar.propTypes = {
  flagList: PropTypes.array,
  nextStep: PropTypes.func.isRequired,
  setAction: PropTypes.func.isRequired,
};

export default ButtonBar;
