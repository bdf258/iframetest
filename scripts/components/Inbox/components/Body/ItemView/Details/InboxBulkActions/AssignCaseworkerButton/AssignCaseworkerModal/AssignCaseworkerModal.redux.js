import {
  dispatchRemoveItems,
  selectCaseworkers,
  selectFilterCaseworkerID,
} from "../../../../../../../slice/inboxSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { TranslationContext } from "context/translate";
import { unassignedId } from "../../../../../../../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import { useContext } from "react";

export const useReduxSlice = () => {
  const caseworkers = useSelector(selectCaseworkers);
  const iln = useContext(TranslationContext);

  const dispatch = useDispatch();

  const filterInboxCaseworkerID = useSelector(selectFilterCaseworkerID);
  const removeInboxItems = (itemsToRemove) =>
    dispatch(dispatchRemoveItems(itemsToRemove));

  return {
    removeInboxItems,
    filterInboxCaseworkerID,
    caseworkers: [
      { id: "undefined", active: true, name: "" },
      { id: unassignedId, active: true, name: iln.gettext("Unassigned") },
      ...caseworkers,
    ],
  };
};
