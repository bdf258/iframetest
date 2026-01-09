import { FormTextareaInput, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import Label from "@electedtech/electedtech-ui/dist/components/common/Label/index.js";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./ReviewNoteBox.propTypes.js";
import useStyles from "./ReviewNoteBox.styles.js";

let typingTimeout;

const ReviewNoteBox = ({ reviewDate, updateCasenoteByID }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext) || {};
  const iln = useContext(TranslationContext);

  const [note, setNote] = useState(reviewDate.detail?.note);

  useEffect(() => {
    setNote(reviewDate.detail?.note);
  }, [reviewDate.detail.id]);

  return (
    <div className={classes.reviewNoteBox}>
      <Label name="reviewNote" customClassNames={classes.label}>
        {iln.gettext("Review Note")}
      </Label>
      <FormTextareaInput
        name="reviewNote"
        onChange={({ target: { value } }) => {
          clearTimeout(typingTimeout);
          setNote(value);
          typingTimeout = setTimeout(() => {
            updateCasenoteByID({
              noteId: reviewDate.detail.id,
              casenote: {
                ...reviewDate,
                detail: { ...reviewDate.detail, note: value },
              },
            });
            api.updateReviewDate(
              reviewDate.detail.id,
              { note: value },
              modalActions,
              iln
            );
          }, 500);
        }}
        value={note}
        customClassNames={{ container: classes.container }}
        keepErrorSpacing={false}
      />
    </div>
  );
};

ReviewNoteBox.propTypes = propTypes;

export default ReviewNoteBox;
