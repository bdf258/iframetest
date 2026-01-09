import React, { useContext, useEffect } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { getUserIdentity } from "../../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./ActionList.propTypes.js";
import useStyles from "./ActionList.styles.js";

const { isAdmin } = getUserIdentity() || {};

const ActionList = ({ setSelected, updateModalTitle }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  useEffect(() => updateModalTitle("Bulk Actions"), []);

  return (
    <div className={classes.actionList}>
      <p>
        {iln.gettext(
          "Which bulk action do you want to carry out on these cases?"
        )}
      </p>
      <Button
        type="text"
        onClick={() => {
          updateModalTitle("Bulk Actions - Add a Note");
          setSelected("bulkAddNote");
        }}
      >
        {iln.gettext("Add a Note")}
      </Button>
      <Button
        type="text"
        onClick={() => {
          setSelected("bulkAttachFile");
          updateModalTitle("Bulk Actions - Attach File");
        }}
      >
        {iln.gettext("Attach a File")}
      </Button>
      <Button
        type="text"
        onClick={() => {
          setSelected("bulkSendEmail");
          updateModalTitle("Bulk Actions - Send Email");
        }}
      >
        {iln.gettext("Send Bulk Email")}
      </Button>
      <Button
        type="text"
        onClick={() => {
          setSelected("bulkMergeLetter");
          updateModalTitle("Bulk Actions - Mail Merge Letter");
        }}
      >
        {iln.gettext("Send Mail Merged Letter")}
      </Button>
      <br />
      <Button
        type="text"
        onClick={() => {
          setSelected("bulkAddTags");
          updateModalTitle("Bulk Actions - Add Tags");
        }}
      >
        {iln.gettext("Add Tags")}
      </Button>
      <Button
        type="text"
        onClick={() => {
          setSelected("bulkChangeCaseDetails");
          updateModalTitle("Bulk Actions - Change Case Details");
        }}
      >
        {iln.gettext("Change Case Details")}
      </Button>
      <Button
        type="text"
        onClick={() => {
          setSelected("bulkAddReviewDate");
          updateModalTitle("Bulk Actions - Add a Review Date");
        }}
      >
        {iln.gettext("Add a Review Date")}
      </Button>
      <Button
        type="text"
        onClick={() => {
          setSelected("bulkClearReviewDates");
          updateModalTitle("Bulk Actions - Clear Review Dates");
        }}
      >
        {iln.gettext("Clear Review Dates")}
      </Button>
      {isAdmin && [
        <br key="br" />,
        <Button
          key="button"
          type="text"
          className={classes.dangerZone}
          onClick={() => {
            setSelected("bulkDeleteCases");
            updateModalTitle("Bulk Actions - Delete Cases");
          }}
        >
          {iln.gettext("Delete Cases")}
        </Button>,
      ]}
    </div>
  );
};

ActionList.propTypes = propTypes;

export default ActionList;
