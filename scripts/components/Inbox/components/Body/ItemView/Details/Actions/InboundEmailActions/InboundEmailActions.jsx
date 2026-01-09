import { ButtonBar, Placeholder } from "@electedtech/electedtech-ui";

import Delete from "../common/Delete/Delete.jsx";
import Forward from "./Forward/Forward.jsx";
import MarkActioned from "../common/MarkActioned";
import QuickReplyButton from "./QuickReply/QuickReplyButton/QuickReplyButton.jsx";
import React from "react";
import Reply from "./Reply/Reply.jsx";
import ReplyAll from "./ReplyAll/ReplyAll.jsx";
import proptypes from "./InboundEmailActions.propTypes.js";
import { useStyles } from "./InboundEmailActions.styles.js";

const EmailActions = ({ email, constituent }) => {
  const classes = useStyles();

  const { caseID } = email;

  if (!caseID) {
    return (
      <div className={classes.actions}>
        <ButtonBar>
          <QuickReplyButton email={email} />
          <Delete item={email} />
        </ButtonBar>
      </div>
    );
  }

  if (!constituent) {
    return <Placeholder height={27} width={300} />;
  }

  return (
    <div className={classes.actions}>
      <ButtonBar>
        <Reply email={email} constituent={constituent} />
        <ReplyAll email={email} constituent={constituent} />
        <Forward email={email} constituent={constituent} />
      </ButtonBar>
      <ButtonBar>
        <MarkActioned item={email} />
      </ButtonBar>
    </div>
  );
};

EmailActions.propTypes = proptypes;

export default EmailActions;
