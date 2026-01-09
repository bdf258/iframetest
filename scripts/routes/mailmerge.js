import ComponentLoading from "../components/ComponentLoading.jsx";
import MergeCodeListLegacyWrapper from "../components/common/MergeCodeListLegacyWrapper/MergeCodeListLegacyWrapper.jsx";
import Providers from "../context/Providers.jsx";
import React from "react";
import ReactDom from "react-dom";
import { Suspense } from "react";

export default {
  init() {
    import("../helpers/ckeditor").then((CKEDITOR) => {
      new CKEDITOR.default("letter", {
        selector: "editor1",
        height: "500px",
        autocorrect_enabled: true,
        removePlugins: "link,image",
        line_height: "1;1.1;1.15;1.2;1.5;1.75;2",
        extraPlugins: "lineheight,printenvelope",
      });
    });

    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <MergeCodeListLegacyWrapper type={"letter"} />
        </Providers>
      </Suspense>,
      document.getElementById("mergeCodeListForMailMergeLetter")
    );
  },
};
