import {
  FormChipInput,
  FormSelect,
  Placeholder,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./CasesTagSelect.propTypes.js";
import useStyles from "./CasesTagSelect.styles.js";
import useTagState from "./hooks/useTagState.js";

const searchTags = async (value) => {
  let returnTagsAsNegative = false;
  if (value[0] === "-" && value[1] === " ") {
    value = value.slice(2, value.length);
    returnTagsAsNegative = true;
  }
  if (value.length >= 2) {
    return api.searchTags({ term: value }).then((matchingTags) =>
      matchingTags.map(({ id, tag }) => ({
        tag: returnTagsAsNegative ? `- ${tag}` : tag,
        id,
      }))
    );
  }

  return new Promise((resolve) => resolve([]));
};

const seperateNegativeTags = (tags) => {
  const tagged = [];
  const notTagged = [];

  tags.forEach((tag) => {
    if (tag.tag[0].trim() === "-") {
      notTagged.push(tag);
    } else {
      tagged.push(tag);
    }
  });

  return { tagged, notTagged };
};

const CasesTagSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [tags, setTags] = useTagState(state);

  return (
    <div className={classes.casesTagSelect}>
      <span className={classes.label}> {iln.gettext("with")} </span>
      <FormSelect
        value={state.filters.tagged.searchType}
        name="searchType"
        onChange={({ target: { value } }) =>
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              tagged: { ...state.filters.tagged, searchType: value },
              notTagged: { ...state.filters.notTagged, searchType: value },
            },
          })
        }
        keepErrorSpacing={false}
        customClassNames={{
          container: classes.searchTypeSelectContainer,
        }}
      >
        <option value="all">{iln.gettext("All")}</option>
        <option value="any">{iln.gettext("Any")}</option>
        <option value="none">{iln.gettext("None")}</option>
      </FormSelect>
      <span className={classes.label}> {iln.gettext("of these tags")} </span>
      {!tags ? (
        <Placeholder height={32} width="100%" className={classes.placeholder} />
      ) : (
        <FormChipInput
          name="tagID"
          value={{ chips: tags }}
          onChange={({
            target: {
              name,
              value: { chips },
            },
          }) => {
            setTags(chips);

            const { tagged, notTagged } = seperateNegativeTags(chips);

            dispatch({
              type: "SET_FILTERS",
              payload: {
                ...state.filters,
                tagged: {
                  ...state.filters.tagged,
                  [name]: tagged.map(({ id }) => id),
                },
                notTagged: {
                  ...state.filters.notTagged,
                  [name]: notTagged.map(({ id }) => id),
                },
              },
            });
          }}
          chipLabelKey="tag"
          suggestionLabelKey="tag"
          addNewChips={false}
          typingTimeoutDelay={500}
          keepErrorSpacing={false}
          chipSource={searchTags}
        />
      )}
    </div>
  );
};

CasesTagSelect.propTypes = propTypes;

export default CasesTagSelect;
