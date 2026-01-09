import {
  dispatchSetCaseDetails,
  selectCaseDetails,
} from "../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { useContext } from "react";

const useUpdateMultipleCaseDetails = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const dispatch = useDispatch();
  const caseDetails = useSelector(selectCaseDetails);
  const setCaseDetails = (details) => dispatch(dispatchSetCaseDetails(details));

  const updateCaseDetails = (caseDetailsToUpdate) => {
    api
      .updateCase(caseDetails.id, caseDetailsToUpdate, modalActions, iln)
      .then(() => {
        setCaseDetails({ ...caseDetails, ...caseDetailsToUpdate });
      });
  };

  return [updateCaseDetails];
};

export default useUpdateMultipleCaseDetails;
