import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AttachmentIcon from "../common/icons/AttachmentIcon.jsx";
import ViewOrDownloadFile from "../ViewCase/ViewOrDownloadFile/ViewOrDownloadFile.jsx";
import { createUseStyles } from "react-jss";
import modalStyles from "./Modal/styles";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  attachment: {
    margin: { left: 8 },
    width: "auto",
  },
  attachmentFile: {
    marginBottom: 3,
    color: "#363636",
  },
  attachmentButtonText: {
    verticalAlign: "top",
  },
  attachmentContainer: {
    height: "fit-content",
  },
  modalCard: modalStyles.positionBelowMainNav,
});

const EmailAttachments = ({ attachments = [] }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);

  return (
    <FlexBox wrap className={classes.attachmentContainer}>
      {attachments.map((attachment, idx) => (
        <FlexBox key={idx} vAlign="center" className={classes.attachment}>
          <Button
            type={"text"}
            onClick={() =>
              modalActions.add({
                id: "file_download_modal",
                title: `${
                  attachment?.detail?.reference
                    ? attachment.detail.reference
                    : attachment.fileName
                } Download`,
                component: <ViewOrDownloadFile attachment={attachment} />,
                customClassNames: {
                  card: classes.modalCard,
                },
              })
            }
            className={classes.attachmentFile}
          >
            <AttachmentIcon width={15} height={15} size="small" />
            <span className={classes.attachmentButtonText}>
              {attachment.fileName}
            </span>
          </Button>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

EmailAttachments.propTypes = {
  attachments: propTypes.arrayOf(
    propTypes.shape({ fileName: propTypes.string })
  ),
};

export default EmailAttachments;
