import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Container = React.lazy(() =>
  import("../components/ManageGroupAccess/ManageContainer.jsx")
);

export default {
  init() {
    const modalNode = document.getElementById("manageInbox");
    const config = { attributes: true };
    const renderComponent = () => {
      const caseworkerID = parseInt(
        document.getElementById("manageInbox").getAttribute("worker")
      );
      caseworkerID &&
        ReactDom.render(
          <Suspense fallback={<div>Loading...</div>}>
            <Providers>
              <Container id={caseworkerID} type={"caseworker"} />
            </Providers>
          </Suspense>,
          document.getElementById("manageInbox")
        );
    };
    const observer = new MutationObserver(renderComponent);

    observer.observe(modalNode, config);
  },
};
