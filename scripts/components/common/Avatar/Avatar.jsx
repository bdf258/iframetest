import {
  getInitials,
  getTextColor,
  stringToRBG,
} from "../../../helpers/avatarHelpers";

import { FlexBox } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "prop-types";
import useStyles from "./Avatar.styles";

const Avatar = ({ initials, fullname }) => {
  const avatarColor = stringToRBG(fullname || initials);
  const classes = useStyles({
    avatarColor,
    textColor: getTextColor(avatarColor),
  });

  return (
    <FlexBox className={classes.avatar} vAlign="center" hAlign="center">
      <div title={fullname}>
        {initials || getInitials(fullname) || (
          <span className={classes.questionMark}>?</span>
        )}
      </div>
    </FlexBox>
  );
};

Avatar.propTypes = {
  fullname: propTypes.string,
  initials: propTypes.string,
};

export default Avatar;
