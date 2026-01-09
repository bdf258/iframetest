import {
  Button,
  FlexBox,
  FormFileInput,
  FormTextInput,
  Spinner,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  allowedFileExtensions,
  maxFileSize,
} from "../../../../../../consts/fileUpload.js";

import { BE_DATETIME_FORMAT } from "../../../../../../consts/Date.js";
import ConfirmationModal from "../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import base64Encode from "../../../../../../../../helpers/base64Encode.js";
import format from "date-fns/format";
import formatNumberForDisplay from "../helpers/formNumberForDisplay.js";
import propTypes from "./BulkAttachFile.propTypes.js";
import useStyles from "./BulkAttachFile.styles.js";
import { useTheme } from "react-jss";

const extensionNotAllowed = (file) =>
  !allowedFileExtensions.some((extension) => file.name.endsWith(extension));

const BulkAttachFile = ({ refreshResults, closeModal, onBackClick, state }) => {
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState();
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState();
  const [casesAffected, setCasesAffected] = useState();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const classes = useStyles(theme);
  const iln = useContext(TranslationContext);

  if (loading)
    return (
      <FlexBox hAlign={"center"}>
        <Spinner scale={2} />
      </FlexBox>
    );

  const updateDescription = (file) => {
    const filename = file.name;
    setDescription((currentDescription) => {
      if (currentDescription.trim() !== "") return currentDescription;

      const lastIndex = filename.lastIndexOf(".");
      if (lastIndex !== -1) return filename.substring(0, lastIndex);

      return filename;
    });
  };

  return (
    <div className={classes.innerModalContainer}>
      <Stepper step={step}>
        <Step>
          <FormTextInput
            value={description}
            label={iln.gettext("Description")}
            name={"description"}
            error={descriptionError || null}
            onChange={({ target: { value } }) => {
              setDescription(value);
              setDescriptionError();
              if (value.trim().length === 0)
                setDescriptionError(iln.gettext("Description is required"));
            }}
          />
          <FormFileInput
            onChange={(file) => {
              setFile(file);
              setFileError();
              updateDescription(file);
              if (extensionNotAllowed(file))
                setFileError(
                  iln.gettext(
                    "For security reasons you can only upload image files, PDFs, Microsoft office files and text files."
                  )
                );
              else if (file.size > maxFileSize)
                setFileError(iln.gettext("File size must be less than 25Mb"));
            }}
            accept={allowedFileExtensions.join(", .")}
            label={iln.gettext("File")}
            name={"file"}
            error={fileError || null}
            value={file}
          />
          <FlexBox hAlign={"space-between"}>
            <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>{" "}
            <Button
              isDisabled={
                fileError !== undefined ||
                description.trim().length === 0 ||
                file === undefined
              }
              onClick={() => setStep(1)}
            >
              {iln.gettext("Upload & attach file")}
            </Button>
          </FlexBox>
        </Step>

        <Step>
          <ConfirmationModal
            message={
              <React.Fragment>
                <p className={classes.center}>
                  {iln.ngettext(
                    "This will add your file to %1 case",
                    "This will add your file to %1 cases",
                    formatNumberForDisplay(state.results.totalResults)
                  )}
                </p>
                <p className={classes.center}>
                  {iln.gettext(
                    "To continue, enter the number of cases that will be affected in the box below."
                  )}
                </p>
              </React.Fragment>
            }
            buttonText={iln.gettext("Confirm")}
            confirmationValue={state.results.totalResults.toString()}
            modifyInputValues={(value) => value.replaceAll(",", "")}
            onConfirm={() => {
              setLoading(true);
              base64Encode(file)
                .then((encodedFile) => encodedFile)
                .then((encodedFile) =>
                  api
                    .bulkAttachFile({
                      caseSearch: state.filters,
                      timestamp: format(file.lastModified, BE_DATETIME_FORMAT),
                      filename: file.name,
                      fileContents: encodedFile.substring(
                        encodedFile.indexOf(",") + 1
                      ),
                      reference: description,
                    })
                    .then(({ filesAttached }) => {
                      setLoading(false);
                      setCasesAffected(filesAttached);
                      refreshResults();
                      setStep(2);
                    })
                );
            }}
          />
        </Step>

        <Step>
          <OperationCompletedModal handleDone={closeModal}>
            <p className={classes.center}>
              {iln.ngettext(
                "File successfully attached to %1 case",
                "File successfully attached to %1 cases",
                formatNumberForDisplay(casesAffected)
              )}
            </p>
          </OperationCompletedModal>
        </Step>
      </Stepper>
    </div>
  );
};

BulkAttachFile.propTypes = propTypes;

export default BulkAttachFile;
