import React, { useContext } from "react";
import {
  constituentTypeID,
  organisationTypeID,
} from "../../consts/contactTypeIDs.js";

import ContactSelect from "../../ContactSelect/ContactSelect.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { cleanseContactLists } from "../../helpers/contactList/cleanseContactLists";
import explodeAllEmailAddresses from "./helpers/explodeAllEmailAddresses.js";
import filterContactsWithoutEmail from "./helpers/filterContactsWithoutEmail.js";
import formatForAutoComplete from "../../helpers/contactList/formatForAutoComplete/formatForAutoComplete.js";
import formatForAutoCompleteConstituent from "../../helpers/contactList/formatForAutoComplete/formatForAutoCompleteConstituent";
import groupByContactType from "../../helpers/contactList/groupByContactType.js";
import propTypes from "./EmailContactSelect.propTypes.js";

const EmailContactSelect = ({ contactType, onContactSelect, constituent }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const constituentSelected =
    contactType.id === constituentTypeID ||
    contactType.id === organisationTypeID;

  // The contact select uses two different data sources dependent on the contact type that is chosen
  // When selecting the constituent / organisation the constituent or organisation that is passed in is used.
  // Otherwise, an HTTP request is sent to the contactLists endpoint.
  const dataSource = async (searchTerm, signal) =>
    constituentSelected
      ? [constituent]
      : api.searchContactLists(
          contactType.id,
          searchTerm,
          modalActions,
          iln,
          signal
        );

  return (
    <ContactSelect
      contactTypeId={contactType.id}
      question={contactType.question}
      constructDropDownItems={(result, highlightMatches) =>
        highlightMatches(
          Object.values(result)
            .filter((x) => !!x)
            .join(", ")
        )
      }
      onContactSelect={({ value }) => onContactSelect(value)}
      dataSource={(searchTerm, signal) =>
        dataSource(searchTerm, signal).then((contactLists) => {
          const removeOrgOnlyOption = contactType.disable_org_only;

          const cleansedContactLists = cleanseContactLists(contactLists);
          const contactsByGroup = groupByContactType(cleansedContactLists);
          const entryPerEmail = explodeAllEmailAddresses(contactsByGroup);

          let readyForAutoComplete;

          // If the constituent or organisation option is selected the contacts are displayed within different groups
          if (constituentSelected) {
            readyForAutoComplete = formatForAutoCompleteConstituent(
              entryPerEmail[0],
              true
            );
          } else {
            readyForAutoComplete = formatForAutoComplete(
              entryPerEmail,
              true,
              removeOrgOnlyOption
            );
          }

          const filteredContacts =
            filterContactsWithoutEmail(readyForAutoComplete);

          return filteredContacts;
        })
      }
    />
  );
};

EmailContactSelect.propTypes = propTypes;

export default EmailContactSelect;
