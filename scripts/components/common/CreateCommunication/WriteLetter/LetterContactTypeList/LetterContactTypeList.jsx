import React, { useContext } from "react";

import ContactTypeList from "../../ContactTypeList/ContactTypeList.jsx";
import { TranslationContext } from "context/translate";
import createDirectContactTypeOption from "../../helpers/createDirectContactTypeOption.js";
import propTypes from "./LetterContactTypeList.propTypes.js";
import { useReduxSlice } from "./LetterContactTypes.redux";

const LetterContactTypeList = ({ onContactTypeSelect, constituent }) => {
  const iln = useContext(TranslationContext);

  const { contactTypes } = useReduxSlice();

  return (
    <ContactTypeList
      contactTypes={[
        ...contactTypes,
        createDirectContactTypeOption(constituent, iln),
      ]}
      onContactTypeSelect={onContactTypeSelect}
    />
  );
};

LetterContactTypeList.propTypes = propTypes;

export default LetterContactTypeList;
