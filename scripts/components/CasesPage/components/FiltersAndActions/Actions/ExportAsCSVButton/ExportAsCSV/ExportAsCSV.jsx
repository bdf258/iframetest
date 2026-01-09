import { ModalContext, Step, Stepper } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ExportCSVForm from "./ExportCSVForm/ExportCSVForm.jsx";
import OperationCompletedModal from "../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import SubmitButton from "./SubmitButton/SubmitButton.jsx";
import { TranslationContext } from "context/translate";
import defaultOptions from "./consts/defaultOptions.js";
import { getExportCsvFields } from "../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./ExportAsCSV.propTypes.js";
import useStyles from "./ExportAsCSV.styles.js";

const lastExportOptions = getExportCsvFields() || {};

const ExportAsCSV = ({ state, modalID }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [options, setOptions] = useState({
    ...defaultOptions,
    ...lastExportOptions,
  });
  const [step, setStep] = useState(0);

  return (
    <div className={classes.exportAsCSV}>
      <Stepper step={step}>
        <Step>
          <ExportCSVForm
            options={options}
            setOptions={setOptions}
            state={state}
          />
          <SubmitButton
            options={options}
            state={state}
            onSubmit={() => setStep(1)}
          />
        </Step>
        <Step>
          <OperationCompletedModal
            buttonAlignment="center"
            handleDone={() => modalActions.removeById(modalID)}
            message={iln.gettext(
              "Download started - check your browser's download folder"
            )}
          />
        </Step>
      </Stepper>
    </div>
  );
};

ExportAsCSV.propTypes = propTypes;

export default ExportAsCSV;
