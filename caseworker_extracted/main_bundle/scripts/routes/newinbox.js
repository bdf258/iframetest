import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import inboxStore from "../store/inboxStore.js";

const InboxPage = React.lazy(() => import("../components/Inbox/index.js"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers reduxStore={inboxStore}>
          <InboxPage />
        </Providers>
      </Suspense>,
      document.getElementById("inboxReactApp")
    );
  },
};
