import React, { useContext } from "react";

import Actions from "./Actions/Actions.jsx";
import AddressField from "./AddressField/AddressField.jsx";
import AssignedTo from "./AssignedTo";
import AttachmentList from "./AttachmentList/AttachmentList.jsx";
import ConstituentAndCase from "./ConstituentAndCase/ConstituentAndCase.jsx";
import DateTime from "./DateTime/DateTime.jsx";
import DetailsPlaceHolder from "./DetailsPlaceHolder/DetailsPlaceHolder.jsx";
import InboxBulkActions from "./InboxBulkActions/InboxBulkActions.jsx";
import ItemViewHeading from "./ItemViewHeading/ItemViewHeading.jsx";
import RefreshOverlay from "./RefreshOverlay/RefreshOverlay.jsx";
import Subject from "./Subject/";
import TranslationContext from "../../../../../../context/translation/TranslationContext.js";
import propTypes from "./Details.propTypes.js";
import { useReduxSlice } from "./Details.redux.js";
import { useStyles } from "./Details.styles.js";

const Details = ({ item, refreshing }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { inboxType, constituent } = useReduxSlice(item.caseID);

  if (item === undefined) return <DetailsPlaceHolder />;

  const {
    id,
    caseID,
    from,
    to,
    cc,
    bcc,
    subject,
    assignedTo,
    attachments,
    dateTime,
  } = item;

  return (
    <header className={classes.details}>
      <InboxBulkActions />
      {refreshing && <RefreshOverlay />}
      <div className={classes.detailsContainer}>
        <div className={classes.innerContainer}>
          <div>
            <ItemViewHeading item={item} />
            <AddressField
              label={
                inboxType === "inbox" ? iln.gettext("To") : iln.gettext("From")
              }
              addresses={inboxType === "inbox" ? to : from}
            />
            <AddressField label={iln.gettext("Cc")} addresses={cc} />
            <AddressField label={iln.gettext("Bcc")} addresses={bcc} />
            <Subject subject={subject} />
            {inboxType !== "sent" && (
              <AssignedTo assignedTo={assignedTo} emailID={id} />
            )}{" "}
            <ConstituentAndCase
              caseID={caseID}
              item={item}
              constituent={constituent}
            />
            <AttachmentList attachments={attachments} />
          </div>
          <div className={classes.actionAndDateContainer}>
            <DateTime dateTime={dateTime} />
            <Actions item={item} constituent={constituent} />
          </div>
        </div>
      </div>
    </header>
  );
};

Details.propTypes = propTypes;

export default Details;
