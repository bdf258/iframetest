import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const RssTable = React.lazy(() =>
  import("../components/Tools/RssTable/RssTable.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <RssTable />
        </Providers>
      </Suspense>,
      document.getElementById("rssApp")
    );
  },
};
