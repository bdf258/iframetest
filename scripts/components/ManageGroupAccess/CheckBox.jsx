import React, { useState } from "react";

import { FormCheckbox } from "@electedtech/electedtech-ui";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyle = createUseStyles({
  checkboxContainer: {
    justifyContent: "center",
  },
  pointer: {
    pointerEvents: "none",
  },
});

function CheckBox({ checked, name, statusChange, readOnly = false }) {
  const [isCheck, setIsCheck] = useState(checked);
  const classes = useStyle();
  return (
    <div className={readOnly ? classes.pointer : null}>
      <FormCheckbox
        customClassNames={{ container: classes.checkboxContainer }}
        onChange={(e) => {
          readOnly ? null : setIsCheck((isCheck) => !isCheck);
          statusChange(e);
        }}
        readOnly={readOnly}
        name={name}
        value={isCheck}
        keepErrorSpacing={false}
        textAlign="center"
      ></FormCheckbox>
    </div>
  );
}
CheckBox.propTypes = {
  checked: propTypes.bool,
  name: propTypes.string,
  readOnly: propTypes.bool,
  statusChange: propTypes.func,
};
export default CheckBox;
