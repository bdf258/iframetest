import React from "react";
import classnames from "classnames";
import propTypes from "./Hr.propTypes";
import useStyles from "./Hr.styles";

const Hr = ({ children, margin = 20, className, ...props }) => {
  const classes = useStyles({ margin });

  return children ? (
    <div className={classnames(classes.hrText, className)} {...props}>
      {children}
    </div>
  ) : (
    <hr className={classnames(className)} {...props} />
  );
};

Hr.propTypes = propTypes;

export default Hr;
