import { ModalContext, Placeholder } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import CaseActionsButtonBar from "./CaseActionsButtonBar/CaseActionsButtonBar.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { useReduxSlice } from "./CaseActions.redux.js";
import { useStyles } from "./styles";
import { useTheme } from "theming";

const CaseActions = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const theme = useTheme();
  const classes = useStyles(theme);
  const [casesWithEditPermission, setCasesWithEditPermission] = useState();
  const { constituent, caseID } = useReduxSlice();

  useEffect(() => {
    constituent?.id &&
      api
        .searchCases(
          {
            pageNo: 1,
            resultsPerPage: 999,
            return: "columns",
            columnsToReturn: {
              case: ["id", "caseType"],
              constituent: [],
            },
            constituentCriteria: { id: [constituent.id] },
          },
          modalActions,
          iln
        )
        .then(({ cases }) =>
          setCasesWithEditPermission(
            cases.filter((c) => c.userPermissions.edit && c.id !== caseID)
          )
        )
        .catch(() => setCasesWithEditPermission([]));
  }, [constituent]);

  if (!casesWithEditPermission) return <Placeholder width={600} height={28} />;

  return (
    <React.Fragment>
      <div className={classes.caseActionButtonContainer}>
        <CaseActionsButtonBar
          collapse={false}
          casesWithEditPermission={casesWithEditPermission}
        />
      </div>
      <div className={classes.caseActionButtonContainerCollapse}>
        <CaseActionsButtonBar
          collapse={true}
          casesWithEditPermission={casesWithEditPermission}
        />
      </div>
    </React.Fragment>
  );
};

export default CaseActions;
