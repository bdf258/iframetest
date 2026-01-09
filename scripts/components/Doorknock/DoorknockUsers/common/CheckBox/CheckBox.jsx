import { FormCheckbox } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  checkboxContainer: {
    alignItems: "end",
    justifyContent: "center",
  },
});

function CheckBox({ id, checked, handleSelected }) {
  const classes = useStyles();
  return (
    <div>
      <FormCheckbox
        name={"checkBox" + id}
        customClassNames={{ container: classes.checkboxContainer }}
        value={checked}
        onChange={() => {
          handleSelected(id, !checked);
        }}
      />
    </div>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  handleSelected: PropTypes.func,
  id: PropTypes.number,
};
export default CheckBox;
