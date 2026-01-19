/* global popupAutoLogout */

import { Button, FlexBox } from "@electedtech/electedtech-ui";

import React from "react";
import { addEvent } from "./logging";

// import LoginBox from "../../../components/Login/LoginBox.jsx";
// import authAPI from "../auth";

const errorCodes = (code) =>
  ({
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URL Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a Teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage ",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required ",
    undefined: "",
  }[code]);

/* 
  ***Currently auto logout is handled by the legacy PHP modal***


  const errorModal = (message, error, modalActions) => {
  const modalID = `${error.status}${message}`;
  // if 401 then show login box, otherwise generic error modal
  return error.status === 401
    ? {
        id: modalID,
        title: "You have been signed out due to inactivity",
        allowClose: false,
        allowCloseOnBgClick: false,
        blurBackground: true,
        component: (
          <LoginBox
            onSuccess={() => modalActions.removeById(modalID)}
            api={authAPI}
          />
        ),
      }
    : {
        id: modalID,
        title: `Error ${error.status} - ${errorCodes(error.status)}`,
        allowClose: false,
        allowCloseOnBgClick: false,
        blurBackground: true,
        component: (
          <React.Fragment>
            <p style={{ color: "red" }}>{message}</p>
            <FlexBox hAlign="flex-end">
              <Button onClick={() => modalActions.removeById(modalID)}>
                OK
              </Button>
            </FlexBox>
          </React.Fragment>
        ),
      };
};
  
*/

const errorModal = async (message, error, modalActions) => {
  const modalID = `${error.status}${message}`;
  let httpErrorMessage;

  try {
    httpErrorMessage = await error.text();
  } catch {
    httpErrorMessage = undefined;
  }
  // if 401 then show login box, otherwise generic error modal
  // leaving this here for when Ashnazg is a SPA
  return {
    id: modalID,
    title: `${error.status} - ${errorCodes(error.status)}`,
    allowClose: false,
    allowCloseOnBgClick: false,
    blurBackground: true,
    component: (
      <React.Fragment>
        {typeof message === "string" && (
          <p style={{ color: "red", textAlign: "center" }}>{message}</p>
        )}
        {typeof httpErrorMessage === "string" && (
          <p style={{ color: "red", textAlign: "center" }}>
            {httpErrorMessage}
          </p>
        )}
        <FlexBox hAlign="center">
          <Button onClick={() => modalActions.removeById(modalID)}>OK</Button>
        </FlexBox>
      </React.Fragment>
    ),
  };
};

export const handleError = async (message, error, modalActions) => {
  if (error?.name !== "AbortError") {
    if (error.status === 401) {
      popupAutoLogout && popupAutoLogout();
      addEvent({
        datetime: new Date().toISOString(),
        event: "Showed Auto Logout - handleError.js",
      });
    } else if (modalActions) {
      modalActions.add(await errorModal(message, error, modalActions));
    }
  }
  if (error) throw error;
};
