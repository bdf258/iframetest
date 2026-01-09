import React, { useContext, useEffect, useMemo } from "react";

import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import TranslationContext from "context/translate";
import propTypes from "./propTypes";

const createNewConstituentID = "createNewConstituent";
const createNewOrganisationID = "createNewOrganisation";

const SelectConstituent = ({
  keepErrorSpacing,
  matchingConstituents = [],
  electoralRollMatches = [],
  onConstituentSelect,
  onElectoralRollSelect,
  onCreateNewConstituent,
  onCreateNewOrganisation,
  customClassNames = {},
  label,
  name,
  value,
}) => {
  const iln = useContext(TranslationContext);

  const options = useMemo(
    () => [
      ...matchingConstituents.map((x) => ({
        ...x,
        onSelect: onConstituentSelect,
      })),
      ...electoralRollMatches.map((x) => ({
        ...x,
        onSelect: onElectoralRollSelect,
      })),
      ...(onCreateNewConstituent
        ? [
            {
              id: createNewConstituentID,
              value: createNewConstituentID,
              optionText: `-- ${iln.gettext("Create new constituent")} --`,
              onSelect: onCreateNewConstituent,
            },
          ]
        : []),
      ...(onCreateNewOrganisation
        ? [
            {
              id: createNewOrganisationID,
              value: createNewOrganisationID,
              optionText: `-- ${iln.gettext("Create new organisation")} --`,
              onSelect: onCreateNewOrganisation,
            },
          ]
        : []),
    ],
    [
      matchingConstituents,
      electoralRollMatches,
      onCreateNewOrganisation,
      onCreateNewConstituent,
    ]
  );

  useEffect(() => {
    if (matchingConstituents?.length === 1) {
      const onlyConstituentMatch = matchingConstituents[0];
      onConstituentSelect(onlyConstituentMatch);
    }
  }, [matchingConstituents?.map(({ id }) => id).join(",")]);

  return (
    <FormSelectAutoComplete
      value={value}
      keepErrorSpacing={keepErrorSpacing}
      name={name}
      customClassNames={customClassNames}
      label={label}
      onChange={({
        target: {
          value: { onSelect, ...result },
        },
      }) => {
        onSelect(result);
      }}
    >
      {options.map((option, index) => {
        const {
          group,
          title,
          firstname,
          firstName,
          surname,
          organisation,
          address1,
          address2,
          town,
          county,
          postcode,
          registeredAddress1,
          registeredAddress2,
          registeredTown,
          registeredCounty,
          registeredPostcode,
          optionText,
        } = option;

        return (
          <option key={index} value={option} group={group}>
            {optionText ||
              [
                [title, firstName || firstname, surname]
                  .filter((x) => x)
                  .map((x) => x.trim())
                  .join(" "),
                organisation,
                registeredAddress1 || address1,
                registeredAddress2 || address2,
                registeredTown || town,
                registeredCounty || county,
                registeredPostcode || postcode,
              ]
                .filter((x) => x)
                .map((x) => x.trim())
                .join(", ")}
          </option>
        );
      })}
    </FormSelectAutoComplete>
  );
};

SelectConstituent.propTypes = propTypes;

export default SelectConstituent;
