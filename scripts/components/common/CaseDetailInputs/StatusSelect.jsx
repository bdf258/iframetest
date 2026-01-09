import React, { useContext, useMemo } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";
import { statusTypes as statusTypesFromLocalStorage } from "../../../helpers/localStorageHelper";

const useStyles = createUseStyles({
  removeMargin: {
    margin: 0,
  },
});

const StatusSelect = ({
  onChange,
  name,
  label = "Status",
  customClassNames = {},
  keepErrorSpacing = false,
  value,
  includeCloseAndMarkActioned,
  selectedCategoryId,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const statusTypes = useMemo(() => {
    if (!statusTypesFromLocalStorage) return [];

    const globalStatusTypes = statusTypesFromLocalStorage.filter(
      (statusType) => statusType.categorytypeID === 0
    );

    if (!selectedCategoryId) return globalStatusTypes;

    const statusesForCategory = statusTypesFromLocalStorage.filter(
      ({ categorytypeID }) => categorytypeID === selectedCategoryId
    );

    return [...globalStatusTypes, ...statusesForCategory];
  }, [selectedCategoryId]);

  return (
    <FormSelect
      value={value || statusTypes[0]?.id || ""}
      onChange={(e) => {
        onChange(e);
      }}
      name={name}
      label={iln.gettext(label)}
      keepErrorSpacing={keepErrorSpacing}
      customClassNames={{
        select: customClassNames.select,
        label: customClassNames.label,
        container: classnames(classes.removeMargin, customClassNames.container),
      }}
    >
      {statusTypes.map((st) => (
        <option key={st.id} value={st.id}>
          {st.statustype}
        </option>
      ))}
      {includeCloseAndMarkActioned && (
        <option value="closeAndMarkActioned">
          {iln.gettext("Close and Mark as Actioned")}
        </option>
      )}
    </FormSelect>
  );
};

StatusSelect.propTypes = {
  customClassNames: propTypes.shape({
    container: propTypes.string,
    label: propTypes.string,
    select: propTypes.string,
  }),
  includeCloseAndMarkActioned: propTypes.bool,
  keepErrorSpacing: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  selectedCategoryId: propTypes.oneOfType([propTypes.string, propTypes.number]),
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
};

export default StatusSelect;
