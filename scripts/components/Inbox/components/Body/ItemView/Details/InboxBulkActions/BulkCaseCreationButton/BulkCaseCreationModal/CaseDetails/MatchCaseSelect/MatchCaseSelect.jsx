import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../../../context/translation/TranslationContext";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const MatchCaseSelect = ({ matchCase, setMatchCase }) => {
  const classes = useStyles();
  const value = matchCase ? "true" : "false";
  const iln = useContext(TranslationContext);

  return (
    <FormSelect
      name="matchCase"
      label={iln.gettext("Match Case")}
      value={value}
      onChange={({ target: { value } }) =>
        setMatchCase(value === "true" ? true : false)
      }
      keepErrorSpacing={false}
      customClassNames={{ container: classes.container, label: classes.label }}
    >
      <option value={"false"}>{iln.gettext("No")}</option>
      <option value={"true"}>
        {iln.gettext("Yes, place email on cases that match the below criteria")}
      </option>
    </FormSelect>
  );
};

MatchCaseSelect.propTypes = propTypes;

export default MatchCaseSelect;
