import React, { useState } from "react";

import DropTargetInner from "./FileDropTargetInner";
import classNames from "classnames";
import propTypes from "./FileDropTarget.propTypes";
import { useStyles } from "./FileDropTarget.styles";

const FileDropTarget = ({
  onCloseClick,
  handleValidFile,
  maxFileSize,
  acceptedFileTypes,
  dropHereText,
  className,
}) => {
  const classes = useStyles();

  const [fileCount, setFileCount] = useState();
  const [failures, setFailures] = useState({ size: 0, type: 0, upload: 0 });
  const [processed, setProcessed] = useState(0);

  const isTooLarge = (filesize) => filesize > maxFileSize;

  const isNotacceptedFileType = (filename) =>
    !acceptedFileTypes.includes(filename.split(".").pop().toLowerCase());

  return (
    <div
      className={classNames(classes.fileDropTarget, className)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        let liveFailCount = 0;

        setFileCount(files.length);

        const filePromises = [];

        files.forEach((file) => {
          if (isTooLarge(file.size)) {
            liveFailCount += 1;
            setProcessed((count) => count + 1);
            setFailures(({ size, ...failures }) => ({
              ...failures,
              size: size + 1,
            }));
            return;
          }
          if (isNotacceptedFileType(file.name)) {
            liveFailCount += 1;
            setProcessed((count) => count + 1);
            setFailures(({ type, ...failures }) => ({
              ...failures,
              type: type + 1,
            }));
            return;
          }

          const filePromise = handleValidFile({
            file,
            success: () => setProcessed((count) => count + 1),
            fail: () => {
              liveFailCount += 1;
              setProcessed((count) => count + 1);
              setFailures(({ upload, ...failures }) => ({
                ...failures,
                upload: upload + 1,
              }));
            },
          });

          filePromises.push(filePromise);
        });

        await Promise.all(filePromises);

        if (liveFailCount === 0) onCloseClick();
      }}
    >
      <DropTargetInner
        fileCount={fileCount}
        failures={failures}
        processed={processed}
        onCloseClick={onCloseClick}
        dropHereText={dropHereText}
        acceptedFileTypes={acceptedFileTypes}
      />
    </div>
  );
};

FileDropTarget.propTypes = propTypes;

export default FileDropTarget;
