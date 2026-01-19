import $ from "jquery";
import emailTemplates from "../api/src/emailTemplates";
import letterHeadAPI from "../api/src/letterHeads";
import letterTemplatesAPI from "../api/src/letterTemplates";

const templateNameNotExists = (name, type) => {
  return new Promise((resolve, reject) => {
    $.get(
      `aj_checkTemplateNameExists.php?name=${name}&type=${type}`,
      (check) => {
        check.valid ? resolve() : reject();
      },
      "json"
    );
  });
};

const preventFormSubmission = (event) => {
  event.preventDefault();
  const form = event.target;

  const templateName = form.querySelector("input[name='name']").value;
  const templateType = form.dataset.type;

  return templateNameNotExists(templateName, templateType)
    .then(() => form.submit())
    .catch(() => {
      $(".error").html("Template name already used");
      setTimeout(function () {
        $(".error").html("");
      }, 2000);
    });
};
window.templateNameNotExists = templateNameNotExists;
window.duplicateLetterHead = letterHeadAPI.duplicateLetterHead;
window.duplicateEmailTemplate = emailTemplates.duplicateEmailTemplate;
window.duplicateTemplate = letterTemplatesAPI.duplicateTemplate;
export { templateNameNotExists, preventFormSubmission };
