import $ from "jquery";
import surveysApi from "../api/src/surveys";
import { userIdentity } from "../helpers/localStorageHelper";

export default {
  init() {
    $(".innercontainer").on("click", ".archive", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const confirmation = confirm(
        "This will archive the survey, its results and all call queues created with it. Are you sure you want to proceed?"
      );
      if (!confirmation) return;
      const surveyID = $(e.target).parents(".segmentCard").data("surveyid");
      surveysApi.archiveSurvey(surveyID).then(() => {
        let surveys = window.surveys;

        if (userIdentity.id !== 1) {
          const surveyIndex = surveys.findIndex(
            (survey) => +survey.ID === +surveyID
          );
          surveys.splice(surveyIndex, 1);
        } else {
          const survey = surveys.find((survey) => +survey.ID === +surveyID);
          survey.visible = "0";
        }
      });
    });

    $(".innercontainer").on("click", ".unarchive", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const confirmation = confirm(
        "This will restore the survey, its results and all call queues created with it. Are you sure you want to proceed?"
      );
      if (!confirmation) return;
      const surveyID = $(e.target).parents(".segmentCard").data("surveyid");
      surveysApi.unarchiveSurvey(surveyID).then(() => {
        let surveys = window.surveys;

        const survey = surveys.find((survey) => +survey.ID === +surveyID);
        survey.visible = "1";
      });
    });
  },
};
