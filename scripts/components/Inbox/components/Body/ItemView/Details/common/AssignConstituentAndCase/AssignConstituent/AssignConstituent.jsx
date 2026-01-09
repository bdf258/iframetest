import React, { useEffect } from "react";

import AssignConstituentPlaceholder from "./AssignConstituentPlaceholder.jsx";
import MatchingNames from "./MatchingNames/MatchingNames.jsx";
import MultipleMatches from "./MultipleMatches/MultipleMatches.jsx";
import NoMatchingConstituents from "./NoMatchingConstituents/NoMatchingConstituents.jsx";
import { Switcher } from "@electedtech/electedtech-ui";
import propTypes from "./propTypes.js";
import useGetConstituentMatches from "../../../../../common/hooks/useGetConstituentMatches.js";
import { useReduxSlice } from "./AssignConstituent.redux.js";

const AssignConstituent = ({
  onConstituentSelect,
  onCaseSelect,
  onElectoralRollSelect,
  onClickCreateConstituent,
  onClickCreateOrganisation,
  onClickSearchAllConstituents,
}) => {
  const { focusedItem } = useReduxSlice();

  const {
    loading,
    matchingConstituents,
    electoralRollMatches,
    resultType: view,
  } = useGetConstituentMatches(focusedItem);

  useEffect(() => {
    if (view === "oneMatch") {
      onConstituentSelect({
        ...matchingConstituents[0],
        group: "One Match",
      });
    }
  }, [view]);

  if (loading || view === "oneMatch") return <AssignConstituentPlaceholder />;

  return (
    <Switcher selected={view}>
      {{
        matchingNames: (
          <MatchingNames
            matchingConstituents={matchingConstituents}
            onConstituentSelect={onConstituentSelect}
            electoralRollMatches={electoralRollMatches}
            onElectoralRollSelect={onElectoralRollSelect}
            onClickCreateConstituent={onClickCreateConstituent}
            onClickCreateOrganisation={onClickCreateOrganisation}
            onClickSearchAllConstituents={onClickSearchAllConstituents}
            inboxItemType={focusedItem?.type.toLowerCase()}
          />
        ),
        noMatches: (
          <NoMatchingConstituents
            onConstituentSelect={onConstituentSelect}
            onElectoralRollSelect={onElectoralRollSelect}
            onCaseSelect={onCaseSelect}
            constituents={matchingConstituents}
            onClickCreateConstituent={onClickCreateConstituent}
            onClickCreateOrganisation={onClickCreateOrganisation}
            inboxItemType={focusedItem?.type.toLowerCase()}
          />
        ),
        multipleMatches: (
          <MultipleMatches
            onConstituentSelect={onConstituentSelect}
            matchingConstituents={matchingConstituents}
            onClickCreateConstituent={onClickCreateConstituent}
            onClickCreateOrganisation={onClickCreateOrganisation}
            onClickSearchAllConstituents={onClickSearchAllConstituents}
            inboxItemType={focusedItem?.type.toLowerCase()}
          />
        ),
      }}
    </Switcher>
  );
};

AssignConstituent.propTypes = propTypes;

export default AssignConstituent;
