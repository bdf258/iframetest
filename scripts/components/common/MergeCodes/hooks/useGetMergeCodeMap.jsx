import { useEffect, useState } from "react";
import { getMergeCodeMap } from "../util/mergeCodes";

const useGetMergeCodeMap = ({
  constituentDetails,
  recipientDetails,
  additionalMergeCodes = [],
  caseRef,
  type,
  iln,
}) => {
  const [mergeCodeMap, setMergeCodeMap] = useState();

  useEffect(() => {
    if (constituentDetails) {
      setMergeCodeMap(
        getMergeCodeMap({
          constituent: constituentDetails,
          recipient: recipientDetails,
          additionalMergeCodes,
          caseRef: caseRef,
          type,
          iln,
        })
      );
    }
  }, [constituentDetails, recipientDetails]);
  return [mergeCodeMap];
};

export default useGetMergeCodeMap;
