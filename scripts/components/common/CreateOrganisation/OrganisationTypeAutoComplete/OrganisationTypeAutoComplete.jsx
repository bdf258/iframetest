import React, { useContext, useEffect, useState } from "react";

import { AutoComplete } from "@electedtech/electedtech-ui";
import TranslationContext from "context/translate";
import api from "@electedtech/api";
import propTypes from "./OrganisationTypeAutoComplete.propTypes.js";
import useStyles from "./OrganisationTypeAutoComplete.styles.js";

const OrganisationTypeAutoComplete = ({
  value,
  setValue,
  organisationTypes: _organisationTypes,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [organisationTypes, setOrganisationTypes] =
    useState(_organisationTypes);

  useEffect(() => {
    if (!_organisationTypes)
      api
        .getOrganisationTypes()
        .then((organisationTypes) => setOrganisationTypes(organisationTypes));
  }, []);

  return (
    <AutoComplete
      name="OrganisationType"
      externalInputValue={value}
      keepErrorSpacing={false}
      label={iln.gettext("Org Type")}
      onInputChange={(value) => setValue(value)}
      onResultClick={({ label }) => setValue(label)}
      showAllResultsOnFocus
      showAllResultsWhenEmpty
      dataSource={(organisationTypes || []).map((ot) => ({
        label: ot,
        id: ot,
      }))}
      customClassNames={{ container: classes.container }}
    />
  );
};

OrganisationTypeAutoComplete.propTypes = propTypes;

export default OrganisationTypeAutoComplete;

// Make create constituent / organ different buttons
// remove "create constituent instead?"
