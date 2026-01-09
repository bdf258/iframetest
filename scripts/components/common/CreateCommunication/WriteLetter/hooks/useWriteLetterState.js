import { useReducer } from "react";

const initialState = {
  contactType: undefined,
  selectedContact: undefined,
  openLetterEditor: false,
  letterDetails: {
    addressedTo: undefined,
    letterheadId: 1, // default letterhead template
    letterTemplateId: undefined,
    letterTemplateName: undefined,
    letterRef: undefined,
  },
  /*
   * Writing a letter is a two-step process
   * Below state that manages which view to display for the user.
   */
  step: {
    stepOne: true,
    stepTwo: false,
  },

  /*
   * The data source that is used when searching for a contact
   * This can either be the contactList/${id}/search endpoints
   * Or the constituent / organisation object from redux.
   */
  dataSourceType: {
    contactList: true,
    constituent: false,
  },
};
const createCommunicationReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "SET_CONTACT_TYPE": {
      return { ...state, contactType: payload };
    }

    case "SET_SELECTED_CONTACT": {
      return { ...state, selectedContact: payload };
    }

    case "RESET_SELECTED_CONTACT": {
      return { ...state, selectedContact: undefined };
    }

    case "SET_STEP": {
      return {
        ...state,
        step: {
          stepOne: false,
          stepTwo: false,
          [payload]: true,
        },
      };
    }

    case "SET_LETTER_DETAILS": {
      return { ...state, letterDetails: payload };
    }

    case "SET_LETTER_DETAILS_ADDRESSED_TO": {
      return {
        ...state,
        letterDetails: {
          ...state.letterDetails,
          addressedTo: payload,
        },
      };
    }

    case "SET_LETTER_TEMPLATE_ID": {
      return {
        ...state,
        letterDetails: {
          ...state.letterDetails,
          letterTemplateId: payload,
        },
      };
    }

    case "SET_LETTER_TEMPLATE_NAME": {
      return {
        ...state,
        letterDetails: {
          ...state.letterDetails,
          letterTemplateName: payload,
        },
      };
    }

    case "SET_OPEN_LETTER_EDITOR": {
      return { ...state, openLetterEditor: payload };
    }

    case "SET_DATA_SOURCE_TYPE": {
      return {
        ...state,
        dataSourceType: {
          contactList: false,
          constituent: false,
          [payload]: true,
        },
      };
    }

    case "RESET_STATE": {
      return initialState;
    }

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export const useWriteLetterState = () => {
  const [letterState, dispatch] = useReducer(
    createCommunicationReducer,
    initialState
  );

  const dispatchers = {
    setContactType: (contactType) => {
      dispatch({
        type: "SET_CONTACT_TYPE",
        payload: contactType,
      });
    },
    setSelectedContact: (selectedContact) => {
      dispatch({
        type: "SET_SELECTED_CONTACT",
        payload: selectedContact,
      });
    },
    resetSelectedContact: () => {
      dispatch({
        type: "RESET_SELECTED_CONTACT",
      });
    },
    setStep: (step) => {
      dispatch({
        type: "SET_STEP",
        payload: step,
      });
    },
    setLetterDetails: (letterDetails) => {
      dispatch({
        type: "SET_LETTER_DETAILS",
        payload: letterDetails,
      });
    },
    setAddressedTo: (addressedTo) => {
      dispatch({
        type: "SET_LETTER_DETAILS_ADDRESSED_TO",
        payload: addressedTo,
      });
    },
    setLetterTemplateId: (letterTemplateId) => {
      dispatch({
        type: "SET_LETTER_TEMPLATE_ID",
        payload: letterTemplateId,
      });
    },
    setLetterTemplateName: (letterTemplateName) => {
      dispatch({
        type: "SET_LETTER_TEMPLATE_NAME",
        payload: letterTemplateName,
      });
    },
    setOpenLetterEditor: (letterDetails) => {
      dispatch({
        type: "SET_OPEN_LETTER_EDITOR",
        payload: letterDetails,
      });
    },
    setDataSourceType: (dataSourceType) => {
      dispatch({
        type: "SET_DATA_SOURCE_TYPE",
        payload: dataSourceType,
      });
    },
    resetState: () => {
      dispatch({
        type: "RESET_STATE",
      });
    },
  };

  return [letterState, dispatchers];
};
