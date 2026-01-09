import EmailCount from "./EmailCount";
import FilterContainsInput from "./FilterContains";
import FilterTypeSelect from "./FilterTypeSelect";
import React from "react";
import SortDirection from "./SortDirection";
import UserSelect from "./UserSelect";
import ViewingTypeSelect from "./ViewingTypeSelect";

const Filters = () => {
  return (
    <React.Fragment>
      <EmailCount />
      <UserSelect />
      <ViewingTypeSelect />
      <SortDirection />
      <FilterTypeSelect />
      <FilterContainsInput />
    </React.Fragment>
  );
};

export default Filters;
