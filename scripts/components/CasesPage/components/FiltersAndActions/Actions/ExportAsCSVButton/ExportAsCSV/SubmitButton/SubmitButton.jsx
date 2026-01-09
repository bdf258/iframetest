import { Button, FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import { TranslationContext } from "context/translate";
import downloadCSV from "../helpers/downloadCSV.js";
import propTypes from "./SubmitButton.propTypes.js";
import useStyles from "./SubmitButton.styles.js";

const optionsNotValid = ({ exportName, ...options }) => {
  return (
    !exportName ||
    exportName.trim() === "" ||
    Object.entries({ ...options, ...options.customFields }).every(
      ([key, value]) =>
        typeof value !== "boolean" || !value || key === "showCombinedName"
    )
  );
};

const SubmitButton = ({ options, onSubmit, state }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [loading, setLoading] = useState(false);

  return (
    <FlexBox hAlign="center">
      <Button
        customClassNames={classes.submitButton}
        isDisabled={optionsNotValid(options) || loading}
        type="submit"
        onClick={() => {
          setLoading(true);
          downloadCSV(state, options, iln)
            .then(() => onSubmit())
            .catch(() => setLoading(false));
        }}
      >
        {!loading ? iln.gettext("Begin export") : <Spinner />}
      </Button>
    </FlexBox>
  );
};

SubmitButton.propTypes = propTypes;

export default SubmitButton;
