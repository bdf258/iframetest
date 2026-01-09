import { FormTextInput, ModalContext } from "@electedtech/electedtech-ui";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { TranslationContext } from "context/translate";
import customFieldsAPI from "../../../../../api/src/customFields";
import propTypes from "./CustomFieldNameInput.propTypes";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const CustomFieldNameInput = ({
  customClassNames,
  value,
  onChange,
  onUniqueName,
  error,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const [uniqueNameError, setUniqueNameError] = useState(null);
  const currentControllerRef = useRef(null);

  const handleOnChange = useCallback(
    async (e) => {
      const inputValue = e.target.value;

      if (!inputValue) {
        if (currentControllerRef.current) {
          currentControllerRef.current.abort();
          currentControllerRef.current = null;
        }
        setUniqueNameError(null);
        onUniqueName(true);
        return;
      }

      if (currentControllerRef.current) {
        currentControllerRef.current.abort();
      }

      currentControllerRef.current = new AbortController();
      const signal = currentControllerRef.current.signal;

      try {
        const nameIsUnique = await customFieldsAPI.customFieldNameUnique(
          { name: inputValue },
          modalActions,
          signal
        );
        if (!nameIsUnique) {
          onUniqueName(false);
          setUniqueNameError(iln.gettext("Name must be unique"));
        } else {
          onUniqueName(true);
          setUniqueNameError(null);
        }
      } catch (err) {
        onUniqueName(false);
      }
    },
    [iln, modalActions, onUniqueName]
  );

  const debouncedHandleOnChange = useMemo(
    () => debounce(handleOnChange, 500),
    [handleOnChange]
  );

  const handleInputChange = (e) => {
    onChange(e);
    debouncedHandleOnChange(e);
  };

  return (
    <FormTextInput
      customClassNames={customClassNames}
      label={iln.gettext("Name")}
      name="name"
      value={value}
      onChange={handleInputChange}
      error={error || uniqueNameError}
      keepErrorSpacing={false}
    />
  );
};

CustomFieldNameInput.propTypes = propTypes;

export default CustomFieldNameInput;
