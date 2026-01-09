import { FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import CKEditor from "@electedtech/electedtech-ckeditor";
import { getCurrentCkeditorInstance } from "../../../../helpers/ckeditor/getInstance";
import getUserCKEditorConfig from "../../../../helpers/ckeditor/getUserCKEditorConfig.js";
import getUserEmailSignature from "../../../../helpers/getUserEmailSignature";
import { hasCkeditorInstance } from "../../../../helpers/ckeditor/hasInstance";
import propTypes from "./propTypes";
import { signatureBlock } from "../../../ViewCase/ActionsAndNotes/Casenotes/Email/util/signatureBlock";
import { useCkeditorCleanup } from "../../../../helpers/ckeditor/hooks/useCkeditorCleanup";
import { useCkeditorSignatureWidget } from "../../../../helpers/ckeditor/hooks/useCkeditorSignatureWidget";
import useEditorHeight from "../../hooks/useEditorHeight.jsx";
import { useStyles } from "./Styles";

let typingTimeout;
const replaceSignature = (body, newSignature, setEmail) => {
  const emailBody = document.createElement("div");
  emailBody.innerHTML = body;
  const sigContainers = emailBody.getElementsByClassName("signature-container");

  if (sigContainers.length > 0) {
    sigContainers[0].innerHTML = newSignature;
    setEmail(emailBody.innerHTML);
  } else {
    emailBody.innerHTML = `${signatureBlock}<br />${emailBody.innerHTML}`;
    emailBody.getElementsByClassName("signature-container")[0].innerHTML =
      newSignature;
    setEmail(emailBody.innerHTML);
  }

  return emailBody.innerHTML;
};

const setEmailSignature = (
  fromAddress,
  emailBody,
  handleOnChange,
  setLoading,
  setEmail
) => {
  handleOnChange({
    target: {
      value: replaceSignature(
        emailBody,
        getUserEmailSignature(fromAddress).signature,
        setEmail
      ),
      name: "body",
    },
  });
  setLoading(false);
};

const EmailBody = ({
  emailBody = "",
  handleOnChange,
  fromAddress,
  dirty,
  emailInputsContainerRef,
  customClassNames = {},
  setBodyOutOfSync,
  editorBottomOffset = 0,
  editorTopOffset = 0,
}) => {
  const [topOffset, setTopOffset] = useState();

  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const emailBodyContainerRef = useRef();
  const editorDirty = useRef(false);
  const [email, setEmail] = useState(() => emailBody);

  useCkeditorSignatureWidget(
    hasCkeditorInstance(),
    getCurrentCkeditorInstance(),
    emailBody
  );
  useCkeditorCleanup(hasCkeditorInstance(), getCurrentCkeditorInstance());

  useLayoutEffect(() => {
    if (emailInputsContainerRef) {
      const offset =
        emailInputsContainerRef.current.getBoundingClientRect().height +
        editorTopOffset;
      if (offset === topOffset) return;
      setTopOffset(
        emailInputsContainerRef.current.getBoundingClientRect().height +
          editorTopOffset
      );
    }
  });

  useEditorHeight(topOffset, editorBottomOffset);

  useEffect(() => {
    setEmailSignature(fromAddress, email, handleOnChange, setLoading, setEmail);
  }, [fromAddress]);

  useEffect(() => {
    if (editorDirty.current) return;

    if (hasCkeditorInstance()) {
      if (getCurrentCkeditorInstance().checkDirty()) {
        editorDirty.current = true;
        dirty(true);
      }
    }
  });

  const CKconfig = getUserCKEditorConfig("email");

  return (
    <React.Fragment>
      {loading ? (
        <FlexBox hAlign={"center"}>
          <Spinner scale={2} />
        </FlexBox>
      ) : (
        <div ref={emailBodyContainerRef}>
          <CKEditor
            name="body"
            data={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearTimeout(typingTimeout);
              setBodyOutOfSync(true);
              typingTimeout = setTimeout(() => {
                handleOnChange(e);
                setBodyOutOfSync(false);
              }, 1000);
            }}
            customClassNames={{
              ...customClassNames,
              container: classes.ckeditor,
            }}
            config={CKconfig}
          />
        </div>
      )}
    </React.Fragment>
  );
};

EmailBody.propTypes = propTypes;

export default EmailBody;
