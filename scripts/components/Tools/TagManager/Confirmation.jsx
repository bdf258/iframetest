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
        {actionSummary.tagsRemovedFromCases !== undefined ? (
          <li>{`${actionSummary.tagsRemovedFromCases} tags removed from cases`}</li>
        ) : null}
        {actionSummary.tagsCreated !== undefined ? (
          <li>{`${actionSummary.tagsCreated} tags created`}</li>
        ) : null}
        {actionSummary.tagsDeleted !== undefined ? (
          <li>{`${actionSummary.tagsDeleted} tags deleted`}</li>
        ) : null}
        {actionSummary.tagsAddedToCases !== undefined ? (
          <li>{`${actionSummary.tagsAddedToCases} tags added to cases`}</li>
        ) : null}
        {actionSummary.count !== undefined ? (
          <li>{`${actionSummary.count} tags renamed`}</li>
        ) : null}
      </ul>
      <FlexBox hAlign={"flex-end"}>
        <Button onClick={() => resetWizard()}>Back to tag manager</Button>
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
