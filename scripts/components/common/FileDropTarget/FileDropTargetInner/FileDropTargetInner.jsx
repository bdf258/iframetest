import { Button, FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import {
  caseMaxFileUploadSize,
  getFileSizeForDisplay,
} from "../../../../consts/fileUpload.js";

import { TranslationContext } from "context/translate";
import propTypes from "./FileDropTargetInner.propTypes.js";
import { useStyles } from "./FileDropTargetInner.styles.js";

const DropTargetInner = ({
  fileCount,
  processed,
  failures,
  onCloseClick,
  dropHereText,
  acceptedFileTypes,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  if (!fileCount) return <p className={classes.dropHereText}>{dropHereText}</p>;

  if (processed !== fileCount)
    return (
      <React.Fragment>
        <Spinner scale={1.5} />
        <p>{iln.gettext(`processed %1 of %2`, processed + 1, fileCount)}</p>
      </React.Fragment>
    );

  return (
    <div className={classes.spinner}>
      <p>
        {iln.gettext(
          "%1 of %2 files uploaded successfully",
          fileCount - failures.size - failures.type - failures.upload,
          fileCount
        )}
      </p>
      {failures.type > 0 && (
        <div className={classes.error}>
          {iln.ngettext(
            "%1 file rejected due to file extension (accepting: %2)",
            "%1 files rejected due to file extension (accepting: %2)",
            failures.type,
            acceptedFileTypes.map((type) => "." + type).join(", ")
          )}
        </div>
      )}
      {failures.size > 0 && (
        <div className={classes.error}>
          {iln.ngettext(
            "%1 file rejected for being larger than %2",
            "%1 files rejected for being larger than %2",
            failures.size,
            getFileSizeForDisplay(caseMaxFileUploadSize)
          )}
        </div>
      )}
      {failures.upload > 0 && (
        <div className={classes.error}>
          {iln.ngettext(
            "%1 file failed to upload to the server",
            "%1 files failed to upload to the server",
            failures.upload
          )}
        </div>
      )}
      <br />
      <FlexBox hAlign="center">
        <Button size="small" onClick={onCloseClick}>
          {iln.gettext("Done")}
        </Button>
      </FlexBox>
    </div>
  );
};

DropTargetInner.propTypes = propTypes;

export default DropTargetInner;
