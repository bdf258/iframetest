import React, { useState } from "react";

import { FormChipInput } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import { TagListPropType } from "../../../types/Tag";
import { createUseStyles } from "react-jss";
import { isValidLength } from "../../../helpers/formValidators";
import { tagListDedupe } from "../../../helpers/tags";
import tagsAPI from "../../../api/src/tags";
import { useTheme } from "theming";

const useStyles = createUseStyles({
  input: {
    marginBottom: 0,
  },
});

const getTags = (searchTerm, tagList) => {
  return tagsAPI.searchTags({ term: searchTerm }).then((tags) => {
    return tagListDedupe(tags, tagList).map((tag) => ({
      label: tag.tag,
      id: tag.id,
      count: tag.count,
    }));
  });
};

const getErrorMessage = (inputValue, tagList) => {
  if (isValidLength(inputValue, 254)) {
    return "Tag length cannot be greater than 255 characters";
  }
  if (tagList.length >= 20) {
    return "A maximum of 20 tags can be selected at a time.";
  }
  return null;
};

const handleOnChange = (e, setTagList) => {
  setTagList(e.target.value.chips);
};

const SearchDisplayTag = ({ tagList, setTagList }) => {
  const [inputValue] = useState("");
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <FormChipInput
      addNewChips={false}
      customClassNames={{ autoComplete: { input: classes.input } }}
      value={{ value: "", chips: tagList }}
      name={"searchTags"}
      chipSource={(e) => getTags(e, tagList)}
      onChange={(e) => handleOnChange(e, setTagList)}
      error={getErrorMessage(inputValue, tagList)}
    />
  );
};

SearchDisplayTag.propTypes = {
  setTagList: PropTypes.func.isRequired,
  tagList: TagListPropType,
};
export default SearchDisplayTag;
