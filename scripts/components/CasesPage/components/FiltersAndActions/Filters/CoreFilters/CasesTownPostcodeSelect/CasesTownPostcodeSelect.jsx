import {
  FormChipInput,
  FormSelect,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { defaultFilters } from "../../../../../consts/initialFilters.js";
import propTypes from "./CasesTownPostcodeSelect.propTypes.js";
import useStyles from "./CasesTownPostcodeSelect.styles.js";
import useTownPostcodeState from "./hooks/useTownPostcodeState.js";

const CasesTownSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [type, setType] = useTownPostcodeState(state);

  return (
    <div className={classes.casesTownSelect}>
      <span className={classes.label}>{iln.gettext("in the following")}</span>
      <FormSelect
        value={type}
        name="townPostcodeType"
        onChange={({ target: { value } }) => {
          setType(value);
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              constituentCriteria: {
                ...state.filters.constituentCriteria,
                inPostalTown: defaultFilters.constituentCriteria.inPostalTown,
                inPostcode: defaultFilters.constituentCriteria.inPostcode,
              },
            },
          });
        }}
        keepErrorSpacing={false}
        customClassNames={{
          container: classes.townPostcodeTypeSelectContainer,
        }}
      >
        <option value="postcode">{iln.gettext("Postcodes")}</option>
        <option value="town">{iln.gettext("Town")}</option>
      </FormSelect>
      {type === "town" ? (
        <FormChipInput
          name="townSuburb"
          value={{
            chips: state.filters.constituentCriteria.inPostalTown.map(
              (town) => ({
                town,
                id: town,
              })
            ),
          }}
          onChange={({
            target: {
              value: { chips },
            },
          }) => {
            dispatch({
              type: "SET_FILTERS",
              payload: {
                ...state.filters,
                constituentCriteria: {
                  ...state.filters.constituentCriteria,
                  inPostalTown: chips.map(({ town }) => town),
                },
              },
            });
          }}
          typingTimeoutDelay={500}
          customClassNames={{
            container: classes.inputContainer,
            label: classes.resetLabel,
          }}
          keepErrorSpacing={false}
          placeholder={iln.gettext("Town / Suburb")}
          type="text"
          addNewChips={false}
          chipLabelKey="town"
          suggestionLabelKey="town"
          chipSource={(term) =>
            api
              .constituentsSearch(
                {
                  term,
                  distinct: true,
                  columnsToReturn: ["town"],
                },
                modalActions,
                iln
              )
              .then((towns) => towns.map(({ town }) => ({ town, id: town })))
          }
        />
      ) : (
        <FormChipInput
          name="postcode"
          value={{
            chips: state.filters.constituentCriteria.inPostcode.map(
              (postcode) => ({
                postcode,
                id: postcode,
              })
            ),
          }}
          onChange={({
            target: {
              value: { chips },
            },
          }) => {
            dispatch({
              type: "SET_FILTERS",
              payload: {
                ...state.filters,
                constituentCriteria: {
                  ...state.filters.constituentCriteria,
                  inPostcode: chips.map(({ postcode }) => postcode),
                },
              },
            });
          }}
          typingTimeoutDelay={500}
          customClassNames={{
            container: classes.inputContainer,
            label: classes.resetLabel,
          }}
          keepErrorSpacing={false}
          placeholder={iln.gettext("Postcode")}
          type="text"
          addNewChips={false}
          chipLabelKey="postcode"
          suggestionLabelKey="postcode"
          chipSource={(searchTerm) => {
            if (searchTerm.length < 2) return [];

            return api
              .constituentsSearch(
                {
                  distinct: true,
                  columnsToReturn: ["postcode"],
                  term: searchTerm,
                },
                modalActions,
                iln
              )
              .then((postcodes) =>
                postcodes.map(({ postcode }) => ({
                  postcode,
                  id: postcode,
                }))
              );
          }}
        />
      )}
    </div>
  );
};

CasesTownSelect.propTypes = propTypes;

export default CasesTownSelect;
