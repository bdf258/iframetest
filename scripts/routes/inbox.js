/*global $ */
import React, { Suspense } from "react";

import CKEDITOR from "../helpers/ckeditor";
import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDOM from "react-dom";
import injectCCs from "../helpers/injectCCs";
import renderReactPostInit from "../helpers/renderReactPostInit";

const AssignEmailToCase = React.lazy(
  () => import("../components/Inbox/legacy/AssignEmailToCase.jsx")
);
const UpdateCaseDetails = React.lazy(
  () => import("../components/Inbox/legacy/UpdateCaseDetailsWrapper.jsx")
);

export default {
  init() {
    const windowHeight = window.innerHeight;
    const textareaHeight = windowHeight > 800 ? 346 : 240;
    new CKEDITOR("email", {
      selector: "body",
      height: `${textareaHeight}px`,
    });
    new CKEDITOR("email", {
      selector: "quick_body",
      height: `${textareaHeight}px`,
    });
    injectCCs();

    function updateContactDetails(
      originalSender,
      type,
      constituentID,
      data,
      selector
    ) {
      var inlineStyles = $(selector).parents(".reveal-modal")[0].style;
      var originalStyles = {
        width: inlineStyles.width,
        height: inlineStyles.height,
        minHeight: inlineStyles.minHeight,
        left: inlineStyles.left,
        marginLeft: inlineStyles.marginLeft,
      };
      var newStyles = {
        width: "520px",
        height: "196px",
        minHeight: "196px",
        left: "50%",
        marginLeft: "-300px",
      };
      $(selector).parents(".reveal-modal").css(newStyles);
      $(selector)
        .parents(".reveal-modal")
        .find(".close-reveal-modal")
        .on("click", function () {
          $(selector).parents(".reveal-modal").css(originalStyles);
        });
      return new Promise(function (resolve) {
        var message = "This voter currently ";
        var alreadyHasDetails = false;
        var isAlreadyPrimary = false;
        switch (type) {
          case "SMS-inbound":
          case "Whatsapp-inbound":
            var formattedNumber = originalSender.replace("+61", "0");
            formattedNumber = formattedNumber.replace(/ /g, "");
            if (formattedNumber.length == 10) {
              formattedNumber =
                formattedNumber.substr(0, 4) +
                " " +
                formattedNumber.substr(4, 3) +
                " " +
                formattedNumber.substr(7, 3);
            }
            alreadyHasDetails =
              data.mobile.filter(function (details) {
                if (
                  details.number == formattedNumber &&
                  details.primary === true
                ) {
                  isAlreadyPrimary = true;
                }
                return (
                  details.number == formattedNumber && details.primary === false
                );
              }).length > 0;
            break;
          default:
            alreadyHasDetails =
              data.email.filter(function (details) {
                if (
                  details.email == originalSender &&
                  details.primary === true
                ) {
                  isAlreadyPrimary = true;
                }
                return (
                  details.email == originalSender && details.primary === false
                );
              }).length > 0;
            break;
        }
        if (isAlreadyPrimary) {
          resolve();
          return;
        }

        if (!alreadyHasDetails)
          message += "does not have " + originalSender + " on file";
        else message += "already has " + originalSender + " on file";

        $.get(
          "/templates/modals/inbox-updateContactDetails.php",
          {
            message: message,
            type:
              type == "SMS-inbound" || type == "Whatsapp-inbound"
                ? "mobile"
                : "email",
            alreadyHasDetails: alreadyHasDetails,
            isAlreadyPrimary: isAlreadyPrimary,
          },
          function (modalContent) {
            var action = null;
            $(selector).html(modalContent);
            $(selector + " select")
              .select2({
                minimumResultsForSearch: Infinity,
                placeholder: "Please Select",
              })
              .on("change", function (event) {
                action = event.target.value;
              });

            $(selector).on("click", ".update-contact-details.btn", function () {
              if (action !== null) {
                $.ajax({
                  url: "aj_additionalContactDetails.php",
                  type: "PUT",
                  dataType: "json",
                  data: {
                    action: action,
                    constituentID: constituentID,
                    details: originalSender,
                  },
                  success: function () {
                    $(selector).parents(".reveal-modal").css(originalStyles);
                    resolve();
                  },
                });
              } else {
                var errorMessageContainer = $(selector + " .error-message");
                errorMessageContainer.html("Please pick an action");
                setTimeout(function () {
                  errorMessageContainer.html("");
                }, 2000);
              }
            });
          }
        );
      });
    }

    window.updateContactDetails = updateContactDetails;

    // Checking that target div with id "assignEmailToCaseApp" exists before attempting to render
    renderReactPostInit(
      document.getElementById("assigntocase"),
      "assignEmailToCaseApp",
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <AssignEmailToCase />
        </Providers>
      </Suspense>
    );

    // Renders inside legacy inbox page with $('#changestatus').reveal()
    ReactDOM.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <UpdateCaseDetails />
        </Providers>
      </Suspense>,
      document.getElementById("updateCaseDetailsInboxReactApp")
    );
  },
};
