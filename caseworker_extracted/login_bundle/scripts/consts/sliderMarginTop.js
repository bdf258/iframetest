import { getInstallationPreferences } from "../helpers/localStorageHelper";

const { version = "" } = getInstallationPreferences() || {};

const sliderMarginTop = { AU: 110 };

export default sliderMarginTop[version.toUpperCase()] || 110;
