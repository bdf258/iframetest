import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Logout = React.lazy(() => import("../components/Logout.jsx"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <Logout />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
