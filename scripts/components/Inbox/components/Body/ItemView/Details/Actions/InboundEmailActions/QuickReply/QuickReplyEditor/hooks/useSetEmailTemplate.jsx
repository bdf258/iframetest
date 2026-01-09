import { ModalContext } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../../../context/translation/TranslationContext";
import api from "@electedtech/api";
import { getCurrentCkeditorInstance } from "../../../../../../../../../../../helpers/ckeditor/getInstance";
import { useContext } from "react";

const useSetEmailTemplate = (dispatch) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const handleEmailTemplateSelected = (id) => {
    dispatch({
      type: "SET_DISPLAY_OVERLAY",
      payload: true,
    });
    api
      .getEmailTemplateById(id, modalActions, iln)
      .then((et) => {
        const CkeditorInstance = getCurrentCkeditorInstance();
        CkeditorInstance.insertHtml(`${et.htmlTemplate}`);

        dispatch({
          type: "SET_SELECTED_EMAIL_TEMPLATE",
          payload: et.id,
        });
        dispatch({ type: "SET_CASE_TYPE", payload: parseInt(et.casetypeID) });
        dispatch({
          type: "SET_TAGS",
          payload: et.tagID,
        });
      })
      .finally(() =>
        dispatch({
          type: "SET_DISPLAY_OVERLAY",
          payload: false,
        })
      );
  };

  return [handleEmailTemplateSelected];
};

export default useSetEmailTemplate;
