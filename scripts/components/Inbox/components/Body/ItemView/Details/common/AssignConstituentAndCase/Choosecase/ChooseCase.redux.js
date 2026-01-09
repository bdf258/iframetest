import { dispatchUpdateItem } from "../../../../../../../slice/inboxSlice";
import { useDispatch } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  return {
    updateItem: (update) => dispatch(dispatchUpdateItem(update)),
  };
};
