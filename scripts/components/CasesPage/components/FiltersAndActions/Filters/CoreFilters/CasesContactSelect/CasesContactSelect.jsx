import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { getContactTypes } from "../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./CasesContactSelect.propTypes.js";
import useStyles from "./CasesContactSelect.styles.js";

const contactTypes = getContactTypes();

const CasesContactSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.casesContactSelect}>
      <span className={classes.label}>{iln.gettext("created from ")} </span>
      <FormSelect
        name="contacttypeID"
        value={state.filters.contacttypeID}
        onChange={({ target: { value, name } }) =>
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              [name]: value,
            },
          })
        }
        keepErrorSpacing={false}
      >
        <option value={[]}>{iln.gettext("Any Contact Method")}</option>
        {contactTypes.map(({ id, contacttype }) => (
          <option key={id} value={[id]}>
            {contacttype}
          </option>
        ))}
      </FormSelect>
    </div>
  );
};

CasesContactSelect.propTypes = propTypes;

export default CasesContactSelect;
