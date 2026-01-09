import React, { useContext } from "react";
import {
  customFieldBlocks,
  customFields,
} from "../../../helpers/localStorageHelper";

import CustomBlocksForDisplay from "./CustomBlocksForDisplay/CustomBlocksForDisplay.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./CustomBlocks.propTypes";
import { useCustomBlocksForDisplayAsInputs } from "../../common/CustomFields/hooks/useCustomBlocksForDisplayAsInputs";
import { useReduxSlice } from "./CustomBlocks.redux";

const CustomBlocks = ({ customClassNames }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const {
    caseDetails = {},
    customFieldValues,
    updateCustomBlock,
  } = useReduxSlice();

  const { id: caseId, status, category } = caseDetails;

  const [customBlocksAsInputs] = useCustomBlocksForDisplayAsInputs(
    customFields,
    customFieldBlocks,
    customFieldValues,
    category,
    status
  );

  const handleUpdateCustomBlock = (customBlock) => {
    updateCustomBlock({ ...customFieldValues, ...customBlock });
    api.updateCase(
      caseId,
      { customFields: { ...customFieldValues, ...customBlock } },
      modalActions,
      iln
    );
  };

  if (!customFieldValues || !caseDetails || !caseDetails?.category) {
    return null;
  }

  return (
    <CustomBlocksForDisplay
      customClassNames={customClassNames}
      customBlocksAsInputs={customBlocksAsInputs}
      onChange={(customBlock) => handleUpdateCustomBlock(customBlock)}
    />
  );
};

CustomBlocks.propTypes = propTypes;

export default CustomBlocks;
