import DraftEmailActions from "./DraftEmailActions/DraftEmailActions.jsx";
import InboundEmailActions from "./InboundEmailActions/InboundEmailActions.jsx";
import React from "react";
import SMSActions from "./SMSActions/SMSActions.jsx";
import proptypes from "./Actions.propTypes.js";

const Actions = ({ item, constituent }) => {
  if (item.type in { "external-new": true })
    return <InboundEmailActions email={item} constituent={constituent} />;

  if (item.type in { "SMS-inbound": true, "whatsapp-inbound": true })
    return <SMSActions sms={item} constituent={constituent} />;

  if (item.type in { draft: true })
    return <DraftEmailActions email={item} constituent={constituent} />;

  return null;
};

Actions.propTypes = proptypes;

export default Actions;
