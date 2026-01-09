import { useState } from "react";

const useTownPostcodeState = ({
  filters: {
    constituentCriteria: { inPostcode = [] },
  },
}) => useState(inPostcode.length > 0 ? "postcode" : "town");

export default useTownPostcodeState;
