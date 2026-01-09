import {
  Button,
  ButtonBar,
  FlexBox,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useRef, useState } from "react";
import {
  editorBottomOffset,
  editorTopOffset,
  minViewPortWidth,
  sliderMinWidth,
} from "./common/sizeConfig";

import FooterEditor from "./FooterEditor/FooterEditor.jsx";
import LetterActionsHeader from "./LetterActionsHeader/LetterActionsHeader.jsx";
import LetterBody from "./LetterBody.jsx";
import LetterLoadingPlaceHolder from "./LetterLoadingPlaceHolder/LetterLoadingPlaceHolder.jsx";
import MergeCodes from "./../MergeCodes/MergeCodes/MergeCodes.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import classnames from "classnames";
import { currentlyFocusedInstance } from "../../../helpers/ckeditor/getInstance";
import { customFieldsAsMergeCodeMap } from "../MergeCodes/util/customFieldsAsMergeCodeMap";
import getUserCKEditorConfig from "../../../helpers/ckeditor/getUserCKEditorConfig.js";
import { installationPreferences } from "../../../helpers/localStorageHelper";
import leftPadWithZeros from "../../../helpers/leftPadWithZeros";
import propTypes from "./propTypes";
import useAutoSaveLetter from "./hooks/useAutoSaveLetter.jsx";
import { useCaptureSpellCheck } from "../../../hooks/CKEditor/useCaptureSpellCheck";
import { useCkeditorReady } from "../../../hooks/CKEditor/useCkeditorReady.jsx";
import useConstituentDetails from "../MergeCodes/hooks/useConstituentDetails.jsx";
import useEditorHeight from "../hooks/useEditorHeight.jsx";
import useGetLetterHeadConfig from "./hooks/useGetLetterHeadConfig.js";
import useGetMergeCodeMap from "../MergeCodes/hooks/useGetMergeCodeMap.jsx";
import { useLetterEditorState } from "./hooks/useLetterEditorState.jsx";
import useMergeCodesWithContent from "../MergeCodes/hooks/useMergeCodesWithContent.jsx";
import useParseLetterTemplate from "./hooks/useParseLetterTemplate.jsx";
import { useRecipientDetails } from "../MergeCodes/hooks/useRecipientDetails.jsx";
import useResizeSlider from "../hooks/useResizeSlider.jsx";
import useSaveLetterOnClose from "./hooks/useSaveLetterOnClose.jsx";
import useSaveLetterOnInit from "./hooks/useSaveLetterOnInit.jsx";
import useSetLetterContent from "./hooks/useSetLetterContent.jsx";
import { useStyles } from "./styles";
import useUnmountCkeditor from "../../../hooks/CKEditor/useUnmountCkeditor";

const handleSendViaEmail = async (
  sendViaEmail,
  saveLetter,
  letterId,
  caseId,
  letterheadId,
  letterRef,
  letterContent,
  footerContent,
  parseLetter,
  saveLetterOnClose,
  dispatch,
  modalActions,
  iln
) => {
  const { parsedBody, parsedFooter } = parseLetter(
    letterContent,
    footerContent
  );
  dispatch({
    type: "UPDATE_BODY_CONTENT",
    letterContent: parsedBody,
  });
  dispatch({
    type: "UPDATE_FOOTER_CONTENT",
    footerContent: parsedFooter,
  });
  const letter = await saveLetter(
    letterId,
    caseId,
    letterheadId,
    letterRef,
    parsedBody,
    parsedFooter,
    modalActions,
    iln
  );
  saveLetterOnClose.current = false;
  sendViaEmail(letter);
};

const handleMergeCodeSelected = (
  selectedMergeCode,
  mergeCodeMap,
  currentlyFocusedEditor
) => {
  if (currentlyFocusedEditor) {
    currentlyFocusedEditor.insertHtml(
      mergeCodeMap.get(selectedMergeCode) + " "
    );
  }
};

const saveLetter = async (
  letterId,
  caseId,
  letterheadId,
  letterRef,
  letterContent,
  footerContent,
  modalActions,
  iln,
  createAuditTrail = false
) => {
  if (letterId) {
    return await api.updateLetter(
      letterId,
      {
        caseId,
        letterheadId,
        letterRef,
        letterContent,
        footerContent,
        autosave: createAuditTrail,
      },
      modalActions,
      iln
    );
  } else {
    return await api.saveLetter(
      {
        caseId,
        letterheadId,
        letterRef,
        letterContent,
        footerContent,
        autosave: createAuditTrail,
      },
      modalActions,
      iln
    );
  }
};

