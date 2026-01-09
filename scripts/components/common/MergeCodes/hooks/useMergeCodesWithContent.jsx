import { useEffect, useState } from "react";
import { customFieldsAsMergeCodeMap } from "../util/customFieldsAsMergeCodeMap";
import { getMergeCodeMap } from "../util/mergeCodes";
import { getMergeCodes } from "../util/mergeCodeListForDisplay";
import { installationPreferences } from "../../../../helpers/localStorageHelper";
import leftPadWithZeros from "../../../../helpers/leftPadWithZeros";

const getCaseRef = (caseId) => {
  const caseRef = installationPreferences.casePrefix;
  return leftPadWithZeros(caseId, 5, caseRef);
};

const mergeCodesWithContent = ({
  constituent,
  recipient,
  additionalMergeCodes,
  caseRef,
  type,
  iln,
}) => {
  const mergeCodeMap = getMergeCodeMap({
    constituent,
    recipient,
    additionalMergeCodes: customFieldsAsMergeCodeMap(additionalMergeCodes),
    caseRef,
    type,
    iln,
  });

  const displayBarcode = !!constituent?.DPID;

  return getMergeCodes({ type, displayBarcode, additionalMergeCodes, iln }).map(
    (mergeCodeForDisplay) => {
      const mergeCodeContent = mergeCodeMap.get(mergeCodeForDisplay.mergeCode);
      return { ...mergeCodeForDisplay, disabled: !mergeCodeContent };
    }
  );
};

const useMergeCodesWithContent = ({
  constituent,
  recipient,
  additionalMergeCodes,
  caseId,
  type,
  iln,
}) => {
  const [mergeCodesForDisplay, setMergeCodesForDisplay] = useState();

  useEffect(() => {
    if (constituent && caseId && type) {
      setMergeCodesForDisplay(
        mergeCodesWithContent({
          constituent,
          recipient,
          additionalMergeCodes,
          caseRef: getCaseRef(caseId),
          type,
          iln,
        })
      );
    }
  }, [constituent, recipient]);

  return [mergeCodesForDisplay];
};

export default useMergeCodesWithContent;
