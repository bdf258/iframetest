import React, { useContext, useMemo } from "react";

import CaseTypeSelect from "../../../../../../common/CaseDetailInputs/CaseTypeSelect.jsx";
import { TranslationContext } from "context/translate";
import { getCaseTypes } from "../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./CasesCasetypeSelect.propTypes.js";
import useStyles from "./CasesCasetypeSelect.styles.js";

const casetypes = getCaseTypes() || [];

const CasesCasetypeSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const anyExclBulkCorrespondenceIDs = useMemo(
    () =>
      casetypes
        .filter(({ isBulkCorrespondence }) => !isBulkCorrespondence)
        .map(({ id }) => id),
    []
  );

  return (
    <div className={classes.casesCasetypeSelect}>
      <span className={classes.label}>{iln.gettext("of type")} </span>
      <CaseTypeSelect
        name="casetypeID"
        value={state.filters.casetypeID}
        label={null}
        onChange={({ target: { value, name } }) =>
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              [name]: Array.isArray(value) ? value : [value],
            },
          })
        }
        keepErrorSpacing={false}
        selectedCategoryIDs={state.filters.categorytypeID}
        additionalOptions={[
          { id: [], categorytypeID: 0, casetype: iln.gettext("Any") },
          {
            id: anyExclBulkCorrespondenceIDs,
            categorytypeID: 0,
            casetype: iln.gettext("Any excl. Bulk Correspondence"),
          },
        ]}
      />
    </div>
  );
};

CasesCasetypeSelect.propTypes = propTypes;

export default CasesCasetypeSelect;
