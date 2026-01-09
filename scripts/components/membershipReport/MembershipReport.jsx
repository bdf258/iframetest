import {
  Button,
  FlexBox,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import DateSelector from "./DateSelector.jsx";
import ReportTable from "./ReportTable.jsx";
import api from "@electedtech/api";

function MembershipReport() {
  const { setModalState } = useContext(ModalContext);
  const [reportParams, setReportParams] = useState({
    from: "",
    to: "",
  });

  const [dateErrorFrom, setDateErrorFrom] = useState("");
  const [dateErrorTo, setDateErrorTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  const submit = async (e) => {
    const obj = {
      ...reportParams,
    };
    if (dateErrorFrom == "" && dateErrorTo == "") {
      obj.to == "" || obj.from == "" ? setDateErrorFrom("select Dates") : null;
    }
    if (!dateErrorTo && !dateErrorFrom && !(obj.to == "" || obj.from == "")) {
      const btn = e.target;
      btn.disabled = true;
      setLoading(true);
      setReport("");
      const res = await api.getMembershipReport(
        obj,
        setModalState,
        setLoading,
        btn
      );
      if (res) {
        btn.disabled = false;
        setLoading(false);
        setReport(res);
      }
    }
  };

  return (
    <div>
      <DateSelector
        dates={reportParams}
        setDates={setReportParams}
        dateErrorTo={dateErrorTo}
        dateErrorFrom={dateErrorFrom}
        setDateErrorTo={setDateErrorTo}
        setDateErrorFrom={setDateErrorFrom}
      />
      <div>
        <Button size={"small"} onClick={(e) => submit(e)}>
          Generate Report
        </Button>

        {loading ? (
          <FlexBox hAlign={"center"}>
            <h2>
              Generating Report ... <Spinner />
            </h2>
          </FlexBox>
        ) : report ? (
          <ReportTable report={report} />
        ) : null}
      </div>
    </div>
  );
}

export default MembershipReport;
