import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./MergeTypeSelector.propTypes.js";
import useStyles from "./MergeTypeSelector.styles.js";

const MergeTypeSelector = ({ mergeTypeOptions, ...props }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <FormSelect
      {...props}
      customClassNames={{ container: classes.container }}
      keepErrorSpacing={false}
      name="mergeType"
    >
      {[
        <option key="merge" value="merge">
          {iln.gettext("Merge into:")}
        </option>,
        <option key="add" value="add">
          {iln.gettext("Add to")}
        </option>,
      ].filter(({ key }) => mergeTypeOptions.includes(key))}
    </FormSelect>
  );
};

MergeTypeSelector.propTypes = propTypes;

export default MergeTypeSelector;
