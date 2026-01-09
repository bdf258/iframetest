import React, { useContext } from "react";

import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import getCasesPageCustomFields from "../../../../../common/CustomFields/util/casesPageCustomFields.js";
import propTypes from "./CustomFilters.propTypes.js";
import sortCustomFieldOptions from "../../../../../../helpers/sortCustomFieldOptions.js";
import useStyles from "./CustomFilters.styles.js";

const CustomFilters = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const casesPageCustomFields = getCasesPageCustomFields(
    state.filters.categorytypeID[0]
  );

  if (casesPageCustomFields.length <= 0) return null;

  return (
    <React.Fragment>
      <h3>{iln.gettext("Additional Fields")}</h3>
      <div className={classes.filtersGroup}>
        {casesPageCustomFields.map((customField) => (
          <div key={customField.id} className={classes.customFieldContainer}>
            <span className={classes.label}>{customField.name}</span>
            <FormSelectAutoComplete
              name={customField.id.toString()}
              value={state.filters.customFields[customField.id]}
              type="text"
              onChange={({ target: { name, value } }) => {
                if (value === -1) {
                  dispatch({
                    type: "REMOVE_CUSTOM_FILTER",
                    payload: name,
                  });
                } else {
                  dispatch({
                    type: "SET_FILTERS",
                    payload: {
                      ...state.filters,
                      customFields: {
                        ...state.filters.customFields,
                        [name]: value,
                      },
                    },
                  });
                }
              }}
              customClassNames={{
                container: classes.inputContainer,
                label: classes.resetLabel,
                autoComplete: {
                  input: classes.input,
                },
              }}
              keepErrorSpacing={false}
            >
              {[
                { id: -1, text: "Any" },
                ...customField.options.sort(sortCustomFieldOptions),
              ].reduce(
                (allOptions, nextOption) =>
                  nextOption.id === -1 ||
                  (nextOption.filteredBy === 0) |
                    (state.filters.customFields[customField.filteredBy] === -1)
                    ? [
                        ...allOptions,
                        <option key={nextOption.id} value={nextOption.id}>
                          {nextOption.text === "" ? "\u00A0" : nextOption.text}
                        </option>,
                      ]
                    : nextOption.filterID === 0 ||
                      nextOption.filterID ===
                        state.filters.customFields[customField.filteredBy]
                    ? [
                        ...allOptions,
                        <option key={nextOption.id} value={nextOption.id}>
                          {nextOption.text === "" ? "\u00A0" : nextOption.text}
                        </option>,
                      ]
                    : allOptions,

                []
              )}
            </FormSelectAutoComplete>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

CustomFilters.propTypes = propTypes;

export default CustomFilters;
