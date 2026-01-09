import React, { useContext } from "react";

import EmailAttachments from "../../../../../../common/EmailAttachments.jsx";
import TranslationContext from "context/translate";
import propTypes from "./propTypes";
import { useStyles } from "./styles.js";

const AttachmentList = ({ attachments }) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  if (!attachments || (attachments?.length || 0) === 0) return null;

  return (
    <div className={classes.attachmentList}>
      <div className={classes.label}>{iln.gettext("Attachments")}:</div>
      <EmailAttachments attachments={attachments} />
    </div>
  );
};

AttachmentList.propTypes = propTypes;

export default AttachmentList;
