import { userPreferences } from "../../../helpers/localStorageHelper";

const descending = userPreferences?.viewCaseOrder === "DESC";

const sortCasenotes = (casenotes) => {
  const today = new Date();

  const getDateValue = (casenote) => {
    if (casenote.type === "reviewDate" && casenote.detail.completed) {
      return [new Date(casenote.detail.completedOn)];
    } else if (
      casenote.type === "reviewDate" &&
      new Date(casenote.detail.reviewDate) < today
    ) {
      return [new Date(casenote.detail.reviewDate), true];
    } else {
      return [new Date(casenote.timestamp)];
    }
  };

  return casenotes.sort((a, b) => {
    const [dateA, expiredA] = getDateValue(a);
    const [dateB, expiredB] = getDateValue(b);

    if (expiredA && expiredB) {
      return dateA - dateB;
    } else if (expiredA) {
      return -1;
    } else if (expiredB) {
      return 1;
    } else {
      return descending ? dateB - dateA : dateA - dateB;
    }
  });
};

export default sortCasenotes;
