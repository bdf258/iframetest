import {
  dispatchUpdateCases,
  dispatchUpdateConstituents,
  dispatchUpdateItem,
  selectFocusedItem,
} from "../../../../slice/inboxSlice";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import noPermissionCase from "../Details/consts/noPermissionCase";

let fetchingEmails = {};
let fetchingCases = {};
let fetchingConstituents = {};

const getItemDetails = async (
  focusedItem,
  {
    updateItem,
    modalActions,
    iln,
    updateCases,
    updateConstituents,
    setRefreshing,
  }
) => {
  /**
   * get email
   */
  const emailID = focusedItem?.id;
  if (emailID) {
    if (!fetchingEmails[emailID])
      fetchingEmails[emailID] = api
        .getEmail(emailID, modalActions, iln)
        .then((email) => {
          const fullEmail = {
            plainBody: "",
            purifiedBody: "",
            ...email,
            fullEmail: true,
          };
          updateItem(fullEmail);
          return email;
        });

    var email = await fetchingEmails[emailID];
    delete fetchingEmails[emailID];
  }

  /**
   * get case
   */
  const caseID = email?.caseID;
  if (caseID) {
    if (!fetchingCases[caseID])
      fetchingCases[caseID] = api
        .getCase(caseID)
        .then((c) => {
          updateCases(c);
          return c;
        })
        .catch((e) => {
          if (e.status === 403) {
            const fallbackCase = { ...noPermissionCase, id: caseID };
            updateCases(fallbackCase);
            return fallbackCase;
          }
        });

    var _case = await fetchingCases[caseID];
    delete fetchingCases[caseID];
  }

  /**
   * get constituent
   */
  const constituentID = _case?.constituentID;
  if (constituentID) {
    if (!fetchingConstituents[constituentID])
      fetchingConstituents[constituentID] = api
        .getConstituent(constituentID)
        .then((constituent) => {
          updateConstituents(constituent);
          return constituent;
        });

    await fetchingConstituents[constituentID];
    delete fetchingConstituents[constituentID];
  }

  setRefreshing(false);
};

/**
 * The purpose of this hook is to perform the initial fetching of data over
 * http and to refresh it upon subsequent views. It increases the percieved
 * speed of the inbox by allowing a cached version to be displayed immediately
 * and then refreshing the email in the background.
 *
 * It does this by storing the email, case and constituent in redux, which
 * is displayed immediately if already prsent, and replacing those values
 * with the newest copy to capture any changes on subsequent views.
 *
 * Each request is stored in fetchingEmails, fetchingCases, and
 * fetchingConstituents to prevent repeat requests if already refreshing.
 */

const useGetItemDetails = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const dispatch = useDispatch();

  const focusedItem = useSelector(selectFocusedItem);
  const updateItem = (updatedItem) => dispatch(dispatchUpdateItem(updatedItem));
  const updateCases = (c) => dispatch(dispatchUpdateCases(c));
  const updateConstituents = (c) => dispatch(dispatchUpdateConstituents(c));

  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    if (focusedItem) {
      setRefreshing(true);
      getItemDetails(focusedItem, {
        updateItem,
        modalActions,
        iln,
        updateCases,
        updateConstituents,
        setRefreshing,
      });
    }
  }, [focusedItem?.id, focusedItem?.caseID]);

  return refreshing;
};

export default useGetItemDetails;
