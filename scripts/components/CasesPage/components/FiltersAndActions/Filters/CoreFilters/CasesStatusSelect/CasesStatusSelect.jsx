import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { getStatusTypes } from "../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./CasesStatusSelect.propTypes.js";
import useStyles from "./CasesStatusSelect.styles.js";

const statusTypes = getStatusTypes();

const anyOpenValue = Array.isArray(statusTypes)
  ? statusTypes.reduce(
    (all, { closed, id }) => (!closed ? [...all, id] : all),
    []
  ) 
  : [];

const anyClosedValue = Array.isArray(statusTypes)
  ? statusTypes.reduce(
      (all, { closed, id }) => (closed ? [...all, id] : all),
      []
    )
  : [];

const CasesStatusSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const displayAnyClosedValuesInput = anyClosedValue.length > 1;
  const displayAnyOpenValueInput = anyOpenValue.length > 1;

  return (
    <div className={classes.casesStatusSelect}>
      <span className={classes.label}>{iln.gettext("that are")} </span>
      <FormSelect
        name="statusID"
        value={state.filters.statusID}
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
        <option value={[]}>{iln.gettext("Any Status")}</option>
        {displayAnyClosedValuesInput && (
          <option value={anyClosedValue}>
            {iln.gettext("Any Closed Status")}
          </option>
        )}
        {displayAnyOpenValueInput && (
          <option value={anyOpenValue}>{iln.gettext("Any Open Status")}</option>
        )}
        {statusTypes
          .filter(
            (statustype) =>
              statustype.categorytypeID === undefined ||
              statustype.categorytypeID === 0 ||
              state.filters.categorytypeID[0] === undefined ||
              state.filters.categorytypeID.includes(statustype.categorytypeID)
          )
          .map(
            (statustype) => (
              <option key={[statustype.id]} value={[statustype.id]}>
                {statustype.statustype}
              </option>
            ),

            []
          )}
      </FormSelect>
    </div>
  );
};

CasesStatusSelect.propTypes = propTypes;

export default CasesStatusSelect;
