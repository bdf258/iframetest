import { userPreferences } from "./localStorageHelper.js";

const getUserEmailSignature = (userEmail) =>
  userPreferences?.emailSignatures?.find(
    ({ email }) =>
      email?.toLowerCase() === (userEmail?.email || userEmail)?.toLowerCase()
  ) || {
    id: -1,
    email: "",
    signature: "",
    created_at: "1970-01-01 00:00:00",
    updated_at: "1970-01-01 00:00:00",
  };

export default getUserEmailSignature;
