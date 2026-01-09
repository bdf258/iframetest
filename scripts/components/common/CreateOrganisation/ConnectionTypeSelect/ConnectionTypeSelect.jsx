import React, { useContext, useEffect, useState } from "react";

import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import TranslationContext from "context/translate";
import api from "@electedtech/api";
import propTypes from "./ConnectionTypeSelect.propTypes.js";
import useStyles from "./ConnectionTypeSelect.styles.js";

const ConnectionTypeSelect = ({
  value,
  setValue,
  connectionTypes: _connectionTypes,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [connectionTypes, setConnectionTypes] = useState(_connectionTypes);

  useEffect(() => {
    if (!_connectionTypes)
      api
        .getConnectionTypes()
        .then((connTypes) => setConnectionTypes(connTypes));
  }, []);

  return (
    <FormSelectAutoComplete
      name="connectionType"
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
      keepErrorSpacing={false}
      label={iln.gettext("Conn Type")}
      showAllResultsOnFocus
      showAllResultsWhenEmpty
      customClassNames={{ container: classes.container }}
    >
      {(connectionTypes || []).map(({ id, connectionType }) => (
        <option key={id} value={id}>
          {connectionType}
        </option>
      ))}
    </FormSelectAutoComplete>
  );
};

ConnectionTypeSelect.propTypes = propTypes;

export default ConnectionTypeSelect;
