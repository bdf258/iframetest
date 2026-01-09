import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { getCategoryTypes } from "../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./CasesCategorySelect.propTypes.js";
import useStyles from "./CasesCategorySelect.styles.js";

const categoryTypes = getCategoryTypes();

const CasesCategorySelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.casesCategorySelect}>
      <span className={classes.label}>{iln.gettext("View")} </span>
      <FormSelect
        name="categorytypeID"
        value={state.filters.categorytypeID}
        onChange={({ target: { value, name } }) =>
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              [name]: value,
              customFields: {},
            },
          })
        }
        keepErrorSpacing={false}
      >
        <option key="any" value={[]}>
          {iln.gettext("Any Cases")}
        </option>
        {categoryTypes.map(({ id, categorytype }) => (
          <option key={id} value={[id]}>
            {`${categorytype} ${iln.gettext("Cases")}`}
          </option>
        ))}
      </FormSelect>
    </div>
  );
};

CasesCategorySelect.propTypes = propTypes;

export default CasesCategorySelect;
