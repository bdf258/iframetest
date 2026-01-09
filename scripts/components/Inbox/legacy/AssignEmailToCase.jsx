/*global doassigncase, emailID, constituentID */

import CreateCase from "../../common/CreateCase";
import React from "react";

const AssignEmailToCase = () => {
  return (
    <CreateCase
      constituentID={constituentID}
      createButtonText="Create Case and Assign Email"
      onCreateCase={({ id: caseID }) => {
        doassigncase(caseID, emailID, constituentID);
      }}
    />
  );
};

export default AssignEmailToCase;
