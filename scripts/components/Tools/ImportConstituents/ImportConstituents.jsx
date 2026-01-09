import { Heading, Stepper } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import ConfirmImportDetails from "./components/ConfirmImportDetails";
import ImportForm from "./components/ImportForm";
import IngestCSV from "./components/IngestCSV";
import { TranslationContext } from "context/translate";
import UploadingConstituents from "./components/UploadingConstituents";
import initCaseDetails from "../../../consts/initCaseDetails";
import { useStyles } from "./importConstituents.style";
import { useTheme } from "react-jss";

const ImportConstituents = () => {
  const iln = useContext(TranslationContext);

  const initFormState = {
    caseDetails: initCaseDetails,
    keepExistingContactDetails: "",
    firstLineHeader: "",
    addReviewFlag: "",
    flags: [],
    createCases: "",
  };

  const [step, setStep] = useState(0);

  const [ingestConfig, setIngestConfig] = useState();
  const [formData, setFormData] = useState(initFormState);

  const [valid, setValid] = useState(false);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const reset = () => {
    setFormData(initFormState);
    setStep(0);
  };

  useEffect(() => {
    const valuesToCheck = [
      "firstLineHeader",
      "keepExistingContactDetails",
      "addReviewFlag",
      "file",
      "createCases",
    ];
    setValid(
      () =>
        !valuesToCheck.some(
          (key) => formData[key] === "" || formData[key] === undefined
        )
    );
  }, [formData]);
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <React.Fragment>
      <Heading
        heading={iln.gettext("Import Constituents")}
        size="medium"
        bold
      />
      <div className={classes.container} />
      <Stepper step={step}>
        <ImportForm
          iln={iln}
          formData={formData}
          setFormData={setFormData}
          onConfirm={next}
          valid={valid}
          resetForm={() => {
            setFormData(initFormState);
            document.getElementsByName("csv")[0].value = "";
          }}
        />
        <IngestCSV
          file={formData.file}
          hasHeader={formData.firstLineHeader}
          createCases={formData.createCases}
          onSubmit={(ingestConfig) => {
            setIngestConfig({
              ...ingestConfig,
              config: {
                ...ingestConfig.config,
                dataStarts: formData.firstLineHeader ? 1 : 0,
              },
            });
            next();
          }}
          back={back}
        />
        <ConfirmImportDetails
          onConfirm={next}
          onBack={back}
          noOfConstituents={
            ingestConfig?.extraInfo?.rowLength -
            ingestConfig?.config?.dataStarts
          }
          addReviewFlag={formData.addReviewFlag}
          keepExistingContactDetails={formData.keepExistingContactDetails}
          caseDetails={formData.createCases ? formData.caseDetails : null}
        />
        <UploadingConstituents
          file={ingestConfig?.file}
          columns={ingestConfig?.columns}
          firstLineHeader={formData.firstLineHeader}
          caseDetails={formData.createCases ? formData.caseDetails : null}
          addReviewFlag={formData.addReviewFlag}
          keepExistingContactDetails={formData.keepExistingContactDetails}
          flags={formData.flags}
          surnameFirst={ingestConfig?.config?.surnameFirst}
          reset={reset}
        />
      </Stepper>
    </React.Fragment>
  );
};

export default ImportConstituents;
