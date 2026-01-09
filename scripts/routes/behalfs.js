import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Behalfs = React.lazy(() => import("../components/Behalfs/Behalfs.jsx"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <Behalfs />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
