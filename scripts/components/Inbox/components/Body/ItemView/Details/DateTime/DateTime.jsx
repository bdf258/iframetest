import React from "react";
import format from "date-fns/format";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const DateTime = ({ dateTime }) => {
  const classes = useStyles();

  return (
    <div className={classes.dateTime}>
      {format(new Date(`${dateTime.replace(" ", "T")}Z`), "d MMMM yyyy HH:mm")}
    </div>
  );
};

DateTime.propTypes = propTypes;

export default DateTime;
