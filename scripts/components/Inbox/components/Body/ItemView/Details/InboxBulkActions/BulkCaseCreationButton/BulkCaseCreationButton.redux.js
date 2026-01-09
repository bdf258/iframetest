import { selectFilterInboxType } from "../../../../../../slice/inboxSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const viewingType = useSelector(selectFilterInboxType);

  return { viewingType };
};
