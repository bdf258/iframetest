import { someoneElseTypeID } from "../../../../../common/CreateCommunication/consts/contactTypeIDs";
import { useEffect } from "react";
import { useReduxSlice } from "../WriteSms.redux";

/*
 * Navigates straight to the SMS editor if the constituent doesn't have a mobile number.
 */
export const useNavigateToSmsEditor = (setContact, contactList) => {
  const { constituent } = useReduxSlice();

  useEffect(() => {
    if (!constituent?.mobile) {
      setContact(
        contactList.find((contact) => contact.id === someoneElseTypeID)
      );
    }
  }, []);
};
