import { localDateToUTCString } from "../../../helpers/timezoneHelpers";
import { userIdentity } from "../../../helpers/localStorageHelper";

const createUpdatedReviewDateDetails = (completed) => ({
  completed,
  completedBy: completed ? userIdentity.id : 0,
  completedOn: completed ? localDateToUTCString(new Date()) : null,
});

export default createUpdatedReviewDateDetails;
