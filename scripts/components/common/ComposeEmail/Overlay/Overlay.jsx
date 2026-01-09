import { FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./Overlay.propTypes";
import { useStyles } from "./Overlay.styles";

const Overlay = ({ text = "Loading" }) => {
  const classes = useStyles();

  return (
    <div className={classes.overlayContainer}>
      <FlexBox hAlign={"space-around"}>
        <div className={classes.textContainer}>
          <Spinner scale={1} />
          <div>{text}</div>
        </div>
      </FlexBox>
    </div>
  );
};

Overlay.propTypes = propTypes;
export default Overlay;
