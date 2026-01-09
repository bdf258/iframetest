import {
  FormCheckbox,
  FormTextInput,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import TranslationContext from "../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./SearchField.propTypes.js";

let typingTimeout;

const SearchField = ({ setResults }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const [group, setGroup] = useState(true);

  useEffect(() => {
    clearTimeout(typingTimeout);

    if (searchText.length >= 3) {
      setLoading(true);
      typingTimeout = setTimeout(() => {
        setResults(undefined);
        api
          .search(
            {
              term: searchText,
              options: {
                results: {
                  group,
                },
              },
            },
            modalActions,
            iln
          )
          .then(({ results }) => setResults(results))
          .catch(() => setResults(undefined))
          .finally(() => setLoading(false));
      }, 500);
    }
  }, [searchText]);

  return (
    <React.Fragment>
      <FormTextInput
        name="search"
        value={searchText}
        onChange={({ target: { value } }) => setSearchText(value)}
        innerComponent={loading ? <Spinner /> : null}
      />
      <FormCheckbox
        name="group"
        label="Group Results"
        value={group}
        onChange={({ target: { value } }) => setGroup(value)}
      />
    </React.Fragment>
  );
};

SearchField.propTypes = propTypes;

export default SearchField;
