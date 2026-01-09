import api from "@electedtech/api";

const useMergeConstituents = (
  constituent,
  selection,
  precedence,
  modalActions,
  setFetching
) => {
  return () => {
    api
      .mergeConstituents(
        constituent.id,
        selection.constituent.id,
        precedence,
        modalActions
      )
      .then(
        (response) =>
          (window.location.href = `/viewconstituent.php?constituentID=${response.redirect}`)
      )
      .finally(() => setFetching(false));
  };
};

export default useMergeConstituents;
