import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./FieldFilter.propTypes";
import useCategories from "./hooks/useCategories";
import useStyles from "./FieldFilter.styles";

const FieldFilter = ({ handleFilterChanged, value }) => {
  const classes = useStyles();

  const categories = useCategories();

  const { object, category } = value;

  // will be added in a later release.
  // const categoryOptions = [
  //   { value: "any", text: "Any" },
  //   { value: "cases", text: "Cases" },
  //   { value: "constituents", text: "Constituents" },
  // ];

  return (
    <div>
      {/*<FormSelectAutoComplete*/}
      {/*  customClassNames={{*/}
      {/*    container: classes.filterInputContainer,*/}
      {/*    label: classes.label,*/}
      {/*  }}*/}
      {/*  name={"objectFilter"}*/}
      {/*  onChange={(e) => {*/}
      {/*    handleFilterChanged({*/}
      {/*      object: e.target.value,*/}
      {/*      ...(e.target.value !== "cases" && { category: -1 }),*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  label={"Filter by Object"}*/}
      {/*  value={object}*/}
      {/*>*/}
      {/*  {categoryOptions.map(({ text, value }) => (*/}
      {/*    <option key={value} value={value}>*/}
      {/*      {text}*/}
      {/*    </option>*/}
      {/*  ))}*/}
      {/*</FormSelectAutoComplete>*/}
      {object === "cases" && (
        <FormSelectAutoComplete
          customClassNames={{
            container: classes.filterInputContainer,
            label: classes.label,
          }}
          name={"categoryFilter"}
          keepErrorSpacing={true}
          onChange={(e) => {
            handleFilterChanged({
              category: e.target.value,
            });
          }}
          label={"Filter by"}
          value={category}
        >
          {categories.map(({ categorytype, id }) => (
            <option key={id} value={id}>
              {categorytype}
            </option>
          ))}
        </FormSelectAutoComplete>
      )}
    </div>
  );
};

FieldFilter.propTypes = propTypes;

export default FieldFilter;
