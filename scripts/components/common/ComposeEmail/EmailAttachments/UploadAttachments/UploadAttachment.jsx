import {
  Button,
  FlexBox,
  FormFileInput,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  bulkEmailAttachmentFileTypeAsString,
  bulkEmailAttachmentFileUploadSize,
  emailAttachmentFileTypesAsString,
  emailAttachmentFileUploadSize,
  getBulkEmailFileSizeForDisplay,
  getFileSizeForDisplay,
  validEmailAttachmentFileExtension,
} from "../../../../../consts/fileUpload";

import api from "@electedtech/api";
import propTypes from "./propTypes";

const handleFileChanged = (
  file,
  form,
  setForm,
  setFileError,
  setFileErrorText,
  sizeLimit
) => {
  setForm({ ...form, file });
  setFileErrorText(true);
  if (file) {
    const filename = file.name;
    const fileExtension =
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
      filename;

    if (validEmailAttachmentFileExtension(fileExtension)) {
      setFileError(false);
      setFileErrorText(null);
    } else {
      setFileError(true);
      setFileErrorText(
        "For security reasons you can only upload image files, PDFs, Microsoft office files and text files."
      );
      return;
    }
    if (file.size <= sizeLimit) {
      setFileError(false);
      setFileErrorText(null);
    } else {
      setFileError(true);
      setFileErrorText(
        `File size must be less than ${
          sizeLimit == emailAttachmentFileUploadSize
            ? getFileSizeForDisplay(sizeLimit)
            : getBulkEmailFileSizeForDisplay(sizeLimit)
        }`
      );
    }
  } else {
    setFileError(true);
    setFileErrorText("Attaching a file is required");
  }
};

const handleUploadAndAttachFile = async (
  emailId,
  form,
  setUploading,
  attachmentUploaded,
  modalActions,
  saveDraft,
  emailSaved,
  modalId,
  type,
  setAttachmentPayload
) => {
  try {
    if (type == "email" && !emailId) {
      const { id } = await saveDraft();
      emailId = id;
    }
    const { file } = form;
    setUploading(true);
    const encodedFile = await base64Encode(file);
    const payload = {
      // emailId: emailId,
      attachment: {
        type: "file",
        file: {
          name: file.name,
          content: encodedFile.substring(encodedFile.indexOf(",") + 1),
        },
      },
    };
    type == "email"
      ? (payload.emailId = emailId)
      : setAttachmentPayload(payload);
    try {
      const res =
        type == "email" ? await api.addAttachment(payload, modalActions) : null;
      attachmentUploaded({ label: res ? res.fileName : file.name, ...res });
      setUploading(false);
      modalActions.removeById(modalId);
    } catch (e) {
      setUploading(false);
    }
    if (type == "email") {
      const email = await api.getEmail(emailId);
      emailSaved(email);
    }
  } catch (e) {
    setUploading(false);
  }
};

const base64Encode = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadAttachments = ({
  modalId,
  emailId,
  emailSaved,
  attachmentUploaded,
  saveDraft,
  type = "email",
  setAttachmentPayload = () => {},
  submitButtonText,
}) => {
  const formInitialValues = {
    description: null,
    file: null,
    date: [new Date()],
  };

  const [form, setForm] = useState(formInitialValues);
  const [fileError, setFileError] = useState(true);
  const [fileErrorText, setFileErrorText] = useState("");
  const [uploading, setUploading] = useState(false);

  const { modalActions, modalState } = useContext(ModalContext);
  emailId = emailId ? emailId : modalState.props.emailId;

  const sizeLimit =
    type == "email"
      ? emailAttachmentFileUploadSize
      : bulkEmailAttachmentFileUploadSize;
  return (
    <React.Fragment>
      <br />
      {uploading ? (
        <FlexBox hAlign={"center"} vAlign={"center"} column>
          <Spinner scale={2} />
          <p>Uploading file...</p>
        </FlexBox>
      ) : (
        <React.Fragment>
          <FormFileInput
            onChange={(e) =>
              handleFileChanged(
                e,
                form,
                setForm,
                setFileError,
                setFileErrorText,
                sizeLimit
              )
            }
            accept={
              type == "email"
                ? emailAttachmentFileTypesAsString
                : bulkEmailAttachmentFileTypeAsString
            }
            label={"File"}
            name={"file"}
            numberOfRows={50}
            numberOfColumns={75}
            error={fileErrorText}
            value={form.file}
          />
          <FlexBox hAlign={"flex-end"}>
            <Button
              isDisabled={fileError}
              onClick={() =>
                handleUploadAndAttachFile(
                  emailId,
                  form,
                  setUploading,
                  attachmentUploaded,
                  modalActions,
                  saveDraft,
                  emailSaved,
                  modalId,
                  type,
                  setAttachmentPayload
                )
              }
            >
              {submitButtonText ? (
                submitButtonText
              ) : (
                <>Upload &amp; Attach File</>
              )}
            </Button>
          </FlexBox>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

UploadAttachments.propTypes = propTypes;

export default UploadAttachments;
