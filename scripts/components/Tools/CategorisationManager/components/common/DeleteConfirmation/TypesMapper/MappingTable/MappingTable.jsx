import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import MergeTypeSelector from "./MergeTypeSelector/MergeTypeSelector.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./MappingTable.propTypes.js";
import useStyles from "./MappingTable.styles.js";

const MappingTable = ({ deleteItem, mergeItem, mapping, onChange }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr>
          <td>{mergeItem.categorytype || mergeItem.categorytype}</td>
          <td>{iln.gettext("Method")}</td>
          {Object.values(mapping).some(
            ({ mergeType }) => mergeType === "merge"
          ) && <td>{deleteItem.categorytype || deleteItem.categorytype}</td>}
        </tr>
      </thead>
      <tbody>
        {Object.keys(mapping).map((key) => {
          const {
            casetype,
            statustype,
            mergeType,
            mergeTypeOptions,
            options,
            value,
          } = mapping[key];

          return (
            <tr key={key}>
              <td>{casetype || statustype}</td>
              <td
                colSpan={
                  !Object.values(mapping).some(
                    ({ mergeType }) => mergeType === "merge"
                  )
                    ? 2
                    : 1
                }
              >
                <MergeTypeSelector
                  value={mergeType}
                  mergeTypeOptions={mergeTypeOptions}
                  onChange={({ target: { value } }) =>
                    onChange({
                      ...mapping,
                      [key]: {
                        ...mapping[key],
                        mergeType: value,
                        value: undefined,
                      },
                    })
                  }
                />
              </td>
              {mergeType === "merge" && (
                <td>
                  <FormSelect
                    name="selectedType"
                    onChange={({ target: { value } }) =>
                      onChange({
                        ...mapping,
                        [key]: { ...mapping[key], value },
                      })
                    }
                    value={value}
                    keepErrorSpacing={false}
                    customClassNames={{
                      container: classes.optionInputContainer,
                      input: classes.inputInput,
                    }}
                  >
                    {options.map(({ id, casetype, statustype }) => (
                      <option key={id} value={id}>
                        {casetype || statustype}
                      </option>
                    ))}
                  </FormSelect>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

MappingTable.propTypes = propTypes;

export default MappingTable;
