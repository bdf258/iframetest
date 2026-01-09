import addToDate from "date-fns/add";
import format from "date-fns/format";

export const getTagIDs = (tagged) =>
  tagged
    ? tagged.chips.reduce((acc, cur) => [...acc, parseInt(cur.id)], [])
    : [];

const convertTimescaleToDate = (timescale) => addToDate(new Date(), timescale);

// if string: ready to submit
// else: object of x days/months/years in the future which needs to be converted
export const convertReviewDate = (reviewDate) => {
  if (reviewDate) {
    return typeof reviewDate === "string"
      ? reviewDate
      : format(convertTimescaleToDate(reviewDate), "yyyy-MM-dd hh:mm:ss");
  }
};

const modifyCreateCaseDetailsForBackend = (payload) => ({
  ...payload,
  tags: getTagIDs(payload.tagged),
  reviewDate: convertReviewDate(payload.reviewDate),
});

export default modifyCreateCaseDetailsForBackend;
