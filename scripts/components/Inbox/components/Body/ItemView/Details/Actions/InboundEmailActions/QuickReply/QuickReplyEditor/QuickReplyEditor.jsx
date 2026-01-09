import {
  Button,
  FlexBox,
  FormSelect,
  FormSelectAutoComplete,
  FormTextInput,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  editorBottomOffset,
  minViewPortWidth,
  quickReplyEditorBottomOffset,
  sliderMinWidth,
} from "../../../../../../../../../common/ComposeEmail/common/sizeConfig";

import ConstituentDetails from "./ConstituentDetails/ConstituentDetails.jsx";
import EmailBody from "../../../../../../../../../common/ComposeEmail/EmailBody/EmailBody.jsx";
import EmailFromSelect from "../../../../../../../../../common/EmailFromSelect.jsx";
import QuickReplyEditorOverlay from "./QuickReplyEditorOverlay/QuickReplyEditorOverlay.jsx";
import QuickReplyEditorPlaceholder from "./QuickReplyEditorPlaceholder.jsx";
import SelectConstituent from "../../../../common/SelectConstituent/SelectConstituent.jsx";
import TagInput from "../../../../../../../../../common/CaseDetailInputs/TagInput.jsx";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./propTypes.js";
import swapEmailToAndFromIfRequired from "../../../../../../../../helpers/swapEmailToAndFromIfRequired.js";
import theme from "@electedtech/theme";
import useCanSendEmail from "./ConstituentDetails/hooks/useCanSendEmail.jsx";
import { useCaptureSpellCheck } from "../../../../../../../../../../hooks/CKEditor/useCaptureSpellCheck";
import { useCkeditorReady } from "../../../../../../../../../../hooks/CKEditor/useCkeditorReady.jsx";
import useGetConstituentMatches from "../../../../../../common/hooks/useGetConstituentMatches.js";
import useParseQuickReplyTemplate from "./ConstituentDetails/hooks/useParseQuickReplyTemplate.jsx";
import useQuickReplyState from "./hooks/useQuickReplyState.jsx";
import useResizeSlider from "../../../../../../../../../common/hooks/useResizeSlider.jsx";
import useSendQuickReply from "./ConstituentDetails/hooks/useSendQuickReply.jsx";
import useSetEmailTemplate from "./hooks/useSetEmailTemplate.jsx";
import { useStyles } from "./QuickReply.styles.js";

