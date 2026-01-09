import React, { useContext } from "react";

import { FlexBox } from "@electedtech/electedtech-ui";
import Page from "./Page.jsx";
import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  container: { height: "calc(100vh - 130px)", flexFlow: "column" },
  title: {
    fontSize: "10em",
    fontWeight: 600,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "3em",
    textAlign: "center",
    fontWeight: 300,
  },
  message: {
    width: 650,
    fontSize: "1.5em",
    textAlign: "center",
    fontWeight: 300,
    margin: { top: "1em", bottom: "1em" },
  },
});

const ErrorPage = ({ message, subtitle, statusCode }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <Page>
      <FlexBox vAlign="center" hAlign="center" className={classes.container}>
        <div className={classes.title}>{statusCode}</div>
        <div className={classes.subtitle}>{subtitle}</div>
        <div className={classes.message}>
          {message}
          <br />
          <br />
          <a href="/home.php">{iln.gettext("Go to Homepage")}</a>.
        </div>
      </FlexBox>
    </Page>
  );
};

ErrorPage.propTypes = {
  message: propTypes.string,
  statusCode: propTypes.string,
  subtitle: propTypes.string,
};

export default ErrorPage;
