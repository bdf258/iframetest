import { useContext, useEffect, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../context/translation/TranslationContext";
import api from "@electedtech/api";

export const defaultToReturn = {
  constituent: [
    "id",
    "title",
    "firstName",
    "surname",
    "address1",
    "address2",
    "town",
    "county",
    "postcode",
    "registeredAddress1",
    "registeredAddress2",
    "registeredTown",
    "registeredState",
    "registeredPostcode",
    "organisation",
    "isOrganisation",
    "role",
    "organisationType",
    "email",
    "mobile",
    "telephone",
  ],
};

export const getMatchingConstituents = async (
  from = {},
  { modalActions, iln }
) => {
  let { name, email } = from;

  if (typeof from === "string") {
    email = from;
  }

  if (name === undefined && email === undefined)
    return {
      resultType: "noMatches",
      constituentMatches: [],
      electoralMatches: [],
    };

  return await api
    .getConstituentMatches(
      {
        email: email?.trim(),
        name: name?.trim(),
        toReturn: defaultToReturn,
      },
      modalActions,
      iln
    )
    .then(
      ({
        resultType = "noMatches",
        constituentMatches = [],
        electoralMatches = [],
      }) => ({
        resultType,
        constituentMatches: constituentMatches.map((x) => ({
          ...x,
          group: iln.gettext("Constituent Database"),
        })),
        electoralMatches: electoralMatches.map((x) => ({
          ...x,
          group: iln.gettext("Roll Matches"),
        })),
      })
    );
};

const useGetConstituentMatches = (inboxItem) => {
  const [matchingConstituents, setMatchingConstituents] = useState();
  const [electoralRollMatches, setElectoralRollMatches] = useState();
  const [resultType, setResultType] = useState();
  const [loading, setLoading] = useState(true);

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    if (inboxItem?.id !== undefined) {
      setMatchingConstituents(undefined);
      setElectoralRollMatches(undefined);
      setResultType(undefined);

      setLoading(true);
      getMatchingConstituents(inboxItem?.from, { modalActions, iln }).then(
        ({ resultType, constituentMatches, electoralMatches }) => {
          setMatchingConstituents(constituentMatches);
          setElectoralRollMatches(electoralMatches);
          setResultType(resultType);

          setLoading(false);
        }
      );
    }
  }, [inboxItem?.id]);

  return { loading, matchingConstituents, electoralRollMatches, resultType };
};

export default useGetConstituentMatches;
