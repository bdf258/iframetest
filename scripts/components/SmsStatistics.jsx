import {
  FormDatePicker,
  FormHandler,
  ModalContext,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import { SortedHeader, getSortMethod } from "./common/TableSort/TableSort.jsx";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  datePicker: {
    maxWidth: 300,
    minWidth: 300,
  },
  dateLabel: {
    width: 30,
    maxWidth: 50,
  },
  margins: {
    margin: "20px 0 20px 0",
  },
  smsText: {
    border: "none",
    background: "none",
    padding: "0",
  },
});

const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

function SmsStatistics() {
  const { modalActions } = useContext(ModalContext);
  const [SMSData, setSMSData] = useState([]);
  const [formData, setFormData] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sorted, setSorted] = useState({
    sortBy: "sendDateTime",
    sortType: "date",
    ascending: true,
  });

  const iln = useContext(TranslationContext);
  const getData = async (dateArray, modalActions) => {
    setLoading(true);
    const data =
      dateArray.length == 0
        ? await api.getSMSData(dateArray, modalActions)
        : await api.getDateRangeData(dateArray, modalActions);
    setLoading(false);

    setMsgs(() => {
      const temp = [];
      data.map((sms) => {
        temp.push({
          sendDateTime: sms.sendDateTime,
          fullMessage: sms.Message,
          truncatedMessage: sms.Message.substring(0, 60) + "...",
        });
      });
      return temp;
    });
    setSMSData(() =>
      data.map((sms) => {
        return {
          ...sms,
          Message: sms.Message.substring(0, 60) + "...",
        };
      })
    );
  };
  useEffect(() => {
    //to reset styles which come with any clickable element in the <SmartTable /> component.
    const btn = document.getElementsByTagName("button");
    const btnsToExlude = [
      "Name",
      "DateTime",
      "Sent From",
      "Message",
      "Number of Messages",
    ];
    Array.from(btn).forEach((b) => {
      if (!btnsToExlude.includes(b.innerText)) {
        b.style.textDecoration = "none";
        b.style.textAlign = "left";
      }
    });
  });
  useEffect(() => {
    if (formData.from && formData.to) {
      setSMSData(() => []);
      setError("'To' earlier then 'From");
      const valid = new Date(formData.to) - new Date(formData.from) > 0;
      if (valid) {
        setError("");
        let from = dateFormatter(formData.from);
        let to = dateFormatter(formData.to);
        getData([from, to], modalActions);
      }
    } else if (formData.from == undefined && formData.to == undefined) {
      setError("");
      getData([], modalActions);
    } else {
      setError("Set both dates");
      setSMSData(() => []);
    }
  }, [formData, modalActions]);
  const getMessage = (messageObj) => {
    if (messageObj.Message.includes("...")) {
      return msgs.filter(
        (msg) => msg.sendDateTime == messageObj.sendDateTime
      )[0].fullMessage;
    }
    return msgs.filter((msg) => msg.sendDateTime == messageObj.sendDateTime)[0]
      .truncatedMessage;
  };
  const expandToggle = (row) => {
    const newList = [...SMSData].map((sms) => {
      if (sms.sendDateTime == row.sendDateTime && sms.name == row.name) {
        sms.Message = getMessage(sms);
      }
      return sms;
    });
    setSMSData(() => newList);
  };
  const classes = useStyles();
  return (
    <div>
      <div
        id="dateForm"
        style={{ width: 600, display: "flex", flexDirection: "row" }}
      >
        <FormHandler
          autoSubmit={true}
          equaliseLabelWidth={true}
          onSubmit={(form) => setFormData(form)}
        >
          <FormDatePicker
            label="From"
            name="from"
            error={""}
            dateFormat="d MMMM, yyy"
            keepErrorSpacing={true}
            customClassNames={{
              container: classes.datePicker,
              label: classes.dateLabel,
            }}
            clearButton={true}
          />
          <FormDatePicker
            label="To"
            name="to"
            dateFormat="d MMMM, yyy"
            keepErrorSpacing={true}
            clearButton={true}
            error={error}
            customClassNames={{
              container: classes.datePicker,
              label: classes.dateLabel,
            }}
          />
        </FormHandler>
      </div>
      {SMSData.length > 0 ? (
        <Table>
          <TableHead>
            <SortedHeader
              sortBy={"name"}
              sortType={"string"}
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Name")}
            </SortedHeader>
            <SortedHeader
              sortBy={"sendDateTime"}
              sortType={"dateTime"}
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("DateTime")}
            </SortedHeader>
            <SortedHeader
              sortBy={"sentFrom"}
              sortType={"string"}
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Sent From")}
            </SortedHeader>
            <SortedHeader
              sortBy={"Message"}
              sortType={"string"}
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Message")}
            </SortedHeader>
            <SortedHeader
              sortBy={"NumberOfSMS"}
              sortType={"number"}
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Number of Messages")}
            </SortedHeader>
          </TableHead>
          <TableBody>
            {SMSData.sort(getSortMethod(sorted)).map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.sendDateTime}</TableCell>
                <TableCell>{row.sentFrom}</TableCell>
                <TableCell>
                  <button
                    className={classes.smsText}
                    onClick={() => expandToggle(row)}
                  >
                    {row.Message}
                  </button>
                </TableCell>
                <TableCell>{row.NumberOfSMS}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>
          {loading ? (
            <div>
              Loading Data . . . <Spinner />
            </div>
          ) : (
            !error && <div>No data available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SmsStatistics;
