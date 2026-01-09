import { useReducer } from "react";

const letterEditorInitialState = (letterId, letterBody) => ({
  letterId: letterId ? letterId : undefined,
  headerContent: undefined,
  letterContent: letterBody ? letterBody : '',
  footerContent: undefined,
  saved: undefined,
  displayMergeCodes: false,
  displayFooter: false,
  loading: true,
  saving: false,
  selectedMergeCode: undefined,
  currentlyFocusedEditor: undefined,
  templateParsed: false,
});

const letterEditorReducer = (state, action) => {
  switch (action.type) {
    case "RESET_EDITOR": {
      return state;
    }
    case "SET_LETTER_ID": {
      return { ...state, letterId: action.letterId };
    }
    case "UPDATE_BODY_CONTENT": {
      return { ...state, letterContent: action.letterContent };
    }
    case "UPDATE_HEAD_CONTENT": {
      return { ...state, headerContent: action.headerContent };
    }
    case "UPDATE_FOOTER_CONTENT": {
      return { ...state, footerContent: action.footerContent };
    }
    case "UPDATED_SAVED": {
      return { ...state, saved: action.saved };
    }
    case "TOGGLE_FOOTER_VISIBILITY": {
      return { ...state, displayFooter: !state.displayFooter };
    }
    case "TOGGLE_MERGE_CODE_VISIBILITY": {
      return { ...state, displayMergeCodes: !state.displayMergeCodes };
    }
    case "SET_LOADING": {
      return { ...state, loading: action.loading };
    }
    case "SET_SAVING_LETTER": {
      return {
        ...state,
        saving: action.saving,
      };
    }
    case "SET_SELECTED_MERGE_CODE": {
      return { ...state, selectedMergeCode: action.selectedMergeCode };
    }
    case "SET_FOCUSED_EDITOR": {
      return {
        ...state,
        currentlyFocusedEditor: action.currentlyFocusedEditor,
      };
    }
    case "SET_TEMPLATE_PARSED": {
      return { ...state, templateParsed: action.templateParsed };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const useLetterEditorState = (letterId, letterBody) => {
  const [letterEditorState, dispatch] = useReducer(
    letterEditorReducer,
    letterEditorInitialState(letterId, letterBody)
  );

  return [letterEditorState, dispatch];
};
