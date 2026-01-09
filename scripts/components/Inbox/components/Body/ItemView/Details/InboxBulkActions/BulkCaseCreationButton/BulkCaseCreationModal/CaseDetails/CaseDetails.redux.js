import { selectCaseworkers } from "../../../../../../../../slice/inboxSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const caseworkers = useSelector(selectCaseworkers);

  return {
    caseworkers,
  };
};
