import { dispatchRemoveItems } from "../../../../../../../../slice/inboxSlice";
import { useDispatch } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  return {
    removeItems: (items) => dispatch(dispatchRemoveItems(items)),
  };
};
