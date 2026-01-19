import React, { Suspense } from "react";

import { Heading } from "@electedtech/electedtech-ui";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const MembersReport = React.lazy(() =>
  import("../components/membershipReport/MembershipReport.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <Heading heading="Membership Reports" />
          <MembersReport />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
