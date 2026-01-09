import { useEffect, useState } from "react";

import getAllCases from "../../../../helpers/getAllCases";

const resultsPerPage = 1000;

const useGetAllCases = (state) => {
  const [allCases, setAllCases] = useState();
  const [pagesLoaded, setPagesLoaded] = useState(0);

  const totalResults = state.results.totalResults || 0;
  const pagesToLoad = Math.ceil(totalResults / resultsPerPage);

  useEffect(() => {
    getAllCases(state, () => setPagesLoaded((loaded) => loaded + 1)).then(
      (allResults) => setAllCases(allResults)
    );
  }, [state.filters]);

  return {
    percentLoaded: Math.round((pagesLoaded / pagesToLoad) * 100),
    allCases,
  };
};

export default useGetAllCases;
