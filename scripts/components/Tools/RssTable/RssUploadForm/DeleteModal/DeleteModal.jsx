import React, { useContext } from "react";

import ConfirmationModal from "../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "prop-types";
import useStyles from "../../RssUpload.styles.js";

const DeleteModal = ({ feed, deleteRss, modalActions, getRssFeeds }) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();
  return (
    <ConfirmationModal
      validateNumber
      errorTextToDisplay={`Name doesn't match`}
      message={
        <div>
          <p>
            {iln.gettext(
              "Please confirm you wish to delete rss feed called %1 typing the name below",
              `"${feed?.name}"`
            )}
          </p>
        </div>
      }
      confirmText="Confirm"
      confirmationValue={feed.name}
      onConfirm={() => {
        deleteRss({ id: feed.id }).then(() => {
          modalActions.removeById(`Delete RSS Feed`);
          getRssFeeds();
        });
      }}
      customClassNames={{ modal: classes.container }}
    />
  );
};

DeleteModal.propTypes = {
  deleteRss: propTypes.func,
  feed: propTypes.object,
  getRssFeeds: propTypes.func,
  modalActions: propTypes.object,
};

export default DeleteModal;
