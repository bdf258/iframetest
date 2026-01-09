import { useReducer } from "react";

const smsMessageReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_RECIPIENT_MOBILE": {
      return { ...state, recipientMobile: { touched: true, value: payload } };
    }
    case "SET_MESSAGE": {
      return { ...state, message: { touched: true, value: payload } };
    }
  }
};

const useSmsEditorState = (initialState) => {
  const [state, dispatch] = useReducer(smsMessageReducer, {
    recipientMobile: {
      touched: false,
      value: initialState.initialRecipientMobile,
    },
    message: {
      touched: false,
      value: initialState.initialMessage,
    },
  });

  const setMessage = (messageContent) =>
    dispatch({
      type: "SET_MESSAGE",
      payload: messageContent,
    });

  const setRecipientMobile = (mobileNumber) =>
    dispatch({
      type: "SET_RECIPIENT_MOBILE",
      payload: mobileNumber,
    });

  return [state, { setMessage, setRecipientMobile }];
};

export default useSmsEditorState;
