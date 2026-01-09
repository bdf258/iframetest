import { Button } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import React from "react";

const ButtonBar = (props) => {
  const { setAction, nextStep, tagList } = props;

  const action = (action) => {
    nextStep();
    setAction(action);
  };

  return (
    <React.Fragment>
      <Button onClick={() => action("delete")} isDisabled={tagList.length < 1}>
        Delete
      </Button>
      <Button onClick={() => action("merge")} isDisabled={tagList.length < 2}>
        Merge
      </Button>
      <Button onClick={() => action("edit")} isDisabled={tagList.length !== 1}>
        Edit
      </Button>
    </React.Fragment>
  );
};

ButtonBar.propTypes = {
  nextStep: PropTypes.func.isRequired,
  setAction: PropTypes.func.isRequired,
  tagList: PropTypes.array,
};

export default ButtonBar;
