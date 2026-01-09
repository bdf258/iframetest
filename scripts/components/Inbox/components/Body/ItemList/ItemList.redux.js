import {
  dispatchUpdateInboxFilters,
  selectFilterPage,
  selectHasMore,
  selectItems,
  selectItemsLoading,
} from "../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const itemsLoading = useSelector(selectItemsLoading);
  const hasMore = useSelector(selectHasMore);
  const page = useSelector(selectFilterPage);
  const updateFilters = (page) => dispatch(dispatchUpdateInboxFilters(page));

  return { items, itemsLoading, hasMore, page, updateFilters };
};