const handleSaveLetter = async (
  caseId,
  letterId,
  letterheadId,
  letterRef,
  letterContent,
  footerContent,
  letterSaved,
  dispatch,
  scrollToNote = false,
  openUpdateStatusModal = false,
  createAuditTrail = false,
  modalActions,
  iln
) => {
  try {
    dispatch({
      type: "SET_SAVING_LETTER",
      saving: true,
    });

    const savedLetter = await saveLetter(
      letterId,
      caseId,
      letterheadId,
      letterRef,
      letterContent,
      footerContent,
      modalActions,
      iln,
      createAuditTrail
    );

    letterSaved({ ...savedLetter, openUpdateStatusModal, scrollToNote });

    dispatch({
      type: "SET_LETTER_ID",
      letterId: savedLetter.id,
    });
    dispatch({
      type: "SET_SAVING_LETTER",
      saving: false,
    });
  } catch (e) {
    dispatch({
      type: "SET_SAVING_LETTER",
      saving: false,
    });
  }
};

const getCaseRef = (caseId) => {
  const caseRef = installationPreferences.casePrefix;
  return leftPadWithZeros(caseId, 5, caseRef);
};

let typingTimeout;

const LetterEditor = ({
  letterId: id,
  letterTemplateId,
  letterheadId,
  recipient,
  caseId,
  constituent,
  letterRef = "",
  letterSaved,
  letterBody = "",
  letterFooter,
  sendViaEmail,
  onUnmount,
  additionalMergeCodes = [],
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const saveLetterOnClose = useRef();
  saveLetterOnClose.current = true;

  const [bodyContentPending, setBodyContentPending] = useState(false);
  const [footerContentPending, setFooterContentPending] = useState(false);

  const [constituentDetails] = useConstituentDetails(constituent);
  const [recipientDetails] = useRecipientDetails(recipient);
  const [letterHeadConfig] = useGetLetterHeadConfig(letterheadId);
  const [mergeCodeMap] = useGetMergeCodeMap({
    constituentDetails,
    recipientDetails,
    additionalMergeCodes: customFieldsAsMergeCodeMap(additionalMergeCodes),
    caseRef: getCaseRef(caseId),
    type: "letter",
    iln,
  });

  const [mergeCodes] = useMergeCodesWithContent({
    constituent: constituentDetails,
    recipient: recipientDetails,
    additionalMergeCodes,
    caseId,
    type: "letter",
    iln,
  });

  const [letterEditorState, dispatch] = useLetterEditorState(id, letterBody);

  const [parsedLetterContent, parseLetter] = useParseLetterTemplate({
    letterTemplateId,
    recipientDetails,
    constituentDetails,
    additionalMergeCodes,
    caseId,
    dispatch,
  });

  const {
    displayMergeCodes,
    displayFooter,
    letterContent,
    footerContent,
    saving,
    currentlyFocusedEditor,
    letterId,
    templateParsed,
  } = letterEditorState;

  const [contentReady] = useSetLetterContent(
    letterBody,
    letterFooter,
    parsedLetterContent,
    dispatch
  );

  useSaveLetterOnClose(
    constituentDetails,
    letterSaved,
    saveLetter,
    letterContent,
    footerContent,
    letterId,
    letterRef,
    caseId,
    letterheadId,
    parseLetter,
    saveLetterOnClose,
    onUnmount
  );

  useSaveLetterOnInit(
    saveLetter,
    caseId,
    letterId,
    letterheadId,
    letterRef,
    letterContent,
    footerContent,
    letterSaved,
    dispatch,
    modalActions,
    iln,
    templateParsed
  );

  const [savedStatus] = useAutoSaveLetter(
    handleSaveLetter,
    caseId,
    letterId,
    letterheadId,
    letterRef,
    letterContent,
    footerContent,
    letterSaved,
    dispatch,
    modalActions,
    iln
  );

  useResizeSlider(sliderMinWidth, minViewPortWidth, displayMergeCodes);
  useEditorHeight(editorTopOffset, displayFooter ? editorBottomOffset : 0);
  const [ckEditorReady] = useCkeditorReady();
  useCaptureSpellCheck();

  useUnmountCkeditor();

  const CKconfig = getUserCKEditorConfig("letter", letterHeadConfig || {});

  return (
    <React.Fragment>
      {letterId && letterContent !== undefined && (
        <FlexBox>
          <div
            className={classnames(
              classes.letterEditorContainer,
              ckEditorReady ? null : classes.hidden
            )}
          >
            <LetterActionsHeader
              letterRef={letterRef}
              letterId={letterEditorState?.letterId}
              parseLetter={() => parseLetter(letterContent, footerContent)}
              handleSaveLetter={(parsedLetter, parsedFooter) =>
                saveLetter(
                  letterId,
                  caseId,
                  letterheadId,
                  letterRef,
                  parsedLetter,
                  parsedFooter,
                  modalActions,
                  iln
                )
              }
              handleSendViaEmail={() =>
                handleSendViaEmail(
                  sendViaEmail,
                  saveLetter,
                  letterId,
                  caseId,
                  letterheadId,
                  letterRef,
                  letterContent,
                  footerContent,
                  parseLetter,
                  saveLetterOnClose,
                  dispatch,
                  modalActions,
                  iln
                )
              }
            />

            {templateParsed && contentReady && (
              <FlexBox hAlign={"center"}>
                <LetterBody 
                  onFocus ={(editorInstance) =>
                    dispatch({
                      type: "SET_FOCUSED_EDITOR",
                      currentlyFocusedEditor: editorInstance,
                    })
                  }
                  setBodyContentPending={setBodyContentPending}
                  letterContent={letterContent}
                  CKconfig={CKconfig}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_BODY_CONTENT",
                      letterContent: e.target.value,
                    })
                  }}
                />
              </FlexBox>
            )}
            {displayFooter && (
              <FooterEditor
                onFocus={() =>
                  dispatch({
                    type: "SET_FOCUSED_EDITOR",
                    currentlyFocusedEditor: currentlyFocusedInstance(),
                  })
                }
                onChange={(footerContent) => {
                  setFooterContentPending(true);
                  clearTimeout(typingTimeout);
                  typingTimeout = setTimeout(() => {
                    setFooterContentPending(false);
                    dispatch({
                      type: "UPDATE_FOOTER_CONTENT",
                      footerContent,
                    });
                  }, 1000);
                }}
                footerContent={footerContent}
              />
            )}

            <FlexBox hAlign={"space-between"}>
              <ButtonBar customClassNames={classes.buttonBar}>
                <Button
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_MERGE_CODE_VISIBILITY",
                    })
                  }
                >
                  {iln.gettext(
                    `${displayMergeCodes ? "Hide" : "Show"} Merge Codes`
                  )}
                </Button>
                <Button
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_FOOTER_VISIBILITY",
                    })
                  }
                >
                  {iln.gettext(`${displayFooter ? "Hide" : "Show"} Footer`)}
                </Button>
              </ButtonBar>
              <FlexBox hAlign={"center"} className={classes.saveLetterStatus}>
                {savedStatus}
              </FlexBox>
              <FlexBox hAlign={"flex-end"}>
                <Button
                  isDisabled={
                    footerContentPending || bodyContentPending || saving
                  }
                  onClick={() =>
                    handleSaveLetter(
                      caseId,
                      letterId,
                      letterheadId,
                      letterRef,
                      letterContent,
                      footerContent,
                      letterSaved,
                      dispatch,
                      false,
                      false,
                      true,
                      modalActions,
                      iln
                    )
                  }
                >
                  {saving ? <Spinner scale={0.5} /> : iln.gettext("Save")}
                </Button>
              </FlexBox>
            </FlexBox>
          </div>
          <MergeCodes
            displayBarcode={!!constituent?.DPID}
            type={"letter"}
            mergeCodes={mergeCodes}
            displayMergeCodes={displayMergeCodes}
            toggleMergeCodeDisplay={() => {
              dispatch({
                type: "TOGGLE_MERGE_CODE_VISIBILITY",
              });
            }}
            selectedMergeCode={(selectedMergeCode) =>
              handleMergeCodeSelected(
                selectedMergeCode,
                mergeCodeMap,
                currentlyFocusedEditor
              )
            }
          />
        </FlexBox>
      )}
      {(!ckEditorReady || !letterId || !letterHeadConfig) && (
        <div className={classes.letterEditorContainer}>
          <LetterLoadingPlaceHolder />
        </div>
      )}
    </React.Fragment>
  );
};

LetterEditor.propTypes = propTypes;

export default LetterEditor;
