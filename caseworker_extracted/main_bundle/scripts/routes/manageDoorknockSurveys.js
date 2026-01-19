/*eslint-disable*/
import $ from "jquery";
import doorknockSurveysApi from "../api/src/doorknocking";
import { userIdentity } from "../helpers/localStorageHelper";

/**
 *
 * @param bodyText - Text that is displayed in the body of the confirmation modal
 * @param confirmActionId - The confirm buttons ID, this is used to call different actions for archiving and unarchiving
 */
const surveyArchiveActionConfirmationModal = ({
  bodyText,
  confirmButtonText,
  confirmActionId,
}) => {
  return `<div 
            class="reveal-modal"
            id="outer-confirm-archive-modal-container"
          >
          <div
            id="confirm-archive-modal"
          >
            <h2 style="margin-bottom:10px;">Confirm Action</h2>
            <div style="height: auto;">
              <p>${bodyText}</p>
            </div>
            <div style="margin-top:5px; display: flex; justify-content: space-between">
              <div>
                <a 
                  href="#" 
                  style="min-width: unset" 
                  class="buttonLink" 
                  onclick="$('#outer-confirm-archive-modal-container').remove(); $('.reveal-modal-bg').hide();">
                    Cancel
                </a>
            </div>
              <div id="emailDraftSave"></div>
              <div><a id=${confirmActionId} href="#" style="min-width: unset" class="buttonLink"">${confirmButtonText}</a>
              </div>
            </div>
            <a class="close-reveal-modal" onclick="$('#outer-confirm-archive-modal-container').remove(); $('.reveal-modal-bg').hide();">×</a>
          </div>
        </div>`;
};

export default {
  init() {
    $(".innercontainer").on("click", ".archive", (e) => {
      const confirmButtonText = "Archive";
      const bodyText =
        "This will archive the survey, its results and all call queues created with it. Are you sure you want to proceed?";
      const confirmActionId = "confirm-archive-survey";

      $("#currentSurveysArchiveConfirmationModal").append(
        surveyArchiveActionConfirmationModal({
          bodyText,
          confirmButtonText,
          confirmActionId,
        })
      );
      $("#outer-confirm-archive-modal-container").reveal();

      e.preventDefault();
      e.stopPropagation();

      $(`#${confirmActionId}`).click(() => {
        const surveyID = $(e.target).parents(".segmentCard").data("surveyid");
        doorknockSurveysApi.archiveDoorknockSurvey(surveyID).then(() => {
          let surveys = window.surveys;

          if (userIdentity.id !== 1) {
            const surveyIndex = surveys.findIndex(
              (survey) => +survey.ID === +surveyID
            );
            surveys.splice(surveyIndex, 1);
          } else {
            const survey = surveys.find((survey) => +survey.id === +surveyID);
            survey.visible = "0";
          }
          $("#outer-confirm-archive-modal-container").remove();
          $(".reveal-modal-bg").hide();
        });
      });
    });

    $(".innercontainer").on("click", ".unarchive", (e) => {
      const confirmButtonText = "Unarchive";

      const bodyText =
        "This will restore the survey, its results and all call queues created with it. Are you sure you want to proceed?";
      const confirmActionId = "confirm-unarchive-survey";

      $("#currentSurveysArchiveConfirmationModal").append(
        surveyArchiveActionConfirmationModal({
          bodyText,
          confirmButtonText,
          confirmActionId,
        })
      );

      $("#outer-confirm-archive-modal-container").reveal();

      e.preventDefault();
      e.stopPropagation();
      $(`#${confirmActionId}`).click(() => {
        const surveyID = $(e.target).parents(".segmentCard").data("surveyid");
        doorknockSurveysApi.unarchiveDoorknockSurvey(surveyID).then(() => {
          let surveys = window.surveys;

          const survey = surveys.find((survey) => +survey.id === +surveyID);
          survey.visible = "1";
          $("#outer-confirm-archive-modal-container").remove();
          $(".reveal-modal-bg").hide();
        });
      });
    });
  },
};
