import { FlexBox } from "@electedtech/electedtech-ui";
import React from "react";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  "@global": {
    ".innercontainer": {
      // reset .innerContainer
      margin: 0,
      width: "100%",
      padding: 0,
      maxWidth: "unset",
    },
  },
  content: {
    width: "97.5%",
    maxWidth: 1500,
    minWidth: 600,
    margin: {
      top: 10,
    },
  },
});

const Page = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <FlexBox {...props} hAlign="center">
      <div className={classes.content}>{children}</div>
    </FlexBox>
  );
};

Page.propTypes = {
  children: propTypes.node,
};

export default Page;
