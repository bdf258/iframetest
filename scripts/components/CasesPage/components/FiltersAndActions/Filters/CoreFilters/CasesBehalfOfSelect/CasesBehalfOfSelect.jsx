import {
  FormSelectAutoComplete,
  ModalContext,
  Placeholder,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";
import { allowBehalfOf } from "../../../../../../../consts/disabledFeatures.js";
import api from "@electedtech/api";
import propTypes from "./CasesBehalfOfSelect.propTypes.js";
import useStyles from "./CasesBehalfOfSelect.styles.js";

const CasesBehalfOfSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allowBehalfOf)
      api
        .getBehalfs(modalActions)
        .then((behalfs) => setOptions(behalfs))
        .finally(() => setLoading(false));
  }, []);

  if (!allowBehalfOf) return null;

  return (
    <div className={classes.casesBehalfOfSelect}>
      <span className={classes.label}>{iln.gettext("on behalf of")} </span>
      {loading ? (
        <Placeholder height={32} width="100%" className={classes.placeholder} />
      ) : (
        <FormSelectAutoComplete
          name="behalfOf"
          value={state.filters.casetypeID}
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
          <option value={[]}>{iln.gettext("Any")}</option>
          {options.map(({ id, label }) => (
            <option key={id} value={[id]}>
              {label}
            </option>
          ))}
        </FormSelectAutoComplete>
      )}
    </div>
  );
};

CasesBehalfOfSelect.propTypes = propTypes;

export default CasesBehalfOfSelect;
