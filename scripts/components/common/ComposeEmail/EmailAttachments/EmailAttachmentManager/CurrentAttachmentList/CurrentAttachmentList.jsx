import {
  Chip,
  FlexBox,
  NotificationBox,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

export const CurrentAttachmentList = ({
  uploadingAttachment,
  currentAttachments,
  handleDeleteAttachment,
}) => {
  const iln = useContext(TranslationContext);

  const classes = useStyles();

  return (
    <React.Fragment>
      {uploadingAttachment && (
        <div className={classes.attachingFileLoading}>
          <FlexBox column hAlign={"center"} vAlign={"center"}>
            <div>{iln.gettext("Attaching file")}</div>
            <Spinner scale={2} />
          </FlexBox>
        </div>
      )}
      <div className={classes.listContainer}>
        {currentAttachments && currentAttachments.length > 0 ? (
          currentAttachments.map((attachment) => (
            <Chip
              key={attachment.id}
              value={attachment.id}
              onCrossClick={() => handleDeleteAttachment({ attachment })}
            >
              {attachment.loading ? (
                <Spinner scale={0.55} />
              ) : (
                attachment.fileName
              )}
            </Chip>
          ))
        ) : (
          <NotificationBox
            type={"info"}
            alertMessage={iln.gettext(
              "Add new attachments from the lists below"
            )}
          />
        )}
      </div>
    </React.Fragment>
  );
};

CurrentAttachmentList.propTypes = propTypes;
