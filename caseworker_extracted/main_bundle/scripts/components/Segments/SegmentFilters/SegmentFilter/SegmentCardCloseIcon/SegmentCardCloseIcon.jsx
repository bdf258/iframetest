import { Button } from "@electedtech/electedtech-ui";
import CrossIcon from "../../../../common/icons/CrossIcon.jsx";
import React from "react";
import propTypes from "./SegmentCardCloseIcon.propTypes";
import { useStyles } from "./SegmentCardCloseIcon.styles";

const SegmentCardCloseIcon = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.iconContainer}>
      <Button onClick={onClick} type={"text"}>
        <CrossIcon width={20} height={20} colour={classes.iconColour} />
      </Button>
    </div>
  );
};

SegmentCardCloseIcon.propTypes = propTypes;
export default SegmentCardCloseIcon;
