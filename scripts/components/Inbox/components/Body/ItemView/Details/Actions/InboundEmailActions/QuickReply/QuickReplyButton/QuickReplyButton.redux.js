import { dispatchRemoveItems } from "../../../../../../../../slice/inboxSlice";
import { useDispatch } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const removeItem = (item) => dispatch(dispatchRemoveItems(item));

  return { removeItem };
};
