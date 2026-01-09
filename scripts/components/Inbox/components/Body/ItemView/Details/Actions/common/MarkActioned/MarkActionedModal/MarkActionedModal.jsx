import { Button, ModalContext, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import proptypes from "./propTypes.js";
import useOpenUpdateCaseDetailsModal from "../../../../../../../../hooks/useOpenUpdateCaseDetailsModal.js";
import { useReduxSlice } from "./MarkAsActioned.redux.js";
import { useStyles } from "./styles.js";
import { useTheme } from "react-jss";

const MarkActionedModal = ({ inboxItem, modalID }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [fetching, setFetching] = useState(false);

  const { removeItem, focusedItem } = useReduxSlice();

  const openUpdateCaseDetails = useOpenUpdateCaseDetailsModal();

  return (
    <div className={classes.modal}>
      <p>
        {inboxItem?.subject
          ? `${iln.gettext("Are you sure you want to mark the email")} "${
              inboxItem.subject
            }" ${iln.gettext("as Actioned?")}`
          : iln.gettext("Are you sure you want to make this item as Actioned?")}
      </p>
      <p>
        {iln.gettext("It will no longer appear in the inbox if you proceed.")}
      </p>
      <div className={classes.buttons}>
        <Button onClick={() => modalActions.removeById(modalID)}>
          {iln.gettext("Cancel")}
        </Button>
        <Button
          isDisabled={fetching}
          onClick={() => {
            setFetching(true);
            api
              .updateEmailActioned(inboxItem?.id, true, modalActions, iln)
              .then(() => {
                openUpdateCaseDetails(inboxItem);
                modalActions.removeById(modalID);
                removeItem(focusedItem);
              })
              .finally(() => setFetching(false));
          }}
        >
          {fetching ? <Spinner /> : iln.gettext("Confirm")}
        </Button>
      </div>
    </div>
  );
};

MarkActionedModal.propTypes = proptypes;

export default MarkActionedModal;
