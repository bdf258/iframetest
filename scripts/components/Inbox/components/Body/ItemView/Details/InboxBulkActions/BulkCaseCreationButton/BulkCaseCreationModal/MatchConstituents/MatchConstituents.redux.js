import { dispatchUpdateItem } from "../../../../../../../../slice/inboxSlice";
import { useDispatch } from "react-redux";

const useReduxSlice = () => {
  const dispatch = useDispatch();
  const updateItem = (updatedItem) => dispatch(dispatchUpdateItem(updatedItem));

  return { updateItem };
};

export default useReduxSlice;
