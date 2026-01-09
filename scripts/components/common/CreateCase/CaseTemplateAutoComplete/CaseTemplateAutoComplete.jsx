import { AutoComplete } from "@electedtech/electedtech-ui";
import React from "react";
import api from "@electedtech/api";
import propTypes from "./CaseTemplateAutoComplete.propTypes.js";
import { userIdentity } from "../../../../helpers/localStorageHelper";

const CaseTemplatesAutoComplete = ({ onTemplateSelect, ...props }) => {
  return (
    <AutoComplete
      placeholder="Search for a case template"
      dataSource={(searchText, signal) =>
        api.searchCaseTemplates(
          {
            term: searchText,
            pageNo: 1,
            resultsPerPage: 250,
            columnsToReturn: ["name", "id"],
          },
          undefined,
          undefined,
          signal
        )
      }
      onResultClick={({ id: templateID }) =>
        api
          .getCaseTemplate(templateID)
          .then(({ template: { assignedTo, ...template } }) =>
            onTemplateSelect({
              ...template,
              assignedTo:
                assignedTo === "creator" ? userIdentity.id : assignedTo,
            })
          )
      }
      clearInputOnResultClick
      labelKey="name"
      {...props}
    />
  );
};

CaseTemplatesAutoComplete.propTypes = propTypes;

export default CaseTemplatesAutoComplete;
