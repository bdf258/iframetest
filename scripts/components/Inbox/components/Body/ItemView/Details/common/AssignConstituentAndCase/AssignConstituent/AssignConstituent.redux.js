import { selectFocusedItem } from "../../../../../../../slice/inboxSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const focusedItem = useSelector(selectFocusedItem);
  return { focusedItem };
};
