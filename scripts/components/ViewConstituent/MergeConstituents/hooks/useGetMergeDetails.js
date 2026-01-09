import api from "@electedtech/api";

const useGetMergeDetails = (constituentID, setMergeDetails, modalActions) => {
  return () => {
    api.getMergeDetails(constituentID, modalActions).then((mergeDetails) => {
      setMergeDetails(mergeDetails);
    });
  };
};
export default useGetMergeDetails;
