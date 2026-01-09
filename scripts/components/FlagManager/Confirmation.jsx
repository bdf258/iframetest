import { Button, FlexBox, NotificationBox } from "@electedtech/electedtech-ui";

import { PropTypes } from "prop-types";
import React from "react";

const Confirmation = ({ action, resetWizard, actionSummary }) => {
  const upperCaseAction = (action) => {
    if (action) {
      return action.charAt(0).toUpperCase() + action.slice(1);
    }
  };

  return (
    <React.Fragment>
      <NotificationBox
        alertMessage={`${upperCaseAction(action)} complete`}
        type={"success"}
      />
      <ul>
        {actionSummary.flagsRemovedFromConstituents !== undefined ? (
          <li>{`${actionSummary.flagsRemovedFromConstituents} flag${
            +actionSummary.flagsRemovedFromConstituents >= 2 ? "s" : ""
          } removed from constituents`}</li>
        ) : null}
        {actionSummary.flagsCreated !== undefined ? (
          <li>{`${actionSummary.flagsCreated} flag${
            +actionSummary.flagsCreated >= 2 ? "s" : ""
          } created`}</li>
        ) : null}
        {actionSummary.flagsDeleted !== undefined ? (
          <li>{`${actionSummary.flagsDeleted} flag${
            +actionSummary.flagsDeleted >= 2 ? "s" : ""
          } deleted`}</li>
        ) : null}
        {actionSummary.flagsAddedToConstituents !== undefined ? (
          <li>{`${actionSummary.flagsAddedToConstituents} flag${
            +actionSummary.flagsAddedToConstituents >= 2 ? "s" : ""
          } added to constituents`}</li>
        ) : null}
        {actionSummary.count !== undefined ? (
          <li>{`${actionSummary.count} flag${
            +actionSummary.count >= 2 ? "s" : ""
          } renamed`}</li>
        ) : null}
      </ul>
      <FlexBox hAlign={"flex-end"}>
        <Button onClick={() => resetWizard()}>Back to flag manager</Button>
      </FlexBox>
    </React.Fragment>
  );
};

Confirmation.propTypes = {
  action: PropTypes.string,
  actionSummary: PropTypes.any,
  resetWizard: PropTypes.func.isRequired,
};

export default Confirmation;
