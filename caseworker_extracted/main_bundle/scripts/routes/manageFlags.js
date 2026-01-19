import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import ReactDom from "react-dom";

const ManageFlags = React.lazy(() => import("../components/ManageFlags.jsx"));

export default {
  init() {
    // new Vue({
    //   el: '#app',
    //   render: h => h(ManageFlags)
    // })
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <ManageFlags />
      </Suspense>,
      document.getElementById("app")
    );
  },
};
