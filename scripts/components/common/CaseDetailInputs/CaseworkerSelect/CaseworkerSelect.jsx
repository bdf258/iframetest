import { FormSelect, Placeholder } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import classnames from "classnames";
import filterCaseworkers from "../../../../helpers/filterCaseworkers";
import { getQueryStringParamMap } from "../../../../helpers/queryString";
import { caseworkers as localStorageCaseworkers } from "../../../../helpers/localStorageHelper";
import propTypes from "./CaseworkerSelect.propTypes";
import { sortCaseworkersAlphabetically } from "../../../CasesPage/helpers/sortCaseworkersAlphabetically";
import { useInactiveAssignedCaseworker } from "./hooks/useInactiveAssignedCaseworker";
import { useStyles } from "./CaseworkerSelect.styles";

const caseID = parseInt(getQueryStringParamMap().get("caseID"));

const getCaseworkers = () =>
  caseID ? api.getCaseworkersForCase(caseID) : api.getCaseworkers();

export const creatorId = "creator";
export const unassignedId = "0";

const CaseworkerSelect = ({
  onChange,
  name,
  label,
  customClassNames = {},
  keepErrorSpacing = false,
  caseworkers,
  includeCreatorOption,
  value = localStorageCaseworkers[1].ID,
  includeUnassignedOption,
  size,
  includeInactiveAssignedCaseworker = false,
  includeCanvassingCaseworker=true
}) => {
  const classes = useStyles();
  const [options, setOptions] = useState(caseworkers || undefined);
  const iln = useContext(TranslationContext);

  const [inactiveAssignedCaseworker] = useInactiveAssignedCaseworker(
    caseworkers,
    value
  );

  const includeUnknownOption = ![
    ...(options || []).map(({ id }) => id),
    creatorId,
    inactiveAssignedCaseworker?.id,
    unassignedId,
  ].includes(value + "");

  //changing all Ids to string
  const convertIdsToString = (caseworkers) =>
    caseworkers
      .filter((cw) => cw.active == "1")
      .map((cw) => ({ ...cw, id: cw.id + "" }));

  useEffect(() => {
    // if caseworkers is passed in as a prop, no need to call api
    !caseworkers
      ? getCaseworkers()
          .then((response) =>
            setOptions(
              convertIdsToString(sortCaseworkersAlphabetically([...response]))
            )
          )
          .catch(() => setOptions([]))
      : setOptions(
          convertIdsToString(sortCaseworkersAlphabetically([...caseworkers]))
        );
  }, [caseworkers]);
  !includeCreatorOption;

  if (!options)
    return (
      <Placeholder className={classes.placeholder} height={32} width="100%" />
    );

  return (
    <FormSelect
      value={value + ""}
      onChange={(e) => {
        onChange(e);
      }}
      name={name}
      label={label === null ? undefined : label || iln.gettext("Assigned To")}
      keepErrorSpacing={keepErrorSpacing}
      size={size}
      customClassNames={{
        select: customClassNames.select,
        label: customClassNames.label,
        container: classnames(classes.removeMargin, customClassNames.container),
      }}
    >
      {includeCreatorOption && (
        <option value={creatorId}>{iln.gettext("Creator of Case")}</option>
      )}
      {includeUnassignedOption && (
        <option value={unassignedId}>{iln.gettext("Unassigned")}</option>
      )}
      {includeInactiveAssignedCaseworker && inactiveAssignedCaseworker && (
        <option value={inactiveAssignedCaseworker.id}>
          {inactiveAssignedCaseworker.name}
        </option>
      )}
      {filterCaseworkers(options, includeCanvassingCaseworker).map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
      {includeUnknownOption && (
        <option value={value + ""}>{iln.gettext("Unknown")}</option>
      )}
    </FormSelect>
  );
};

CaseworkerSelect.propTypes = propTypes;

export default CaseworkerSelect;
