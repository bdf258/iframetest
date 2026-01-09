import {
  Button,
  FlexBox,
  FormDatePicker,
  FormTimeSelect,
  ModalContext,
  NotificationBox,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import { add, format, isPast } from "date-fns";

import ComponentLoading from "../../../../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import { DATE_FORMAT } from "../../../../../../../consts/Date.js";
import OperationCompletedModal from "../../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import ScheduledDatePastConfirmation from "./ScheduledDatePastConfirmation/ScheduledDatePastConfirmation.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { localDateToUTCString } from "@electedtech/helpers/timezoneHelpers";
import propTypes from "./ScheduleSend.propTypes.js";
import useStyles from "./ScheduleSend.styles.js";

const UTCStringToLocalDate = (UTCString) =>
  new Date(`${UTCString.replace(" ", "T")}Z`);

const createSelectedDatetime = (selectedDate, { hour, minute } = {}) => {
  const date = UTCStringToLocalDate(selectedDate);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute,
    0
  );
};

const isInPast = (date, time = {}) => {
  if (!date || !time || time.hour === undefined || time.minute === undefined)
    return true;

  const selectedDate = createSelectedDatetime(date, time);
  // prevent selectedDate having past in the time it takes for payload to reach SendGrid
  const less15MinuteBuffer = add(selectedDate, { minutes: -15 });

  const tooClose = selectedDate - new Date() > 0;
  const inValid = isPast(less15MinuteBuffer);
  return { inValid, tooClose };
};

const isMoreThanThreeDays = (date, time = {}) => {
  if (!date || !time || time.hour === undefined || time.minute === undefined)
    return true;

  const threeDaysFromNow = add(new Date(), { days: 3 });
  const selectedDate = createSelectedDatetime(date, time);
  // prevent selectedDate being more than 72 hours in the time it takes for payload to reach SendGrid
  const added15MinuteBuffer = add(selectedDate, { minutes: 15 });

  return added15MinuteBuffer > threeDaysFromNow;
};

const sendNowModalID = "ScheduledDatePastConfirmationModalID";

const ScheduleSend = ({
  handleOnBack,
  recipientCount,
  email,
  filters,
  closeModal,
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [timeError, setTimeError] = useState({
    touched: {
      hour: false,
      minute: false,
    },
  });
  const [dateError, setDateError] = useState({ touched: false });
  const [fetching, setFetching] = useState(false);

  const timeErrorMessage = () => ({
    hour: timeError.touched.hour && !time.hour,
    minute: timeError.touched.minute && !time.minute,
    text:
      (timeError.touched.hour && !time.hour) ||
      (timeError.touched.minute && !time.minute)
        ? iln.gettext("Time is required")
        : "",
  });

  const sendEmail = (schedule) => {
    setFetching(true);
    api
      .bulkSendEmail(
        {
          ...email,
          caseSearch: {
            ...filters,
            resultsPerPage: undefined,
          },
          schedule,
        },
        modalActions,
        iln
      )
      .then(() => {
        setStep(2);
      })
      .finally(() => setFetching(false));
  };

  return (
    <Stepper step={step}>
      <Step>
        <h3>{iln.gettext("Schedule day and time for send")}</h3>
        {timeError.touched.hour &&
          timeError.touched.minute &&
          dateError.touched &&
          (isInPast(date, time).inValid ? (
            <NotificationBox
              type={"alert"}
              alertMessage={
                isInPast(date, time).tooClose
                  ? iln.gettext(
                      "The scheduled time should be more then 15 minutes in future"
                    )
                  : iln.gettext("The selected time is in the past")
              }
            />
          ) : isMoreThanThreeDays(date, time) ? (
            <NotificationBox
              type={"alert"}
              alertMessage={iln.gettext(
                "The select time is more than 72 hours in the future"
              )}
            />
          ) : null)}
        <FormDatePicker
          onChange={(e) => {
            setDateError({ touched: true });
            setDate(e.target.value);
          }}
          label={iln.gettext("Date")}
          name={"scheduleDate"}
          minDate={new Date()}
          maxDate={add(new Date(), { days: 3 })}
          dropdownMode="select"
          hideClearButton
          dateFormat={DATE_FORMAT}
          value={date}
          error={
            date || !dateError.touched ? "" : iln.gettext("Date is required")
          }
        />
        <FormTimeSelect
          timeIncrement={15}
          customClassNames={{
            label: classes.timeInputLabel,
            hour: {
              container: classes.hourInput,
            },
            minute: {
              container: classes.hourInput,
            },
          }}
          label={iln.gettext("Time")}
          name={"scheduleTime"}
          onChange={(e) => {
            setTime({
              hour: e.target.value.hour,
              minute: e.target.value.minute,
            });
            setTimeError((state) => ({
              touched: {
                ...state.touched,
                [e.target.value.name]: true,
              },
            }));
          }}
          value={time}
          error={timeErrorMessage()}
        />
        <div className={classes.scheduleSendButtonBarContainer}>
          <FlexBox hAlign={"space-between"}>
            <Button
              onClick={() => {
                setStep(0);
                handleOnBack();
              }}
            >
              {iln.gettext("Back")}
            </Button>
            <Button
              isDisabled={
                isInPast(date, time).inValid || isMoreThanThreeDays(date, time)
              }
              onClick={() => setStep(1)}
            >
              {iln.gettext("Next")}
            </Button>
          </FlexBox>
        </div>
      </Step>

      <Step>
        {!fetching ? (
          <ConfirmationModal
            message={
              <div>
                <NotificationBox
                  type="alert"
                  alertMessage={iln.gettext("This cannot be undone")}
                />
                {iln.gettext(
                  "Please confirm you wish to send this email to %1 constituents at %2 on %3 by entering the number of recipients below",
                  recipientCount?.toLocaleString(),
                  `${time?.hour}:${time?.minute}`,
                  date && format(new Date(`${date} utc`), DATE_FORMAT)
                )}
                <br />
                <br />
              </div>
            }
            confirmationValue={recipientCount}
            modifyInputValues={(value) => value.replaceAll(",", "")}
            onConfirm={() => {
              if (isInPast(date, time).inValid) {
                modalActions.add({
                  id: sendNowModalID,
                  title: iln.gettext("Send now"),
                  component: (
                    <ScheduledDatePastConfirmation
                      onConfirm={() => {
                        modalActions.removeById(sendNowModalID);
                        sendEmail();
                      }}
                      onCancel={() => modalActions.removeById(sendNowModalID)}
                    />
                  ),
                });
              } else {
                sendEmail(
                  localDateToUTCString(createSelectedDatetime(date, time))
                );
              }
            }}
          />
        ) : (
          <ComponentLoading />
        )}
      </Step>

      <Step>
        <OperationCompletedModal handleDone={closeModal}>
          <p className={classes.center}>
            {iln.gettext(
              "Your bulk email to %1 constituents has been scheduled at %2 on %3.",
              recipientCount?.toLocaleString(),
              `${time?.hour}:${time?.minute}`,
              date && format(new Date(`${date} utc`), DATE_FORMAT)
            )}
          </p>
        </OperationCompletedModal>
      </Step>
    </Stepper>
  );
};

ScheduleSend.propTypes = propTypes;

export default ScheduleSend;
