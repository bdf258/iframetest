import { AutoComplete, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import TranslationContext from "../../../../../../../context/translation/TranslationContext";
import api from "@electedtech/api";
import { defaultToReturn } from "../../hooks/useGetConstituentMatches";
import { getInstallationPreferences } from "../../../../../../../helpers/localStorageHelper";
import prefixCaseID from "../../../../../../../helpers/prefixCaseID";
import propTypes from "./ConstituentAndCaseSearch.propTypes";

const { casePrefix } = getInstallationPreferences() || {};

const isCaseSearch = (searchText = "") =>
  searchText.toLowerCase().startsWith(casePrefix.toLowerCase());

const joinDetails = (
  {
    title,
    firstname,
    firstName,
    surname,
    isOrganisation,
    isConnection,
    organisation,
    role,
    address1,
    town,
    county,
    postcode,
    registeredAddress1,
    registeredTown,
    registeredState,
    registeredPostcode,
    caseID,
  },
  separator,
  highlight
) => {
  const toDisplay = [];

  const names = [title, firstName || firstname, surname];
  const addresses = [
    registeredAddress1 || address1,
    registeredTown || town,
    registeredState || county,
    registeredPostcode || postcode,
  ];
  const hasCaseID = caseID !== undefined;

  if (hasCaseID) toDisplay.push(highlight(prefixCaseID(caseID)));

  if (isOrganisation) {
    if (typeof organisation == "string" && organisation.trim() !== "") {
      toDisplay.push(
        <React.Fragment>{highlight(organisation)}</React.Fragment>
      );
    }
  } else {
    if (names.some((x) => typeof x == "string" && x.trim() !== "")) {
      toDisplay.push(
        names
          .filter((x) => typeof x === "string" && x.trim() !== "")
          .map((x, i, { length }) => (
            <React.Fragment key={`n${i}`}>
              {highlight(x)}{" "}
              {i + 1 < length ? (
                " "
              ) : isConnection ? (
                <React.Fragment>
                  ({highlight(organisation)}, {role})
                </React.Fragment>
              ) : (
                ""
              )}
            </React.Fragment>
          ))
      );
    }
  }

  if (addresses.some((x) => typeof x == "string" && x.trim() !== "")) {
    toDisplay.push(
      addresses
        .filter((x) => typeof x === "string" && x.trim() !== "")
        .map((x, i, { length }) => (
          <React.Fragment key={`a${i}`}>
            {highlight(x)}
            {i + 1 < length ? " " : ""}
          </React.Fragment>
        ))
    );
  }

  // add separator between blocks of details
  return toDisplay.flatMap((x, i, { length }) =>
    i + 1 != length ? [x, separator] : x
  );
};

const ConstituentAndCaseSearch = ({
  onConstituentSelect,
  onCaseSelect,
  onElectoralRollSelect,
  extraColumnsToReturn = {},
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const toReturn = {
    ...defaultToReturn,
    ...extraColumnsToReturn,
    constituent: [
      ...defaultToReturn.constituent,
      ...(extraColumnsToReturn?.constituent || []),
    ],
  };

  return (
    <AutoComplete
      dataSource={async (searchText) => {
        if (searchText.length < 3) return [];

        if (isCaseSearch(searchText) && onCaseSelect)
          return api
            .searchCasesById(searchText.match(/\d+/)[0], modalActions, iln)
            .then((results = []) =>
              results.map((r) => ({
                ...r,
                group: iln.gettext("Case Database"),
                onSelect: onCaseSelect,
              }))
            );

        return api
          .getConstituentMatches({
            term: searchText,
            searchRoll: true,
            toReturn,
          })
          .then(({ constituentMatches = [], electoralMatches = [] } = {}) => [
            ...constituentMatches.reduce((prev, cur) => {
              const { connections = [], ...match } = cur;

              return [
                ...prev,
                {
                  ...match,
                  group: iln.gettext("Constituent Database"),
                  onSelect: onConstituentSelect,
                },
                ...connections.map(({ detail, role }) => ({
                  ...detail,
                  organisation: cur.organisation,
                  isConnection: true,
                  role,
                  group: iln.gettext("Constituent Database"),
                  onSelect: onConstituentSelect,
                })),
              ];
            }, []),
            ...(onElectoralRollSelect ? electoralMatches : []).map((match) => ({
              ...match,
              group: iln.gettext("Roll Matches"),
              onSelect: onElectoralRollSelect,
            })),
          ]);
      }}
      placeholder={iln.gettext(
        "Enter a constituent name, organisation name or address"
      )}
      onResultClick={({ onSelect, ...result }) => onSelect(result)}
      constructDropDownItems={(result, highlight) =>
        joinDetails(result, " - ", highlight)
      }
    />
  );
};

ConstituentAndCaseSearch.propTypes = propTypes;

export default ConstituentAndCaseSearch;
