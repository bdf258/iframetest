import React, { useContext } from "react";

import { FlexBox } from "@electedtech/electedtech-ui";
import Page from "../Page.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./ErrorPage.propTypes";
import { useStyles } from "./ErrorPage.styles";

const ErrorPage = ({ statusCode = "404", errorDetails }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const getGenericErrorDetails = (statusCode) => {
    switch (statusCode) {
      case "403":
        return {
          title: statusCode,
          message: iln.gettext(`You do not have permission to view this page.`),
          subtitle: iln.gettext(`Forbidden`),
        };
      case "404":
        return {
          title: statusCode,
          message: iln.gettext(`This page doesn't exist.`),
          subtitle: iln.gettext(`Not Found`),
        };
      default:
        return {
          title: iln.gettext("Error"),
          message: iln.gettext(`There was an error while loading this page.`),
          subtitle: iln.gettext(`Something went wrong`),
        };
    }
  };

  const { title, subtitle, message } =
    errorDetails || getGenericErrorDetails(statusCode, iln);

  return (
    <Page>
      <FlexBox vAlign="center" hAlign="center" className={classes.container}>
        <div>
          <div className={classes.title}>{title}</div>
          <div className={classes.subtitle}>{subtitle}</div>
          <div className={classes.message}>
            {message}
            <br />
            <br />
            <a href="/home.php">{iln.gettext("Go to Homepage")}</a>.
          </div>
        </div>
      </FlexBox>
    </Page>
  );
};

ErrorPage.propTypes = propTypes;

export default ErrorPage;
