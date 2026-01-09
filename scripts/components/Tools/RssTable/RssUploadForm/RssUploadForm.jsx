import { Button, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useState } from "react";

import DeleteModal from "./DeleteModal/DeleteModal.jsx";
import PermissionsChipInput from "../../../common/PermissionsChipInput/index.js";
import api from "../../../../api/protected.index.js";
import propTypes from "prop-types";
import useStyles from "../RssUpload.styles.js";

const RssUploadFrom = ({
  action = "Upload",
  feed = {},
  getRssFeeds,
  modalActions,
}) => {
  const [inputError, setInputError] = useState("");

  const [name, setName] = useState(feed?.name || "");
  const [url, setUrl] = useState(feed?.url || "");
  const [restrictions, setRestrictions] = useState(
    feed?.restrictions
      ? feed.restrictions.map((group) => ({
          ...group,
          label: group.name,
        }))
      : []
  );

  const submitForm = async () => {
    setInputError("");
    let msg = !name
      ? "Name can't be Empty"
      : !url
      ? "URL can't be Empty"
      : !restrictions || restrictions.length == 0
      ? "Select atlease 1 group / user"
      : "";
    if (msg) {
      setInputError(msg);
      return;
    }
    let res =
      action == "Edit"
        ? await api.editRssFeed({
            id: feed.id,
            name,
            url,
            restrictions: restrictions,
          })
        : await api.saveRssFeed({
            name,
            url,
            restrictions: restrictions,
          });
    if (res) {
      modalActions.removeById(`${action} RSS Feed`);
      getRssFeeds();
    }
  };

  const classes = useStyles();
  return (
    <div>
      {action == "Delete" ? (
        <DeleteModal
          feed={feed}
          deleteRss={api.deleteRssFeed}
          modalActions={modalActions}
          getRssFeeds={getRssFeeds}
        />
      ) : (
        <>
          <FormTextInput
            name="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormTextInput
            name="url"
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <PermissionsChipInput
            name="restrictions"
            keepErrorSpacing={false}
            value={restrictions}
            onChange={({ target: { value } }) => setRestrictions(value)}
            error={inputError}
            customClassNames={{
              container: classes.chipInput,
            }}
          />
          <Button
            disableDropShadow
            size={"small"}
            type="text"
            customClassNames={classes.submitButton}
            onClick={() => submitForm()}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};
RssUploadFrom.propTypes = {
  action: propTypes.string,
  feed: propTypes.object,
  getRssFeeds: propTypes.func,
  modalActions: propTypes.object,
};

export default RssUploadFrom;
