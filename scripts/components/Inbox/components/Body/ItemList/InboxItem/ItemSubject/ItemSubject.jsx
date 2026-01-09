import React from "react";
import propTypes from "./ItemSubject.propTypes.js";
import { subjectFilterType } from "../../../../Header/Filters/FilterTypeSelect/FilterTypeSelect.jsx";
import useGetSearchableText from "../../../../../hooks/useGetSearchableText.js";

const ItemSubject = ({ subject }) => {
  const searchableText = useGetSearchableText(subject, subjectFilterType);

  return <div>{searchableText}</div>;
};

ItemSubject.propTypes = propTypes;

export default ItemSubject;
