import React, { useContext, useEffect, useState } from "react";

import DownloadComplete from "./DownloadComplete/DownloadComplete.jsx";
import LetterPreview from "../common/LetterPreview/LetterPreview.jsx";
import Loading from "../../ComponentLoading.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import api from "@electedtech/api";
import propTypes from "./propTypes";

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

const createURL = (file) => {
  const blob = b64toBlob(file.content, file.mimeType);
  return URL.createObjectURL(blob);
};

const downloadFile = (file) => () => {
  const url = createURL(file);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = file.fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

const viewOrDownload = (file) => {
  const { mimeType, fileName } = file;

  if (mimeType === "application/pdf" && !fileName.endsWith(".msg")) {
    return (
      <LetterPreview
        pdfURL={createURL(file)}
        title={file.fileName}
        showPrint
        showSave
      />
    );
  } else if (mimeType.includes("image/")) {
    return (
      <div style={{ maxWidth: "80vw" }}>
        <img width="100%" alt="File" src={createURL(file)} />
      </div>
    );
  } else {
    return (
      <DownloadComplete
        modalID="file_download_modal"
        downloadOnMount={downloadFile(file)}
      />
    );
  }
};

const ViewOrDownloadFile = ({ fileID, attachment }) => {
  const [fetching, setFetching] = useState(true);
  const [file, setFile] = useState();

  const { modalActions } = useContext(ModalContext);

  useEffect(() => {
    if (fileID) {
      api.getFile(fileID, modalActions).then((res) => {
        setFile(res);
        setFetching(false);
      });
    } else if (attachment) {
      api.getAttachment(attachment.id, modalActions).then((res) => {
        setFile({
          ...res,
          mimeType: attachment.mimeType,
          fileName: attachment.fileName || attachment.label.split(".")[0],
        });
        setFetching(false);
      });
    }
  }, []);

  return fetching ? <Loading /> : viewOrDownload(file);
};

ViewOrDownloadFile.propTypes = propTypes;

export default ViewOrDownloadFile;
