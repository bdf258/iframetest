import { AutoComplete, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import TranslationContext from "../../../context/translation/TranslationContext";
import propTypes from "./SuburbSearch.propTypes";
import { suburbSearch } from "../../../api/src/location";

const SuburbSearch = ({
  label = "Town",
  customClassNames,
  handleResultSelected,
  value,
  onChange,
  clearInputOnBlur,
  keepErrorSpacing,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  return (
    <AutoComplete
      name="town"
      externalInputValue={value}
      onInputChange={(text) =>
        onChange({ target: { name: "town", value: text } })
      }
      customClassNames={customClassNames}
      label={label}
      dataSource={(term) =>
        suburbSearch({ term }, modalActions, iln).then((res) => {
          return res.map((res) => ({
            label: res.value.locality_name,
            value: res.value,
          }));
        })
      }
      clearInputOnBlur={clearInputOnBlur}
      onResultClick={handleResultSelected}
      keepErrorSpacing={keepErrorSpacing}
    />
  );
};

SuburbSearch.propTypes = propTypes;
export default SuburbSearch;
