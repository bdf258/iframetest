import defaultCaseDetails from "../../../../consts/initCaseDetails";
import { getLastCreatedCase } from "../../../../helpers/localStorageHelper";
import { useState } from "react";

const useCaseDetails = () => {
  const lastCreatedCase = getLastCreatedCase() || {};

  // removed unwanted details
  delete lastCreatedCase.tagged;
  delete lastCreatedCase.summary;
  delete lastCreatedCase.reviewDate;
  delete lastCreatedCase.relatesTo;

  return useState({
    ...defaultCaseDetails,
    ...lastCreatedCase,
  });
};

export default useCaseDetails;
