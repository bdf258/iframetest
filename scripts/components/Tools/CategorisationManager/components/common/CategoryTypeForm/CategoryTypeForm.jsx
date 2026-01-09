import React, { useContext, useState } from "react";

import { FormTextInput } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./CategoryTypeForm.propTypes.js";
import useStyles from "./CategoryTypeForm.styles.js";

let nameTimeout;
let reviewTimeout;

const newCategorytype = {
  categorytype: "",
  reviewInDays: 0,
  restriction: { edit: true },
};

const CategoryTypeForm = ({ category = {}, timeout = 500, onChange }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [categorytype, setCategorytype] = useState({
    ...newCategorytype,
    ...category,
  });

  return (
    <section className={classes.section}>
      <h3 className={classes.sectionHeading}>{iln.gettext("Category Type")}</h3>
      <FormTextInput
        name="categorytype"
        label={iln.gettext("Name")}
        value={categorytype.categorytype}
        disabled={!categorytype.restriction.edit}
        onChange={({ target: { value, name } }) => {
          clearTimeout(nameTimeout);
          const updatedCategorytype = {
            ...categorytype,
            [name]: value,
          };
          setCategorytype(updatedCategorytype);
          nameTimeout = setTimeout(
            () => onChange(updatedCategorytype),
            timeout
          );
        }}
        customClassNames={{
          container: classes.inputContainer,
          label: classes.inputLabel,
        }}
        keepErrorSpacing={false}
      />
      <FormTextInput
        name="reviewInDays"
        label={iln.gettext("Review in day(s)")}
        value={categorytype.reviewInDays.toString()}
        type="number"
        disabled={!categorytype.restriction.edit}
        onChange={({ target: { value, name } }) => {
          clearTimeout(reviewTimeout);
          const newReviewInDays = value < 0 ? 0 : parseInt(value);
          const updatedCategorytype = {
            ...categorytype,
            [name]: newReviewInDays,
          };
          setCategorytype(updatedCategorytype);
          reviewTimeout = setTimeout(
            () => onChange(updatedCategorytype),
            timeout
          );
        }}
        onBlur={() =>
          isNaN(categorytype.reviewInDays) &&
          setCategorytype({ ...categorytype, reviewInDays: 0 })
        }
        customClassNames={{
          container: classes.inputContainer,
          label: classes.inputLabel,
        }}
        keepErrorSpacing={false}
      />
    </section>
  );
};

CategoryTypeForm.propTypes = propTypes;

export default CategoryTypeForm;
