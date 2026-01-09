import {
  FormSelect,
  FormSelectAutoComplete,
  Placeholder,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { getInstallationPreferences } from "../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./CasesUserSelect.propTypes.js";
import useStyles from "./CasesUserSelect.styles.js";

const installationPreferences = getInstallationPreferences();
const includeSomeoneElseOption =
  installationPreferences?.excludeGroupsFromAssignTo?.length > 0;

const someoneElseValue = "someoneElse";

const CasesUserSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [type, setType] = useState("assignedToID");
  const [fetching, setFetching] = useState(false);
  const [someoneElseOptions, setSomeoneElseOptions] = useState();

  return (
    <div className={classes.casesAssignedSelect}>
      <FormSelect
        value={type}
        name="assignedOrCreated"
        onChange={({ target: { value } }) => {
          type !== value &&
            dispatch({
              type: "SET_FILTERS",
              payload: {
                ...state.filters,
                [value]: state.filters[type],
                [type]: state.filters[value],
              },
            });
          setType(value);
        }}
        keepErrorSpacing={false}
        customClassNames={{ container: classes.typeContainer }}
      >
        <option value="assignedToID">{iln.gettext("Assigned To")}</option>
        <option value="createdByID">{iln.gettext("Created By")}</option>
      </FormSelect>
      {state.caseworkers === undefined || (fetching && !someoneElseOptions) ? (
        <Placeholder height={32} width="100%" className={classes.placeholder} />
      ) : (
        <FormSelectAutoComplete
          disableResultSort
          name={type}
          value={state.filters[type]}
          onChange={({ target: { value, name } }) => {
            if (value === someoneElseValue) {
              setFetching(true);
              api
                .getAllCaseworkers()
                .then((allCaseworkers) => {
                  setSomeoneElseOptions(allCaseworkers);
                  dispatch({
                    type: "SET_FILTERS",
                    payload: {
                      ...state.filters,
                      [type]: [allCaseworkers[0].id],
                    },
                  });
                })
                .finally(() => setFetching(false));
            } else {
              dispatch({
                type: "SET_FILTERS",
                payload: {
                  ...state.filters,
                  [name]: value,
                },
              });
            }
          }}
          keepErrorSpacing={false}
        >
          <option value={[]}>{iln.gettext("Anyone")}</option>
          {(someoneElseOptions || state.caseworkers).map(({ id, name }) => (
            <option key={id} value={[id]}>
              {name}
            </option>
          ))}
          {includeSomeoneElseOption && !someoneElseOptions && (
            <option value={someoneElseValue}>
              {iln.gettext("Someone Else")}
            </option>
          )}
        </FormSelectAutoComplete>
      )}
    </div>
  );
};

CasesUserSelect.propTypes = propTypes;

export default CasesUserSelect;
