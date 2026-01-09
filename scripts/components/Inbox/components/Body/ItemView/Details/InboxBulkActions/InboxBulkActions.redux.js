import {
  selectDeletableItems,
  selectFilterInboxType,
  selectItemsAssignedToCase,
  selectItemsWithoutCase,
  selectSelectedItems,
} from "../../../../../slice/inboxSlice";

import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const selectedItems = useSelector(selectSelectedItems);
  const itemsAssignedToCase = useSelector(selectItemsAssignedToCase);
  const itemsWithoutCase = useSelector(selectItemsWithoutCase);
  const deletableItems = useSelector(selectDeletableItems);
  const inboxType = useSelector(selectFilterInboxType);

  return {
    selectedItems,
    itemsAssignedToCase,
    itemsWithoutCase,
    deletableItems,
    inboxType,
  };
};
