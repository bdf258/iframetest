import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Plugins = React.lazy(() => import("../components/Plugins.jsx"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <Plugins />
        </Providers>
      </Suspense>,
      document.getElementById("pluginsApp")
    );
  },
};
