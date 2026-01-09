import { ButtonBar } from "@electedtech/electedtech-ui";
import DeleteCase from "../DeleteCase/DeleteCase.jsx";
import ManageCasePermissions from "../ManageCasePermissions/ManageCasePermissions.jsx";
import MergeCase from "../MergeCase/MergeCase.jsx";
import MoveCase from "../MoveCase/MoveCase.jsx";
import React from "react";
import { allowPermissionSystem } from "../../../../../consts/disabledFeatures";
import propTypes from "./CaseActionsButtonBar.propTypes";
import { useReduxSlice } from "./CaseActionsButtonBar.redux";

const permissionSystem = allowPermissionSystem;

const CaseActionsButtonBar = ({ casesWithEditPermission = [], collapse }) => {
  const { setConstituent, caseDetails, casePermissions } = useReduxSlice();

  return (
    <ButtonBar
      alignDropDownRight
      collapsedButtonTitle={"Update"}
      collapse={collapse}
      dropShadow={false}
      size="small"
    >
      {casePermissions?.delete && (
        <DeleteCase
          caseID={caseDetails.id}
          constituentID={caseDetails.constituentID}
        />
      )}
      {casePermissions?.edit && (
        <React.Fragment>
          {casesWithEditPermission.length >= 1 && (
            <MergeCase
              caseID={caseDetails.id}
              cases={casesWithEditPermission}
            />
          )}
          <MoveCase
            caseID={caseDetails.id}
            constituentID={caseDetails.constituentID}
            setCaseConstituent={setConstituent}
          />
        </React.Fragment>
      )}
      {permissionSystem && casePermissions?.edit && <ManageCasePermissions />}
    </ButtonBar>
  );
};

CaseActionsButtonBar.propTypes = propTypes;

export default CaseActionsButtonBar;
