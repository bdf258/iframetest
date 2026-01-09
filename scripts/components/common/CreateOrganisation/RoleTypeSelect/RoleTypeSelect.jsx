import React, { useContext, useEffect, useState } from "react";

import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import TranslationContext from "context/translate";
import api from "@electedtech/api";
import propTypes from "./RoleTypeSelect.propTypes.js";
import useStyles from "./RoleTypeSelect.styles.js";

const RoleTypeSelect = ({ value, setValue, roleTypes: _roleTypes }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [roleTypes, setRoleTypes] = useState(_roleTypes);

  useEffect(() => {
    if (!_roleTypes) api.getRoleTypes().then((types) => setRoleTypes(types));
  }, []);

  return (
    <FormSelectAutoComplete
      name="roleType"
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
      keepErrorSpacing={false}
      label={iln.gettext("Role Type")}
      showAllResultsOnFocus
      showAllResultsWhenEmpty
      customClassNames={{ container: classes.container }}
    >
      {(roleTypes || []).map((roleType) => (
        <option key={roleType} value={roleType}>
          {roleType}
        </option>
      ))}
    </FormSelectAutoComplete>
  );
};

RoleTypeSelect.propTypes = propTypes;

export default RoleTypeSelect;
