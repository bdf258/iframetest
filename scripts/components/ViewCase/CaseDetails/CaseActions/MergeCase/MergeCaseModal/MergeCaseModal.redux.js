import { dispatchSetCasenotes } from "../../../../slice/viewCaseSlice";
import { useDispatch } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const setCasenotes = (casenotes) => dispatch(dispatchSetCasenotes(casenotes));

  return {
    clearCasenotes: () => setCasenotes([]),
  };
};
