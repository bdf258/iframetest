import { BE_DATE_FORMAT, DATE_FORMAT } from "../../../../../consts/Date";
import {
  Button,
  FlexBox,
  FormDatePicker,
  FormFileInput,
  FormTextInput,
  ModalContext,
  SliderContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  caseAttachmentFileTypesAsString,
  caseMaxFileUploadSize,
  getFileSizeForDisplay,
  validCaseFileAttachmentExtension,
} from "../../../../../consts/fileUpload";
import { format, sub } from "date-fns";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { installationPreferences } from "../../../../../helpers/localStorageHelper.js";
import { useReduxSlice } from "./AttachFile.redux";
import useResizeSlider from "../../../../common/hooks/useResizeSlider.jsx";
import { useStyles } from "./styles";

const getDateString = () => {
  const today = new Date();
  const todayUTC = new Date(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
    today.getUTCHours(),
    today.getUTCMinutes()
  );
  const todayUtcString = format(
    todayUTC,
    `${BE_DATE_FORMAT.DATE} ${BE_DATE_FORMAT.TIME}`
  );
  return todayUtcString;
};

const locale = installationPreferences.locale;

const processFile = (file, setFile, setDescription, setError, iln) => {
  if (file) {
    const filename = file.name;
    const fileExtension =
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
      filename;
    if (file.size > caseMaxFileUploadSize) {
      setError(
        iln.gettext(
          `File size must be less than ${getFileSizeForDisplay(
            caseMaxFileUploadSize
          )}`
        )
      );
    } else if (!validCaseFileAttachmentExtension(fileExtension)) {
      setError(
        iln.gettext(
          "For security reasons you can only upload image files, PDFs, Microsoft office files and text files."
        )
      );
    } else {
      setFile(file);
      setDescription((currentDescription) => {
        if (currentDescription.trim() !== "") return currentDescription;

        const lastIndex = filename.lastIndexOf(".");
        if (lastIndex !== -1) return filename.substring(0, lastIndex);

        return filename;
      });
      setError();
    }
  }
};

const AttachFile = () => {
  const classes = useStyles();

  const { addCasenote, caseId } = useReduxSlice();

  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getDateString());
  const [file, setFile] = useState({});
  const [error, setError] = useState();
  const [uploading, setUploading] = useState(false);
  const iln = useContext(TranslationContext);
  const { sliderActions } = useContext(SliderContext);
  const { modalActions } = useContext(ModalContext);

  useResizeSlider(600, 1250);

  return (
    <div className={classes.container}>
      <FormTextInput
        label={iln.gettext("Description")}
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        keepErrorSpacing={false}
        customClassNames={{ container: classes.firstInputContainer }}
      />
      <FormDatePicker
        dateFormat={`${DATE_FORMAT.DATE} ${DATE_FORMAT.TIME}`}
        label={iln.gettext("Date")}
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        keepErrorSpacing={false}
        customClassNames={{ container: classes.inputContainer }}
        includeTime
        maxDate={new Date()}
        minDate={sub(new Date(), { years: 5 })}
      />
      <FormFileInput
        label={iln.gettext("File")}
        name="file"
        accept={caseAttachmentFileTypesAsString}
        onChange={(e) => {
          processFile(e, setFile, setDescription, setError, iln);
        }}
        error={error}
        customClassNames={{ container: classes.inputContainer }}
      />
      <FlexBox hAlign="flex-end">
        <Button
          isDisabled={
            file === undefined || error !== undefined || description === ""
          }
          onClick={() => {
            setUploading(true);

            if (!uploading) {
              if (file?.name?.endsWith(".msg")) {
                api
                  .uploadDroppedFile(
                    {
                      file,
                      subdomain: window.location.host.split(".")[0],
                      caseID: caseId,
                      locale,
                    },
                    modalActions,
                    iln
                  )
                  .then(({ casenoteID, caseNoteID }) => {
                    setUploading((count) => count + 1);
                    api
                      .getCasenote(casenoteID || caseNoteID, modalActions, iln)
                      .then((casenote) => {
                        addCasenote(casenote);
                        sliderActions.reset();
                      })
                      .catch(() => {
                        setUploading(false);
                      });
                  })
                  .catch(() => {
                    setUploading(false);
                  });
              } else {
                api
                  .uploadFile(
                    {
                      caseID: caseId,
                      reference: description,
                      timestamp: date,
                      file,
                    },
                    modalActions,
                    iln
                  )
                  .then((casenote) => {
                    addCasenote(casenote);
                    setUploading(false);
                    sliderActions.reset();
                  })
                  .catch(() => {
                    setError(iln.gettext("Failed to upload, please try again"));
                    setUploading(false);
                  });
              }
            }
          }}
        >
          {uploading ? (
            <FlexBox vAlign="center" hAlign="center">
              {iln.gettext("Uploading...")} &nbsp; <Spinner />
            </FlexBox>
          ) : (
            <React.Fragment>
              {iln.gettext("Upload and Attach File")}
            </React.Fragment>
          )}
        </Button>
      </FlexBox>
    </div>
  );
};

export default AttachFile;
