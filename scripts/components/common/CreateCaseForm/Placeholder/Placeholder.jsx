import { Placeholder } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inputPlaceholder: { margin: { bottom: 8 } },
});

const FormPlaceholder = ({ includeConnectionsPlaceholder }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Placeholder
        key={1}
        width="100%"
        height={32}
        className={classes.inputPlaceholder}
      />
      <Placeholder
        key={2}
        width="100%"
        height={32}
        className={classes.inputPlaceholder}
      />
      <Placeholder
        key={3}
        width="100%"
        height={32}
        className={classes.inputPlaceholder}
      />
      <Placeholder
        key={4}
        width="100%"
        height={32}
        className={classes.inputPlaceholder}
      />
      <Placeholder
        key={5}
        width="100%"
        height={32}
        className={classes.inputPlaceholder}
      />
      <Placeholder
        key={6}
        width="100%"
        height={32}
        className={classes.inputPlaceholder}
      />
      <Placeholder
        key={7}
        width="100%"
        height={32}
        className={classes.inputPlaceholder}
      />
      {includeConnectionsPlaceholder && (
        <Placeholder
          key={8}
          width="100%"
          height={32}
          className={classes.inputPlaceholder}
        />
      )}
      <Placeholder
        key={9}
        width="100%"
        height={122}
        className={classes.inputPlaceholder}
      />
    </React.Fragment>
  );
};

FormPlaceholder.propTypes = { includeConnectionsPlaceholder: PropTypes.bool };

export default FormPlaceholder;
