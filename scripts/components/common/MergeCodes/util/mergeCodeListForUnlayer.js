import customFieldsAsMergeCodes from "../../CustomFields/util/customFieldsAsMergeCodes";
import { getMergeCodes } from "./mergeCodeListForDisplay";

/**
 *
 * @param {"email" || "letter"} communicationType - The type of merge code list, either letter or email merge codes.
 * @param {boolean} displayBarcode - Display barcode merge code.
 * @param {object} iln - Translation layer.
 * @returns {Array<{name: String, value: String, sample: String}>} A list of merge codes for display.
 * @throws {String} An error message returned by the API.
 */
export const mergeCodeListForUnlayer = ({
  communicationType,
  displayBarcode = false,
  iln,
}) => {
  const mergeCodesForDisplay = getMergeCodes({
    type: communicationType,
    displayBarcode,
    iln,
  });

  const customFieldMergeCodes = customFieldsAsMergeCodes();

  return [...mergeCodesForDisplay, ...customFieldMergeCodes].map(
    ({ mergeCode, description }) => ({
      name: description,
      sample: mergeCode,
      value: mergeCode,
    })
  );
};
