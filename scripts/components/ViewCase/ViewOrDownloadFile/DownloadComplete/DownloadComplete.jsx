import React, { useContext, useEffect } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import OperationCompletedModal from "../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";

const DownloadComplete = ({ downloadOnMount, modalID }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => downloadOnMount(), []);

  return (
    <OperationCompletedModal
      message={iln.gettext("Download Successful")}
      handleDone={() => modalActions.removeById(modalID)}
    />
  );
};

DownloadComplete.propTypes = propTypes;

export default DownloadComplete;
