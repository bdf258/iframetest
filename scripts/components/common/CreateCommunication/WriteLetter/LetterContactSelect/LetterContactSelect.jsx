import {
  constituentTypeID,
  organisationTypeID,
} from "../../consts/contactTypeIDs";

import ContactSelect from "../../ContactSelect/ContactSelect.jsx";
import React from "react";
import { cleanseContactLists } from "../../helpers/contactList/cleanseContactLists";
import formatForAutoComplete from "../../helpers/contactList/formatForAutoComplete/formatForAutoComplete";
import formatForAutoCompleteConstituent from "../../helpers/contactList/formatForAutoComplete/formatForAutoCompleteConstituent";
import groupByContactType from "../../helpers/contactList/groupByContactType.js";
import propTypes from "./LetterContactSelect.propTypes.js";
import { removeDuplicateEntriesForEntityInGroup } from "../helpers/removeDuplicateEntriesForEntityInGroup";
import { removePersonalContactsWithoutAddress } from "../helpers/removePersonalContactsWithoutAddress";

const LetterContactSelect = ({ contactType, onContactSelect, dataSource }) => {
  const constituentSelected =
    contactType.id === constituentTypeID ||
    contactType.id === organisationTypeID;

  return (
    <ContactSelect
      contactTypeId={contactType.id}
      constructDropDownItems={(result, highlightMatches) =>
        highlightMatches(
          Object.values(result)
            .filter((x) => !!x)
            .join(", ")
        )
      }
      question={contactType.question}
      onContactSelect={onContactSelect}
      dataSource={(searchTerm, signal) =>
        dataSource(searchTerm, signal).then((contactLists) => {
          const removeOrgOnlyOption = contactType.disable_org_only;

          const cleansedContactLists = cleanseContactLists(contactLists);
          const contactsByGroup = groupByContactType(cleansedContactLists);

          const contactsByGroupWithAddresses =
            removePersonalContactsWithoutAddress(contactsByGroup);

          let readyForAutoComplete;

          // If the constituent or organisation option is selected the contacts are displayed within different groups
          if (constituentSelected) {
            readyForAutoComplete = formatForAutoCompleteConstituent(
              contactsByGroupWithAddresses[0]
            );
          } else {
            readyForAutoComplete = formatForAutoComplete(
              contactsByGroupWithAddresses,
              false,
              removeOrgOnlyOption
            );
          }

          const dedupedOptionsForDisplay =
            removeDuplicateEntriesForEntityInGroup(readyForAutoComplete);

          return dedupedOptionsForDisplay;
        })
      }
    />
  );
};

LetterContactSelect.propTypes = propTypes;

export default LetterContactSelect;
