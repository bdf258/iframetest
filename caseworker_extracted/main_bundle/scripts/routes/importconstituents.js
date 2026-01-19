import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const ImportConstituents = React.lazy(() =>
  import("../components/Tools/ImportConstituents")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <ImportConstituents />
        </Providers>
      </Suspense>,
      document.getElementById("importConstituentsReactApp")
    );
  },
};
