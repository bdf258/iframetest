import { post } from "./util/fetch";

/**
 * Auth a user and login them in
 * @param {Object} payload - The payload passed to the backend.
 * @param {String} payload.email - The text of the login email.
 * @param {String} payload.password - The text of password.
 * @param {String} payload.secondFactor - The text of the yubikey or google authenticator code.
 * @param {String} payload.locale - The locale of the user.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const login = async (payload) => await post("/auth", payload);

/**
 * Auth a user and login them in
 * @param {Object} payload - The payload passed to the backend.
 * @param {String} payload.JWT - The text of password.
 * @param {String} payload.locale - The locale of the user.
 * @param {String} payload.type - The type of sso e.g. "microsoft"
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const sso = async (payload) => await post("/auth/sso", payload);

const loginAPI = {
  login,
  sso,
};

export default loginAPI;
