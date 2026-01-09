import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { useContext } from "react";

// The contact select uses two different data sources dependent on the contact type that is chosen
// When selecting the constituent / organisation the constituent or organisation that is passed in is used.
// Otherwise, an HTTP request is sent to the contactLists endpoint.
const useContactDataSource = (dataSourceType, contactType, constituent) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const dataSource = async (searchTerm, signal) => {
    if (dataSourceType.contactList) {
      return await api.searchContactLists(
        contactType.id,
        searchTerm,
        modalActions,
        iln,
        signal
      );
    } else {
      return [constituent];
    }
  };

  return [dataSource];
};

export default useContactDataSource;
