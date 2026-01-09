import {
  dispatchRemoveSelectedNote,
  dispatchSetSelectedNote,
  selectCaseDetails,
  selectCaseId,
  selectConstituent,
  selectContactTypes,
  selectCustomFields,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const constituent = useSelector(selectConstituent);
  const contactTypes = useSelector(selectContactTypes);
  const caseId = useSelector(selectCaseId);
  const customFieldValues = useSelector(selectCustomFields);
  const caseDetails = useSelector(selectCaseDetails);

  return {
    setSelectedNote: (noteId) => dispatch(dispatchSetSelectedNote(noteId)),
    removeSelectedNote: () => dispatch(dispatchRemoveSelectedNote()),
    constituent,
    contactTypes,
    caseId,
    customFieldValues,
    caseDetails,
  };
};
