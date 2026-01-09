/* global $, emailMarkedAction */
import React, { useEffect, useState } from "react";

import { Placeholder } from "@electedtech/electedtech-ui";
import UpdateCaseDetails from "../../common/UpdateCaseDetails";
import api from "@electedtech/api";
import sortCasenotes from "../../ViewCase/helpers/sortCasenotes";

const UpdateCaseDetailsWrapper = () => {
  const [caseID, setCaseID] = useState();
  const [emailID, setEmailID] = useState();
  const [caseworkers, setCaseworkers] = useState();
  const [casenotes, setCasenotes] = useState();
  const [caseDetails, setCaseDetails] = useState();

  useEffect(() => {
    // define a global function to set caseID
    window.setUpdateCaseModalID = (caseID) => setCaseID(caseID);
    // define a global function to set emailID
    window.setUpdateEmailModalID = (emailID) => setEmailID(emailID);

    return () => {
      // delete global caseID setter function on unmount
      delete window.setUpdateCaseModalID;
      // delete global emailID setter function on unmount
      delete window.setUpdateEmailModalID;
    };
  }, []);

  useEffect(() => {
    setCaseDetails();
    setCaseworkers();
    setCasenotes();

    if (caseID) {
      api.getCase(caseID).then((caseDetails) => {
        setCaseDetails(caseDetails);
      });
      api
        .getCaseworkersForCase(caseID)
        .then((caseworkers) => setCaseworkers(caseworkers));
      api
        .getAllCasenotes(caseID, { page: 1, orderBy: "DESC" })
        .then(({ results }) => setCasenotes(sortCasenotes(results)));
    }
  }, [caseID]);

  if (!caseworkers || !casenotes || !caseDetails)
    return (
      <Placeholder width="60vw" height="300px" style={{ maxWidth: 900 }} />
    );

  return (
    <UpdateCaseDetails
      caseworkers={caseworkers}
      caseDetails={caseDetails}
      casenotes={casenotes}
      setCaseDetails={(caseDetails) => setCaseDetails(caseDetails)}
      addCasenote={(newCasenote) =>
        setCasenotes(sortCasenotes([...casenotes, newCasenote]))
      }
      updateCasenoteByID={({ noteId, casenote: updatedCasenote }) =>
        setCasenotes(
          casenotes.map((casenote) =>
            casenote?.detail?.id === noteId ? updatedCasenote : casenote
          )
        )
      }
      closeModal={() => {
        $("#changestatus").trigger("reveal:close");
      }}
      onMarkAsActioned={() => {
        emailMarkedAction(emailID, false);
      }}
    />
  );
};

export default UpdateCaseDetailsWrapper;
