import {
  Button,
  FlexBox,
  NotificationBox,
  Spinner,
} from "@electedtech/electedtech-ui";
import {
  formatDateTime,
  toLocalDate,
} from "../../../../../../helpers/timezoneHelpers";

import React from "react";
import classnames from "classnames";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const getFileName = (attachment, type) => {
  switch (type) {
    case "emailAttachment": {
      return `${attachment.fileName} - ${formatDateTime(
        toLocalDate(attachment.createdAt)
      )}`;
    }
    case "file": {
      return `${attachment.reference} (${
        attachment.fileName
      }) - ${formatDateTime(toLocalDate(attachment.createdAt))}`;
    }
    case "letter": {
      return `${attachment.reference} (${
        attachment.fileName
      }) - ${formatDateTime(toLocalDate(attachment.created))}`;
    }
  }
};

export const CaseAttachmentList = ({
  attachments,
  addAttachment,
  icon,
  titleText,
  noAttachmentsText,
  type,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h3 className={classes.heading}>{titleText}</h3>
      <div className={classes.fileList}>
        {attachments && attachments.length > 0 ? (
          <ul>
            {attachments.map((attachment) => (
              <li key={attachment.id}>
                <FlexBox hAlign={"space-between"} column={false} wrap={false}>
                  <Button
                    isDisabled={attachment.attached}
                    customClassNames={
                      attachment.attached ? classes.buttonDisabled : null
                    }
                    type={"text"}
                    onClick={() => {
                      addAttachment({ attachment, type });
                    }}
                  >
                    <FlexBox vAlign={"center"}>
                      {React.cloneElement(icon, {
                        className: attachment.attached
                          ? classes.iconDisabled
                          : null,
                        width: 18,
                        height: 18,
                      })}
                      <p
                        className={classnames(
                          classes.attachmentText,
                          classes.listItem
                        )}
                      >
                        {getFileName(attachment, type)}
                      </p>
                    </FlexBox>
                  </Button>
                  <div className={classes.spinnerContainer}>
                    {attachment.loading ? <Spinner scale={0.75} /> : null}
                  </div>
                </FlexBox>
              </li>
            ))}
          </ul>
        ) : (
          <NotificationBox type={"info"} alertMessage={noAttachmentsText} />
        )}
      </div>
    </React.Fragment>
  );
};

CaseAttachmentList.propTypes = propTypes;
