import { dispatchAddCasenote } from "../slice/viewCaseSlice";
import { useDispatch } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const addCasenote = (casenote) => dispatch(dispatchAddCasenote(casenote));

  return {
    addCasenote,
  };
};
