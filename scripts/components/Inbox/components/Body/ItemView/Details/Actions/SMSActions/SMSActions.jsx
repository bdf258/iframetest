import { ButtonBar } from "@electedtech/electedtech-ui";
import Delete from "../common/Delete/Delete.jsx";
import MarkActioned from "../common/MarkActioned/MarkActioned.jsx";
import React from "react";
import Reply from "./Reply/Reply.jsx";
import propTypes from "./SMSActions.propTypes.js";

const SMSActions = ({ sms }) => {
  if (!sms?.caseID)
    return (
      <ButtonBar>
        <Delete item={sms} />
      </ButtonBar>
    );

  return (
    <ButtonBar>
      <Reply sms={sms} />
      <MarkActioned item={sms} />
    </ButtonBar>
  );
};

SMSActions.propTypes = propTypes;

export default SMSActions;
