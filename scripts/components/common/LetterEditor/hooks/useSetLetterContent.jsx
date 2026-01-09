import { useEffect, useState } from "react";
import { useFooterContent } from "./useFooterContent.jsx";

/**
 * Sets the letter content in state, which CKEditor receives.
 * A new letter will have its associated template parsed before inject the content into the state of the letter editor.
 * Existing letters are not parsed, as they would have been parsed in the past. Parsing the template also happens when saving the letter.
 * The content of an existing letter is passed into the letter editors state directly.
 *
 * Note CKEditor is only loaded after the content is set, this prevents a race condition between CKEditor and the template parsing.
 *
 * @param letterBody - The letter body that is passed into the letter editor, an existing letter.
 * @param letterFooter - The letter footer that is passed into the letter editor, an existing letter.
 * @param parsedLetterContent - The content of the letter is parsed if it is a new letter, this parses the selected letter template.
 * @param dispatch
 * @returns {[boolean]}
 */
const useSetLetterContent = (
  letterBody,
  letterFooter,
  parsedLetterContent,
  dispatch
) => {
  const [footerContent] = useFooterContent();
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (letterFooter) {
      dispatch({
        type: "UPDATE_FOOTER_CONTENT",
        footerContent: letterFooter,
      });
      return;
    }
    if (footerContent) {
      dispatch({
        type: "UPDATE_FOOTER_CONTENT",
        footerContent,
      });
    }
  }, [footerContent, letterFooter]);

  /**
   * An existing letter is passed into the letter editor
   * Therefore it does not need to parse the content
   * */
  useEffect(() => {
    if (letterBody) {
      setContentReady(true);
    }
  }, []);

  /**
   * New letter the body needs to be parsed with the associated template before it is injected into the letter editor state.
   */
  useEffect(() => {
    if (parsedLetterContent) {
      dispatch({
        type: "UPDATE_BODY_CONTENT",
        letterContent: parsedLetterContent,
      });
      setContentReady(true);
    }
  }, [parsedLetterContent]);

  return [contentReady];
};

export default useSetLetterContent;
