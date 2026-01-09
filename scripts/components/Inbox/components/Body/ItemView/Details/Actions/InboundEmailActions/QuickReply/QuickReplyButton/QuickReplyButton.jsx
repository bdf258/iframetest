import {
  Button,
  ModalContext,
  SliderContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import QuickReplyEditor from "../QuickReplyEditor/QuickReplyEditor.jsx";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "../propTypes.js";
import { useIsSliderOpen } from "../../../../../../ItemList/common/useIsSliderOpen.js";
import { useReduxSlice } from "./QuickReplyButton.redux.js";

const QuickReplyButton = ({ email }) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);

  const isSliderOpen = useIsSliderOpen();

  const { removeItem } = useReduxSlice();

  const onEmailSend = () => {
    api.updateEmailActioned(email.id, true, modalActions, iln);
    sliderActions.close();
    removeItem(email);
  };

  return (
    <Button
      size="small"
      isDisabled={isSliderOpen}
      title={
        isSliderOpen
          ? iln.gettext("You cannot take an action while the slider is open")
          : undefined
      }
      onClick={() =>
        sliderActions.open({
          title: iln.gettext("Quick Reply"),
          component: (
            <QuickReplyEditor email={email} onEmailSend={onEmailSend} />
          ),
        })
      }
    >
      {iln.gettext("Quick Reply")}
    </Button>
  );
};

QuickReplyButton.propTypes = propTypes;

export default QuickReplyButton;
