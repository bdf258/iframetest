import { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";

const useValidRecipientMobile = (recipientMobile) => {
  const iln = useContext(TranslationContext);
  const [recipientMobileError, setRecipientMobileError] = useState("");

  const { value } = recipientMobile;
  const errorMessage = () => {
    if (!value) return iln.gettext(`A mobile number is required`);
    if (value.length < 10) return iln.gettext(`Invalid mobile number`);
    return "";
  };

  useEffect(() => {
    setRecipientMobileError(errorMessage());
  }, [recipientMobile]);

  return { recipientMobileError };
};

export default useValidRecipientMobile;
