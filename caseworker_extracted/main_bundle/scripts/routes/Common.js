/*global closeAutoLogout setupTimer*/
import React, { Suspense } from "react";

import $ from "jquery";
import { Card } from "@electedtech/electedtech-ui";
import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import loginAPI from "../api/src/auth.js";

const cardStyles = {
  width: 400,
  borderRadius: 2,
  padding: 30,
  margin: { top: 50 },
};

const LoginBox = React.lazy(() => import("../components/Login/LoginBox.jsx"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <Card>
            <div style={cardStyles}>
              <LoginBox api={loginAPI} onSuccess={onLogin} />
            </div>
          </Card>
        </Providers>
      </Suspense>,
      document.getElementById("autologoutapp")
    );

    document.addEventListener("createSignatureWidget", function (e) {
      let editorInstance = e.detail;
      editorInstance.widgets.initOn(
        editorInstance.document.findOne(".signature-container"),
        "signatureblock"
      );
      //if CK editor has been initialized
      if (document.querySelectorAll("[id^='cke_']").length > 0) {
        //select all CKeditor divs
        document.querySelectorAll("div[id^='cke_']").forEach((el) => {
          if (el.getAttribute("id").includes("body")) {
            //check if warning already exisits for this div
            if (
              document.querySelectorAll("#" + el.getAttribute("id") + "warning")
                .length < 1
            ) {
              var p = document.createElement("div");
              p.setAttribute("id", "signatureWarning");
              //set warning paragraph with uniqe id using id string of this particular div
              p.innerHTML =
                "<p id='" +
                el.getAttribute("id") +
                "warning' style = 'color:tomato ; font-size : 70% ; margin: 0px' >Signature block is highlighted when you hover over it or when you edit it manually." +
                " Please note that anything written in signature block will not be saved.<a href='/emailsignatures.php?' id =" +
                "'sigConfirm" +
                el.getAttribute("id") +
                "'> Click Here</a> to manage your signatures.</p> ";
              el.appendChild(p);
              //confirm if user wants to go to signatures page.
              document
                .querySelector("#sigConfirm" + el.getAttribute("id"))
                .addEventListener("click", check);
            }
          }
        });
      }
    });
  },
  finalize() {
    $(".updateCustomSelectField").change((e) => {
      if (!window.model.customFields) window.model.customFields = {};
      window.model.customFields[e.target.id] = e.target.value;
    });
  },
};

function check(e) {
  var cfm = confirm(
    "You will be directed to another page, any unsaved data will be lost. Do you wish to continue?"
  );
  if (!cfm) {
    e.preventDefault();
  }
}

window.initSignatureBlock = function (instance) {
  const evt = new CustomEvent("createSignatureWidget", {
    detail: instance,
    bubbles: true,
  });
  document.dispatchEvent(evt);
};

function onLogin() {
  closeAutoLogout();
  setupTimer();
}

export { onLogin };
