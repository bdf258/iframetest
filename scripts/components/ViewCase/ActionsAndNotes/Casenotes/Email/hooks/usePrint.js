import React, { useContext } from "react";

import { DATE_FORMAT } from "../../../../../../consts/Date.js";
import LoadingEmailThreadModal from "../LoadingEmailThreadModal/LoadingEmailThreadModal.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import addBreaksInPreTag from "../../../../../common/Email/util/handlePreTag";
import api from "@electedtech/api";
import { format } from "date-fns";
import { installationPreferences } from "../../../../../../helpers/localStorageHelper.js";
import newlineToBreak from "../../../../../common/Email/util/newlineToBreak";
import sanitiseHtmlString from "../../../../../../helpers/sanitiseHtmlString";

const print = (
  {
    dateTime,
    subject,
    purifiedBody,
    plainBody,
    from: { email: fromEmail },
    to,
    cc,
    bcc,
    caseID,
  },
  iln
) => {
  const printWindow = window.open();
  printWindow.document.write(
    sanitiseHtmlString(
      `
    <Table style="border-bottom: solid 1px black; width: 100%; font-size: 10pt;">
      <tr>
        <td><strong>${iln.gettext("Date: ")}</strong></td>
        <td>${format(
          new Date(`${dateTime.replace(" ", "T")}Z`),
          `${DATE_FORMAT.DATE} ${DATE_FORMAT.TIME}`
        )}</td>
      </tr>
      <tr>
        <td><strong>${iln.gettext("From: ")}</strong></td>
        <td>${fromEmail}</td>
      </tr>
      <tr>
        <td><strong>${iln.gettext("To: ")}</strong></td>
        <td>${to.map(({ email }) => email).join(", ")}</td>
      </tr>          
      <tr>
        <td>
          ${cc.length > 0 ? "<strong>" + iln.gettext("Cc: ") + "</strong>" : ""}
        </td>
        <td>
          ${
            cc.length > 0
              ? cc.map(({ email }) => email).join(", ") + "<br />"
              : ""
          }
        </td>
      </tr>
      <tr>
        <td>
          ${
            bcc.length > 0
              ? "<strong>" + iln.gettext("Bcc: ") + "</strong>"
              : ""
          }
        </td>
        <td>
          ${
            bcc.length > 0
              ? bcc.map(({ email }) => email).join(", ") + "<br />"
              : ""
          }
        </td>
      </tr>
      <tr>
        <td>
          <strong>${iln.gettext("Case Ref: ")}</strong>
        </td>
        <td>
          ${installationPreferences.casePrefix + caseID}
        </td>
      </tr>
      <tr>
        <td><strong>${iln.gettext("Subject: ")}</strong></td>
        <td>${subject}</td>
      </tr>
    </Table>
    <br />
    <br />
    <Table>
        <tr>
        ${addBreaksInPreTag(purifiedBody) || newlineToBreak(plainBody) || ""}
        </tr>
    </Table>`
    )
  );
  printWindow.document.close(); // necessary for IE >= 10
  printWindow.document.title = `${iln.gettext("Email:")} ${subject}`;
  printWindow.focus(); // necessary for IE >= 10*/
  printWindow.print();
  printWindow.close();
};
export const usePrint = ({ detail: emailDetails }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const { threaded, id: emailId } = emailDetails;
  const loadingThreadModalId = "loadingThreadedEmailContent";

  const handlePrint = () => {
    if (!threaded) {
      print(emailDetails, iln);
      return;
    }
    modalActions.add({
      id: loadingThreadModalId,
      title: iln.gettext("Loading email thread"),
      component: <LoadingEmailThreadModal />,
      blurBackground: true,
      lockWindow: true,
      allowClose: true,
      allowCloseOnBgClick: false,
    });

    api.getEmail(emailId, modalActions, iln).then((emailDetails) => {
      modalActions.removeById(loadingThreadModalId);
      print(emailDetails, iln);
    });
  };

  return [handlePrint];
};
