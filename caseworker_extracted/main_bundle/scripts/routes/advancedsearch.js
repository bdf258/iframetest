import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const AdvancedSearchPage = React.lazy(() =>
  import("../components/AdvancedSearchPage/AdvancedSearchPage.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <AdvancedSearchPage />
        </Providers>
      </Suspense>,
      document.getElementById("advancedSearchReactApp")
    );
  },
};
