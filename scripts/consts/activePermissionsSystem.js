import { activePermissionSystemTypes } from "./permissionSystemTypes";
import { installationPreferences } from "../helpers/localStorageHelper";

const { permissionSystem } = installationPreferences.permissionSystem;
const activePermissionsSystem =
  activePermissionSystemTypes.includes(permissionSystem);

export default activePermissionsSystem;
