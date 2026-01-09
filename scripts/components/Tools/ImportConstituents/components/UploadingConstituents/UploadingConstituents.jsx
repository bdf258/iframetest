import {
  Button,
  FlexBox,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./UploadingConstituents.propTypes.js";
import useStyles from "./UploadingConstituents.styles.js";

const UploadingConstituents = ({
  file,
  columns,
  caseDetails,
  addReviewFlag,
  firstLineHeader,
  keepExistingContactDetails,
  flags,
  reset,
  surnameFirst
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [uploading, setUploading] = useState(true);
  const [error, setError] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    api
      .uploadConstituents(
        {
          file,
          columns,
          caseDetails,
          addReviewFlag,
          keepExistingContactDetails,
          firstLineHeader,
          surnameFirst,
          flags: flags.map(({ id }) => id),
        },
        modalActions,
        iln
      )
      .then((result) => setResult(result))
      .catch((e) => setError(e))
      .finally(() => setUploading(false));
  }, []);

  if (uploading || !result)
    return (
      <FlexBox hAlign="center" vAlign="center">
        <Spinner />
        <p>{iln.gettext("Uploading constituents...")}</p>
      </FlexBox>
    );

  if (error)
    return (
      <FlexBox hAlign="center" vAlign="center">
        <p className={classes.error}>
          {iln.gettext("There was an error uploading constituents")}
        </p>
      </FlexBox>
    );

  return (
    <React.Fragment>
      <h2>{iln.gettext("Success")}</h2>
      <p>{iln.gettext("Your File has been uploaded for processing")}</p>
      <p>
        {iln.gettext(
          "You will receive an email once the import has been processed."
        )}
      </p>
      <Button onClick={() => reset()}>Upload Another File</Button>
    </React.Fragment>
  );
};

UploadingConstituents.propTypes = propTypes;

export default UploadingConstituents;
