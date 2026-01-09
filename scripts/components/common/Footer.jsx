import { createUseStyles, useTheme } from "react-jss";

import { Button } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  footer: {
    backgroundColor: ({ theme }) => theme.colors.blue,
    textAlign: "right",
    paddingRight: 20,
    "@media print": {
      display: "none",
    },
  },
  footerButton: {
    color: "white",
    fontSize: "70%",
  },
});

const Footer = ({ onClick }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: "#footer { display: none }",
        }}
      />
      <div className={classes.footer}>
        <Button
          type="text"
          onClick={onClick}
          customClassNames={classes.footerButton}
        >
          Jump to Top
        </Button>
      </div>
    </React.Fragment>
  );
};

Footer.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Footer;
