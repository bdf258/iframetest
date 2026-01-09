import { useContext, useState } from "react";

import { TranslationContext } from "context/translate";

const useValidCustomField = (selectedField) => {
  const iln = useContext(TranslationContext);
  const [touched, setTouched] = useState({
    name: false,
    categories: false,
    orderNo: false,
  });

  const hasBeenTouched = (inputName) => {
    setTouched({
      ...touched,
      [inputName]: true,
    });
  };

  const validName = {
    errorText: !selectedField.name
      ? iln.gettext("Is required")
      : selectedField.name.length > 30
      ? iln.gettext("Name can't be more than 30 characters long")
      : "",
    touched: touched.name,
    valid: !!selectedField.name,
  };

  const validCategory = {
    errorText:
      selectedField.categories.length <= 0 ? iln.gettext("Is required") : "",
    touched: touched.categories,
    valid:
      selectedField.object !== "cases" || selectedField.categories.length > 0,
  };

  const validOrder = {
    errorText:
      selectedField.orderNo === 0
        ? ""
        : !selectedField.orderNo
        ? iln.gettext("Is required")
        : isNaN(selectedField.orderNo)
        ? iln.gettext("Order must be a number")
        : "",
    touched: touched.orderNo,
    valid:
      selectedField.orderNo === 0 ||
      (!!selectedField.orderNo && !isNaN(selectedField.orderNo)),
  };

  const validNumberOfOptions = {
    errorText:
      selectedField.type === "int" || selectedField.type === "checkbox"
        ? selectedField?.options.length > 0
          ? iln.gettext("At least one option is required")
          : ""
        : "",
    valid: () => {
      if (selectedField.type === "int" || selectedField.type === "checkbox") {
        return selectedField?.options.length > 0;
      }
      return true;
    },
  };

  const validOptionLength = {
    valid: () => {
      if (selectedField.type === "int" || selectedField.type === "checkbox") {
        if (selectedField?.options.length > 0) {
          return selectedField?.options?.every(
            (option) => option.text.length <= 20
          );
        }
        return true;
      }
      return true;
    },
  };

  const canSave =
    validOrder.valid &&
    validName.valid &&
    validCategory.valid &&
    validNumberOfOptions.valid() &&
    validOptionLength.valid();

  const customFieldFormSubmitErrorText = () =>
    !validName.valid
      ? iln.gettext("Custom field requires a name")
      : !validCategory.valid
      ? iln.gettext("Custom field requires a Category (Visible in)")
      : !validNumberOfOptions.valid()
      ? iln.gettext("At least one option is required")
      : !validOptionLength.valid()
      ? iln.gettext("Item names can't be more than 20 characters long")
      : "";

  return {
    validCustomField: {
      validName,
      validCategory,
      validOrder,
      canSave,
      validNumberOfOptions,
      customFieldFormSubmitErrorText,
    },
    hasBeenTouched,
  };
};

export default useValidCustomField;
