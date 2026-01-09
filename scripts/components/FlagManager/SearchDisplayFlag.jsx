import React, { useState } from "react";

import FlagListPropType from "../../types/FlagList";
import { FormChipInput } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { flagListDedupe } from "../../helpers/flags";
import flagsAPI from "../../api/src/flags";
import { isValidLength } from "../../helpers/formValidators";
import { useTheme } from "theming";

const useStyles = createUseStyles({
  input: {
    marginBottom: 0,
  },
});

const getFlags = (searchTerm, flagList) => {
  return flagsAPI.searchFlags({ term: searchTerm }).then((flags) => {
    return flagListDedupe(flags, flagList).map((flag) => ({
      label: flag.flag,
      id: flag.id,
      count: flag.count,
    }));
  });
};

const getErrorMessage = (inputValue, flagList) => {
  if (isValidLength(inputValue, 254)) {
    return "Flag length cannot be greater than 255 characters";
  }
  if (flagList.length >= 20) {
    return "A maximum of 20 flags can be selected at a time.";
  }
  return null;
};

const handleOnChange = (e, setFlagList) => {
  setFlagList(e.target.value.chips);
};

const SearchDisplayFlag = ({ flagList, setFlagList }) => {
  const [inputValue] = useState("");
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <FormChipInput
      addNewChips={false}
      customClassNames={{ autoComplete: { input: classes.input } }}
      value={{ value: "", chips: flagList }}
      name={"searchFlags"}
      chipSource={(e) => getFlags(e, flagList)}
      onChange={(e) => handleOnChange(e, setFlagList)}
      error={getErrorMessage(inputValue, flagList)}
    />
  );
};

SearchDisplayFlag.propTypes = {
  flagList: FlagListPropType,
  setFlagList: PropTypes.func.isRequired,
};
export default SearchDisplayFlag;
