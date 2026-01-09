import {
  dispatchRemoveSelectedNote,
  selectCaseDetails,
  selectCasePermissions,
  selectCasenotes,
  selectCaseworkers,
  selectConstituent,
  selectCustomFields,
  selectSelectedCaseNote,
} from "../slice/viewCaseSlice";

import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const caseworkers = useSelector(selectCaseworkers);
  const caseDetails = useSelector(selectCaseDetails);
  const casenotes = useSelector(selectCasenotes);
  const constituent = useSelector(selectConstituent);
  const casePermissions = useSelector(selectCasePermissions);
  const selectedNote = useSelector(selectSelectedCaseNote);
  const removeSelectedNote = () => dispatch(dispatchRemoveSelectedNote());
  const customFieldValues = useSelector(selectCustomFields);

  return {
    caseworkers,
    caseDetails,
    casenotes,
    constituent,
    casePermissions,
    selectedNote,
    removeSelectedNote,
    customFieldValues,
  };
};
