import { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";

const useValidMessage = (message) => {
  const iln = useContext(TranslationContext);
  const [messageError, setMessageError] = useState("");

  const { value } = message;

  const errorMessage = () => {
    if (!value) return iln.gettext(`A message is required`);
    return "";
  };

  useEffect(() => {
    setMessageError(errorMessage());
  }, [message]);

  return { messageError };
};

export default useValidMessage;
