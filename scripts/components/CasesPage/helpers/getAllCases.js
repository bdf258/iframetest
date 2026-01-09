import api from "@electedtech/api";
const resultsPerPage = 1000;

const constituentColumns = [
  "id",
  "title",
  "firstname",
  "surname",
  "lat",
  "lng",
  "organisationName",
  "isOrganisation",
];

const getAllCases = (
  state,
  onEachPageLoad,
  constituentColumnsToReturn = constituentColumns
) => {
  const totalResults = state.results.totalResults || 0;
  const pagesToLoad = Math.ceil(totalResults / resultsPerPage);

  const calls = [...Array(pagesToLoad)].map((_, index) =>
    api
      .searchCases({
        ...state.filters,
        pageNo: index + 1,
        resultsPerPage,
        columnsToReturn: {
          ...state.filters.columnsToReturn,
          case: [...state.filters.columnsToReturn.case, "summaryFull"],
          constituent: constituentColumnsToReturn,
        },
      })
      .then((result) => {
        onEachPageLoad && onEachPageLoad();
        return result;
      })
  );

  return Promise.all(calls).then((allResults) =>
    allResults.reduce((all, { cases }) => [...all, ...cases], [])
  );
};

export default getAllCases;
