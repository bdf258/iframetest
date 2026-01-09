import {
  Button,
  FormTextInput,
  List,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import CasenoteCard from "../CasenoteCard/CasenoteCard.jsx";
import DeleteCasenote from "../DeleteCasenote/DeleteCasenote.jsx";
import FileIcon from "../../../../common/icons/FileIcon.jsx";
import PencilIcon from "../../../../common/icons/PencilIcon.jsx";
import { TranslationContext } from "context/translate";
import ViewOrDownloadFile from "../../../ViewOrDownloadFile/ViewOrDownloadFile.jsx";
import api from "@electedtech/api";
import propTypes from "./propTypes";
import { useSendViaEmail } from "../Letter/hooks/useSendViaEmail";
import { useStyles } from "./styles";

const updateFileReference = (
  casenote,
  reference,
  setReference,
  updateCasenote
) =>
  reference.trim() !== ""
    ? api
        .updateFile(casenote.detail.id, {
          reference,
        })
        .then(() => {
          updateCasenote({
            ...casenote,
            detail: { ...casenote.detail, reference },
          });
        })
        .catch(() => setReference(casenote.detail.reference))
    : setReference(casenote.detail.reference);

const charLimit = 20;

const File = ({ casenote, title, removeCasenote, updateCasenote }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [edit, setEdit] = useState(false);
  const [reference, setReference] = useState(casenote.detail.reference);

  const [sendViaEmail] = useSendViaEmail(casenote);

  const deleteModalID = `delete_note_${casenote.id}`;
  const confirmationValue =
    casenote.detail.reference.length > charLimit
      ? casenote.detail.reference.slice(0, charLimit) + "..."
      : casenote.detail.reference;
  const confirmMessage = (
    <React.Fragment>
      <p>
        {iln.gettext(
          "Are you sure you want to delete the file with description:"
        )}
      </p>
      <b>{confirmationValue}</b>
      <p>
        {iln.gettext(
          "Please enter the file description as written above to confirm:"
        )}
      </p>
    </React.Fragment>
  );

  const viewFile = () =>
    modalActions.add({
      id: "file_download_modal",
      title: iln.gettext("Preview: %1", casenote.detail.reference),
      component: <ViewOrDownloadFile fileID={casenote.detail.id} />,
      customClassNames: {
        card: classes.modalCard,
      },
    });

  return (
    <CasenoteCard
      id={casenote.id}
      title={iln.gettext(title)}
      icon={
        <button className={classes.iconButton} onClick={viewFile}>
          <FileIcon />
        </button>
      }
      main={
        <div>
          {edit ? (
            <FormTextInput
              name="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setEdit(false);
                  updateFileReference(
                    casenote,
                    reference,
                    setReference,
                    updateCasenote
                  );
                }
              }}
              onBlur={() => {
                setEdit(false);
                updateFileReference(
                  casenote,
                  reference,
                  setReference,
                  updateCasenote
                );
              }}
              keepErrorSpacing={false}
              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            />
          ) : (
            <button
              onClick={() => setEdit(true)}
              className={classes.editButton}
            >
              <b>{reference}</b>
              <PencilIcon
                width={20}
                height={20}
                className={classes.pencilIcon}
              />
            </button>
          )}
          <List indent={false} bulletPoints={false}>
            <ul>
              <li>{casenote.detail.originalFileName}</li>
            </ul>
          </List>
          {casenote.note !== "" && <strong>{casenote.note}</strong>}
        </div>
      }
      right={
        <React.Fragment>
          <Button size="small" onClick={() => sendViaEmail(casenote)}>
            {iln.gettext("Send Via Email")}
          </Button>
          <Button
            className={classes.actionButton}
            size="small"
            onClick={viewFile}
          >
            {iln.gettext("View")}
          </Button>
          <Button
            className={classes.actionButton}
            size="small"
            onClick={() =>
              modalActions.add({
                id: deleteModalID,
                title: iln.gettext("Delete File"),
                component: (
                  <DeleteCasenote
                    removeCasenote={removeCasenote}
                    casenote={casenote}
                    successMessage={iln.gettext("File Successfully Deleted")}
                    confirmMessage={confirmMessage}
                    failureMessage={iln.gettext(
                      "There was an error while trying to delete the File"
                    )}
                    confirmationValue={confirmationValue}
                    modalID={deleteModalID}
                    modifyInputValues={(value) =>
                      value.replaceAll("...", "").trim()
                    }
                  />
                ),
              })
            }
          >
            {iln.gettext("Delete")}
          </Button>
        </React.Fragment>
      }
    />
  );
};

File.propTypes = propTypes;

export default File;
