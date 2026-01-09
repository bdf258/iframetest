import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const CasesPage = React.lazy(() =>
  import("../components/CasesPage/CasesPage.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <CasesPage />
        </Providers>
      </Suspense>,
      document.getElementById("caseapp")
    );
  },
};
