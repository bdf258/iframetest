import React, { useContext } from "react";

import ContactTypeList from "../../ContactTypeList/ContactTypeList.jsx";
import { TranslationContext } from "context/translate";
import { constituentHasConnectionsWithEmailAddresses } from "../../helpers/constituent/constituentHasConnectionsWithEmailAddresses";
import { constituentHasEmailAddress } from "../../helpers/constituent/constituentHasEmail";
import createDirectContactTypeOption from "../../helpers/createDirectContactTypeOption.js";
import propTypes from "./EmailContactTypeList.propTypes.js";
import { someoneElseTypeID } from "../../consts/contactTypeIDs.js";

const EmailContactTypeList = ({
  onContactTypeSelect,
  constituent,
  contactTypes,
}) => {
  const iln = useContext(TranslationContext);

  const addConstituentTypeOption = () => {
    if (
      constituentHasEmailAddress(constituent) ||
      constituentHasConnectionsWithEmailAddresses(constituent)
    ) {
      return [createDirectContactTypeOption(constituent, iln)];
    }
    return [];
  };

  return (
    <ContactTypeList
      contactTypes={[
        ...contactTypes,
        ...addConstituentTypeOption(),
        {
          id: someoneElseTypeID,
          name: iln.gettext("Someone Else"),
        },
      ]}
      onContactTypeSelect={onContactTypeSelect}
    />
  );
};

EmailContactTypeList.propTypes = propTypes;

export default EmailContactTypeList;
