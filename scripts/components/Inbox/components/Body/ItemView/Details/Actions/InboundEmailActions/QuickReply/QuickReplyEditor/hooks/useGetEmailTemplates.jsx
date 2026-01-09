import { useContext, useEffect, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../../../context/translation/TranslationContext";
import api from "@electedtech/api";

const useGetEmailTemplates = () => {
  const [templates, setTemplates] = useState();

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    api
      .searchEmailTemplates(
        {
          term: "",
          active: true,
          columnsToReturn: ["id", "name"],
        },
        modalActions,
        iln
      )
      .then((t) => setTemplates(t));
  }, []);

  return [templates];
};

export default useGetEmailTemplates;
