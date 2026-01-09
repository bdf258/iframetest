import { selectItemsTotal } from "../../../../slice/inboxSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const itemsTotal = useSelector(selectItemsTotal);
  return { itemsTotal };
};
