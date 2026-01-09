import { selectFilterInboxType } from "../../../../../slice/inboxSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const inboxType = useSelector(selectFilterInboxType);

  return {
    inboxType,
  };
};
