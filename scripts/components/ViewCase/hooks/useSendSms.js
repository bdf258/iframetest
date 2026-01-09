import {
  FlexBox,
  ModalContext,
  SliderContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import SMSAPI from "../../../api/src/sms";
import { TranslationContext } from "context/translate";
import { addCallingCode } from "../ActionsAndNotes/util/formatMobileNumbers";
import { createUseStyles } from "react-jss";
import { dispatchAddCasenote } from "../slice/viewCaseSlice";
import { getCaseworkers } from "../../../helpers/localStorageHelper";
import { useDispatch } from "react-redux";

const useStyles = createUseStyles({
  overlayContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    background: "white",
  },
  textContainer: {
    marginTop: "30vh",
    textAlign: "center",
  },
  spinner: {
    color: "white",
  },
});

const useSendSms = () => {
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);
  const dispatch = useDispatch();
  const classes = useStyles();
  const openSliderWithSendingSmsIndicator = () => {
    sliderActions.open({
      title: iln.gettext("Send SMS"),
      component: (
        <FlexBox hAlign={"space-around"}>
          <div className={classes.textContainer}>
            <Spinner scale={1} customClassNames={classes.spinner} />
            <div>{iln.gettext("Sending SMS")}</div>
          </div>
        </FlexBox>
      ),
    });
  };

  const getCaseworkerName = (id) => {
    const caseworker = getCaseworkers().filter(({ ID }) => parseInt(ID) === id);
    if (caseworker.length > 0) return caseworker[0].caseworkerName;
    return "";
  };

  const sendSms = ({ caseID, from, to, body }) => {
    const fromWithCallingCode = addCallingCode(from);
    const toWithCallingCode = addCallingCode(to);

    openSliderWithSendingSmsIndicator();
    SMSAPI.sendSms(
      { caseID, from: fromWithCallingCode, to: toWithCallingCode, body },
      modalActions
    )
      .then(
        ({
          caseID,
          from,
          to,
          plainBody,
          type,
          dateTime,
          assignedTo,
          id,
          noteID,
        }) => {
          dispatch(
            dispatchAddCasenote({
              openUpdateStatusModal: true,
              id: noteID,
              type: "email",
              caseworkerID: assignedTo,
              caseID,
              caseworkerName: getCaseworkerName(assignedTo),
              timestamp: dateTime,
              detail: {
                id,
                caseID,
                type,
                to: [to],
                from: [from],
                plainBody,
                dateTime,
                assignedTo,
              },
            })
          );
        }
      )
      .catch(() => {
        sliderActions.close();
      })
      .finally(() => {
        sliderActions.close();
      });
  };
  return [sendSms];
};

export default useSendSms;
