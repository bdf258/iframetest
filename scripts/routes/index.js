import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Login = React.lazy(() => import("../components/Login/Page.jsx"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <Login onLogin={reloadPage} />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};

const reloadPage = (userIdentity) => {
  if (userIdentity.fulluser) {
    if (typeof window.referer !== "undefined") {
      window.location.replace(window.referer);
    } else {
      window.location.replace("home.php");
    }
  } else {
    window.location.replace("call/");
  }
};
