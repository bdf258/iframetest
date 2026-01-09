import {
  dispatchSetCaseDetails,
  dispatchSetCasePermissions,
  selectCaseDetails,
} from "../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { useContext } from "react";
import { useReduxSlice } from "../../ViewCasePage.redux";
import getPermissions from "../../helpers/getPermissions";
import { caseworkerID } from "../../../../helpers/localStorageHelper";

const convertForBackend = (change) => {
  if ("tags" in change) {
    change.tags = change.tags.map((t) => t.id);
  }

  if ("reviewDate" in change) {
    const reviewDate = change.reviewDate;
    change.reviewDate =
      Array.isArray(reviewDate) && reviewDate.length > 0 ? reviewDate[0] : "";
  }

  return change;
};

const useUpdateCaseDetails = () => {
  const { setCaseworkers } = useReduxSlice();
  const dispatch = useDispatch();
  const setCaseDetails = (details) => dispatch(dispatchSetCaseDetails(details));
  const setCasePermissions = (permissions) => dispatch(dispatchSetCasePermissions(permissions));
  const caseDetails = useSelector(selectCaseDetails);

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return ({ target: { name, value } }) => {
    const change = { [name]: value };
    setCaseDetails({ ...caseDetails, ...change });
    
    // If restrictions are being updated, recalculate permissions
    if (name === "restrictions") {
      api.getOwnGroups().then((groups) => {
        const newPermissions = getPermissions(groups, caseworkerID, value);
        setCasePermissions(newPermissions);
      });
    }
    
    api
      .updateCase(caseDetails.id, convertForBackend(change), modalActions, iln)
      .then(() => {
        api
          .getCaseworkersForCase(caseDetails.id)
          .then((res) => setCaseworkers(res));
      });
  };
};

export default useUpdateCaseDetails;
