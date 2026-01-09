import { Button, ModalContext, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import proptypes from "./propTypes.js";
import { useReduxSlice } from "./DeleteModal.redux.js";
import { useStyles } from "./styles.js";
import { useTheme } from "react-jss";

const DeleteModal = ({ item, modalID }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [fetching, setFetching] = useState(false);

  const { removeItem, focusedItem } = useReduxSlice();

  return (
    <div className={classes.modal}>
      <p className={classes.center}>
        {item.type in { "SMS-inbound": true, "whatsapp-inbound": true }
          ? iln.gettext("Are you sure you want to delete this message?")
          : iln.gettext("Are you sure you want to delete the email")}
        <br />
        {item.subject && (
          <span>
            <strong>{`"${item.subject}"`}</strong> ?
          </span>
        )}
      </p>
      <p className={classes.center}>{}</p>
      <p className={classes.center}>{iln.gettext("This cannot be undone.")}</p>
      <div className={classes.buttons}>
        <Button onClick={() => modalActions.removeById(modalID)}>
          {iln.gettext("Cancel")}
        </Button>
        <Button
          isDisabled={fetching}
          onClick={() => {
            setFetching(true);
            api
              .deleteEmail(item.id, modalActions, iln)
              .then(() => {
                removeItem(focusedItem);
                modalActions.removeById(modalID);
              })
              .finally(() => setFetching(false));
          }}
        >
          {fetching ? <Spinner /> : iln.gettext("Delete")}
        </Button>
      </div>
    </div>
  );
};

DeleteModal.propTypes = proptypes;

export default DeleteModal;
