import { useEffect } from "react";
import useGetNextCasenotesPage from "./useGetNextCasenotesPage";

const useLoadAllCasenotes = ({ casenotes, hasMore }) => {
  const getNextCasenotesPage = useGetNextCasenotesPage();

  useEffect(() => {
    // loops until all casenotes are loaded
    hasMore && getNextCasenotesPage();
  }, [casenotes.length]);
};

export default useLoadAllCasenotes;
