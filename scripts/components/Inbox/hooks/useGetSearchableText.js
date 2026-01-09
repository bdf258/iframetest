import {
  selectFilterContainsType,
  selectFilterContainsValue,
} from "../slice/inboxSlice";

import highlightMatchingText from "../components/Body/ItemView/Details/Subject/helpers/highlightMatchingText";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useGetSearchableText = (
  text,
  filterType,
  highlightMatchingTextOptions
) => {
  {
    const selectedFilterType = useSelector(selectFilterContainsType);
    const selectedFilterValue = useSelector(selectFilterContainsValue);

    const toRender = useMemo(() => {
      if (!text) return null;

      return selectedFilterType === filterType &&
        selectedFilterValue.length >= 2 &&
        selectedFilterValue.trim() !== ""
        ? highlightMatchingText(
            selectedFilterValue,
            text,
            highlightMatchingTextOptions
          )
        : text;
    }, [selectedFilterType, selectedFilterValue, text]);

    return toRender;
  }
};

export default useGetSearchableText;
