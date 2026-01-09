import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useLayoutEffect, useRef, useState } from "react";

import ComponentLoading from "../../../../../../../../../ComponentLoading.jsx";
import ConstituentSelect from "./ConstituentSelect/ConstituentSelect.jsx";
import Content from "../../../../../Content/Content.jsx";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import { format } from "date-fns";
import { getMatchingConstituents } from "../../../../../../common/hooks/useGetConstituentMatches.js";
import propTypes from "./propTypes.js";
import useCasesToCreateState from "./hooks/useCasesToCreateState.js";
import useReduxSlice from "./MatchConstituents.redux.js";
import { useStyles } from "./styles.js";

const initialView = "suggestions";

const deduplicateElectoralRollResults = ({
  constituentMatches,
  electoralMatches = [],
  ...rest
}) => {
  const getKey = (person) =>
    `${(person.firstName || person.firstname)
      ?.toLowerCase()
      .trim()}|${person.surname?.toLowerCase().trim()}|${person.address1
      ?.toLowerCase()
      .trim()}`;

  const constituentMap = new Map();

  constituentMatches.forEach((c) => {
    const key = getKey(c);
    constituentMap.set(key, c);
  });

  return {
    constituentMatches,
    electoralMatches: electoralMatches.filter(
      (electRollM) => !constituentMap.has(getKey(electRollM))
    ),
    ...rest,
  };
};

const processResults = (
  searchResult,
  {
    setMatchType,
    setConstituentMatches,
    setElectoralMatches,
    next,
    currentEmail,
    addToCasesToCreate,
  }
) => {
  const {
    constituentMatches = [],
    electoralMatches = [],
    resultType,
  } = deduplicateElectoralRollResults(searchResult);

  setMatchType(resultType);
  setConstituentMatches(constituentMatches);
  setElectoralMatches(electoralMatches);
  if (constituentMatches.length === 1 && resultType === "oneMatch") {
    if (constituentMatches[0]?.id && currentEmail?.id)
      addToCasesToCreate({
        constituentID: constituentMatches[0].id,
        emailID: currentEmail.id,
      });
    next();
  }
};

const MatchConstituents = ({ emails, onComplete }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [index, setIndex] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [constituentMatches, setConstituentMatches] = useState([]);
  const [electoralMatches, setElectoralMatches] = useState([]);
  const [resultType, setMatchType] = useState("noMatches");
  const [casesToCreate, addToCasesToCreate] = useCasesToCreateState();
  const [view, setView] = useState(initialView);

  const nextConstituentResultRef = useRef();
  const nextConstituentResult = nextConstituentResultRef.current;

  const { updateItem } = useReduxSlice();

  const currentEmail = emails[index];
  const nextEmail = emails[index + 1];

  useLayoutEffect(() => {
    let completed = false;
    if (index < emails.length) {
      if (!currentEmail.fullEmail) {
        api.getEmail(currentEmail.id, modalActions, iln).then((_email) => {
          updateItem({
            plainBody: "",
            purifiedBody: "",
            ..._email,
            fullEmail: true,
          });
        });
      }
      if (nextEmail && !nextEmail.fullEmail) {
        api.getEmail(nextEmail.id, modalActions, iln).then((_email) => {
          updateItem({
            plainBody: "",
            purifiedBody: "",
            ..._email,
            fullEmail: true,
          });
        });
      }
    } else {
      if (!completed) {
        completed = true;
        onComplete(casesToCreate);
      }
    }
  }, [index]);

  const next = () => {
    setIndex(index + 1);
    setView(initialView);
  };

  useLayoutEffect(() => {
    if (nextConstituentResult) {
      processResults(nextConstituentResult, {
        setMatchType,
        setConstituentMatches,
        setElectoralMatches,
        next,
        currentEmail,
        addToCasesToCreate,
      });

      nextConstituentResultRef.current = undefined;
    } else if (currentEmail && currentEmail?.from) {
      setFetching(true);
      getMatchingConstituents(currentEmail?.from, { modalActions, iln })
        .then((searchResult) => {
          processResults(searchResult, {
            setMatchType,
            setConstituentMatches,
            setElectoralMatches,
            next,
            currentEmail,
            addToCasesToCreate,
          });
        })
        .finally(() => setFetching(false));
    }

    if (nextEmail) {
      getMatchingConstituents(nextEmail?.from, { modalActions, iln }).then(
        (searchResult) => {
          nextConstituentResultRef.current = searchResult;
        }
      );
    }
  }, [index]);

  if (!currentEmail) return <ComponentLoading />;

  return (
    <main className={classes.container}>
      <div className={classes.emailDisplay}>
        <div>
          <strong>
            {currentEmail.from?.name || currentEmail.from?.email || ""}
          </strong>
          <div className={classes.faintDetail}>
            {iln.gettext("To")}:{" "}
            {currentEmail.to
              ?.map(({ name, email } = {}) => name || email || "")
              .join(", ")}
          </div>
          <div className={classes.faintDetail}>
            {iln.gettext("Sent")}:{" "}
            {format(
              new Date(`${currentEmail.dateTime.replace(" ", "T")}Z`),
              "hh:mm yyyy/MM/dd"
            )}
          </div>
          <div>{currentEmail.subject}</div>
          <Content item={currentEmail} />
        </div>
        <Button className={classes.skipButton} size="small" onClick={next}>
          {iln.gettext("Skip")}
        </Button>
      </div>

      <ConstituentSelect
        constituentMatches={constituentMatches}
        electoralRollMatches={electoralMatches}
        resultType={resultType}
        fetching={fetching}
        view={view}
        setView={setView}
        email={currentEmail}
        onConstituentSelect={(constituentID) => {
          addToCasesToCreate({ constituentID, emailID: currentEmail.id });
          next();
        }}
      />
    </main>
  );
};

MatchConstituents.propTypes = propTypes;

export default MatchConstituents;
