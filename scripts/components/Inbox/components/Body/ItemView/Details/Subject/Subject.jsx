import React from "react";
import propTypes from "./propTypes";
import { subjectFilterType } from "../../../../Header/Filters/FilterTypeSelect/FilterTypeSelect.jsx";
import useGetSearchableText from "../../../../../hooks/useGetSearchableText.js";
import { useStyles } from "./styles";

const Subject = ({ subject }) => {
  const classes = useStyles();

  const searchableText = useGetSearchableText(subject, subjectFilterType);

  return <div className={classes.subject}>{searchableText}</div>;
};

Subject.propTypes = propTypes;

export default Subject;
