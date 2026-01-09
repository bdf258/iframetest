import ErrorPage from "../../common/ErrorPage.jsx";
import PropTypes from "./ViewCaseErrorPage.propTypes.js";
import React from "react";

const ViewCaseErrorPage = ({ statusCode = "404", caseID, iln }) => {
  const errorDetails = (code) => {
    switch (code) {
      case "403":
        return {
          message: iln.gettext(
            `You do not have permission to view case with ID: ${caseID}.`
          ),
          subtitle: iln.gettext(`Forbidden Case Details`),
        };
      case "404":
        return {
          message: iln.gettext(`The Case with ID: ${caseID} doesn't exist.`),
          subtitle: iln.gettext(`Case Not Found`),
        };
      default:
        return {
          message: iln.gettext(
            `There was an error loading case with ID: ${caseID}.`
          ),
          subtitle: iln.gettext(`Something went wrong`),
        };
    }
  };

  const { message, subtitle } = errorDetails(statusCode);

  return (
    <ErrorPage message={message} subtitle={subtitle} statusCode={statusCode} />
  );
};

ViewCaseErrorPage.propTypes = PropTypes;

export default ViewCaseErrorPage;
