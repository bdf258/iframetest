import React, { useState } from "react";

import { FormTextInput } from "@electedtech/electedtech-ui";
import PencilIcon from "../../../../../common/icons/PencilIcon.jsx";
import api from "@electedtech/api";
import propTypes from "./propTypes";
import { useReduxSlice } from "../Letter.redux";
import { useStyles } from "../styles";

const LetterTitle = ({ casenote, index }) => {
  const classes = useStyles();

  const { updateCasenote } = useReduxSlice();

  const [edit, setEdit] = useState(false);
  const [reference, setReference] = useState(casenote.detail.reference);

  const handleFinishedEditingReference = ({ type, key }) => {
    if ((type === "keyup" && key === "Enter") || type === "blur") {
      setEdit(false);
      updateLetterReference(casenote, reference, setReference);
    }
  };

  const updateLetterReference = (casenote, reference, setReference) => {
    reference.trim() !== ""
      ? api
          .updateLetter(casenote.detail.id, {
            letterRef: reference,
          })
          .then(() =>
            updateCasenote(index, {
              ...casenote,
              detail: { ...casenote.detail, reference },
            })
          )
          .catch(() => setReference(casenote.detail.reference))
      : setReference(casenote.detail.reference);
  };

  return (
    <div className={classes.letterReferenceContainer}>
      {edit ? (
        <FormTextInput
          name="reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          onKeyUp={(e) => handleFinishedEditingReference(e)}
          onBlur={(e) => handleFinishedEditingReference(e)}
          keepErrorSpacing={false}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        />
      ) : (
        <button onClick={() => setEdit(true)} className={classes.editButton}>
          <b>{reference}</b>
          <PencilIcon width={20} height={20} className={classes.pencilIcon} />
        </button>
      )}
    </div>
  );
};

LetterTitle.propTypes = propTypes;

export default LetterTitle;
