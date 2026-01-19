import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Groups = React.lazy(() => import("../components/Groups/Groups.jsx"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <Groups />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
