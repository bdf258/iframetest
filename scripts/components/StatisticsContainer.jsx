import React, { useState } from "react";

import { Button } from "@electedtech/electedtech-ui";
import PhoneStatistics from "./PhoneStatistics.jsx";
import SmsStatistics from "./SmsStatistics.jsx";

function StatisticsContainer() {
  const [type, setType] = useState("phone");
  const changeType = () =>
    setType((type) => (type == "phone" ? "sms" : "phone"));
  return (
    <div>
      <h2> {type == "phone" ? "Phone Call" : "SMS"} Statistics</h2>
      <Button type="text" onClick={changeType}>
        <span style={{ textDecoration: "underline" }}>
          (View {type == "phone" ? "SMS" : "Phone"} Statistics)
        </span>
      </Button>
      <div style={{ marginTop: 20 }}>
        {type == "phone" ? (
          <>
            <PhoneStatistics />
          </>
        ) : (
          <>
            <SmsStatistics />
          </>
        )}
      </div>
    </div>
  );
}

export default StatisticsContainer;