const QuickReplyEditor = ({ email, onEmailSend }) => {
  email = swapEmailToAndFromIfRequired(email);
  const classes = useStyles(theme);

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [state, dispatch] = useQuickReplyState(email);
  const [bodyOutOfSync, setBodyOutOfSync] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    selectedCaseType,
    emailTemplates,
    tags,
    caseTypes,
    subject,
    replyTo,
    replyFrom,
    loadingPlaceholder,
    overlay,
    overlayText,
    displayCreateConstituent,
    emailBody,
    newConstituent,
    selectedConstituent,
  } = state;

  const [ckEditorReady] = useCkeditorReady();
  useCaptureSpellCheck();

  useResizeSlider(sliderMinWidth, minViewPortWidth);
  const [parseQuickReply] = useParseQuickReplyTemplate();

  const [handleEmailTemplateSelected] = useSetEmailTemplate(dispatch);

  const canSendEmail = useCanSendEmail(state);
  const [handleSendQuickReply] = useSendQuickReply(
    state,
    dispatch,
    onEmailSend
  );

  const { loading, matchingConstituents, electoralRollMatches } =
    useGetConstituentMatches(email);

  const emailInputsContainerRef = React.useRef();

  const handleConstituentSelected = ({ id }) => {
    api.getConstituent(id, modalActions, iln).then((fullConstituentDetails) => {
      dispatch({
        type: "SET_SELECTED_CONSTITUENT",
        payload: fullConstituentDetails,
      });
      dispatch({ type: "SET_DISPLAY_CREATE_CONSTITUENT", payload: false });
      dispatch({
        type: "SET_BODY",
        payload: parseQuickReply(emailBody, fullConstituentDetails),
      });
    });
  };

  const getErrorText = () => {
    const noSurnameNewConstituent =
      !selectedConstituent?.surname && newConstituent;
    const noSelectedConstituent =
      !selectedConstituent ||
      (!selectedConstituent?.surname && !newConstituent);

    switch (true) {
      case noSurnameNewConstituent: {
        return iln.gettext(
          "The constituents surname is required to send a quick reply"
        );
      }
      case noSelectedConstituent: {
        return iln.gettext(
          "Select an existing constituent or create a new one to send a quick reply"
        );
      }
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      {loadingPlaceholder && !ckEditorReady && <QuickReplyEditorPlaceholder />}
      <div
        className={loadingPlaceholder && !ckEditorReady ? classes.hidden : ""}
      >
        <QuickReplyEditorOverlay display={overlay} text={overlayText} />
        <div ref={emailInputsContainerRef}>
          <FormTextInput
            customClassNames={{ container: classes.input }}
            name={"to"}
            value={replyTo}
            keepErrorSpacing={false}
            label={iln.gettext("To: ")}
            onChange={() => {}}
            readOnly
          />
          <FormTextInput
            customClassNames={{ container: classes.input }}
            name={"subject"}
            value={subject}
            onChange={(e) =>
              dispatch({ type: "SET_SUBJECT", payload: e.target.value })
            }
            keepErrorSpacing={false}
            label={iln.gettext("Subject: ")}
          />
          <EmailFromSelect
            customClassNames={{
              container: classes.input,
            }}
            keepErrorSpacing={false}
            onChange={({ target: { value } }) =>
              dispatch({ type: "SET_REPLY_FROM", payload: value })
            }
            name={"from"}
            label={"From: "}
            value={replyFrom}
          />
          {displayCreateConstituent && (
            <ConstituentDetails
              email={email}
              onChangeConstituentDetails={(constituent) =>
                dispatch({
                  type: "SET_SELECTED_CONSTITUENT",
                  payload: constituent,
                })
              }
            />
          )}
          {
            loading ? (  <FormTextInput
            customClassNames={{ 
              container: classes.input, 
              input: classes.loadingText 
            }}
            name={"loading"}
            value={"Loading matches..."}
            keepErrorSpacing={false}
            label={iln.gettext("Matches")}
            onChange={() => {}}
            readOnly
            />
            ) 
            : 
            (<SelectConstituent
              customClassNames={{ container: classes.input }}
              keepErrorSpacing={false}
              matchingConstituents={matchingConstituents}
              electoralRollMatches={electoralRollMatches}
              name={"matchingConstituents"}
              label={iln.gettext("Matches")}
              onConstituentSelect={handleConstituentSelected}
              onElectoralRollSelect={(electoralResult) => {
                dispatch({
                  type: "SET_DISPLAY_CREATE_CONSTITUENT",
                  payload: true,
                });
                dispatch({ type: "SET_NEW_CONSTITUENT", payload: true });
                dispatch({
                  type: "SET_SELECTED_CONSTITUENT",
                  payload: electoralResult,
                });
              }}
              onCreateNewConstituent={() => {
                dispatch({
                  type: "SET_SELECTED_CONSTITUENT",
                  payload: undefined,
                });
                dispatch({ type: "SET_NEW_CONSTITUENT", payload: true });
                dispatch({
                  type: "SET_DISPLAY_CREATE_CONSTITUENT",
                  payload: true,
                });
              }}
              value={selectedConstituent?.id}
            />)
          }
          {emailTemplates.length > 0 && (
            <FormSelectAutoComplete
              customClassNames={{ container: classes.input }}
              keepErrorSpacing={false}
              value={null}
              name={"emailTemplates"}
              label={iln.gettext("Template: ")}
              onChange={(e) => handleEmailTemplateSelected(e.target.value)}
            >
              {emailTemplates.map(({ name, id }) => {
                return (
                  <option key={id} value={parseInt(id)}>
                    {name}
                  </option>
                );
              })}
            </FormSelectAutoComplete>
          )}
          <FormSelect
            customClassNames={{ container: classes.input }}
            name={"caseType"}
            label={iln.gettext("Case Type: ")}
            onChange={(e) =>
              dispatch({ type: "SET_CASE_TYPE", payload: e.target.value })
            }
            keepErrorSpacing={false}
            value={selectedCaseType}
          >
            {caseTypes.map(({ id, casetype }) => {
              return (
                <option key={id} value={id}>
                  {casetype}
                </option>
              );
            })}
          </FormSelect>
          <TagInput
            name="caseTags"
            label={iln.gettext("Tags: ")}
            value={{ value: "", chips: tags }}
            onChange={(e) =>
              dispatch({ type: "SET_TAGS", payload: e.target.value.chips })
            }
            customClassNames={{ container: classes.input }}
          />
        </div>
        <EmailBody
          emailInputsContainerRef={emailInputsContainerRef}
          emailBody={emailBody}
          handleOnChange={(e) => {
            dispatch({ type: "SET_BODY", payload: e.target.value });
          }}
          fromAddress={replyFrom}
          setBodyOutOfSync={setBodyOutOfSync}
          dirty={() => {}}
          editorBottomOffset={quickReplyEditorBottomOffset}
          editorTopOffset={editorBottomOffset}
        />
        <FlexBox hAlign={"space-between"}>
          <p className={classes.errorText}>{getErrorText()}</p>
          <div className={classes.buttonContainer}>
            <Button
              isDisabled={bodyOutOfSync || !canSendEmail || sending}
              onClick={() => {
                setSending(true);
                dispatch({ type: "SET_DISPLAY_OVERLAY", payload: true });
                dispatch({
                  type: "SET_OVERLAY_TEXT",
                  payload: iln.gettext("Sending quick reply"),
                });
                handleSendQuickReply().catch((error) => {
                  setSending(false);

                  dispatch({
                    type: "SET_OVERLAY_TEXT",
                    payload: iln.gettext(error.message),
                  });
                });
              }}
            >
              {iln.gettext("Send Email")}
            </Button>
          </div>
        </FlexBox>
      </div>
    </React.Fragment>
  );
};

QuickReplyEditor.propTypes = propTypes;

export default QuickReplyEditor;
