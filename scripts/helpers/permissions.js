import { disabledFeatures } from "./localStorageHelper";

function test(condition) {
  return new Promise((resolve, reject) => {
    condition ? resolve(true) : reject(false);
  });
}

function userCanDoTemplates() {
  return !disabledFeatures.includes("unlayerEditor");
}
export { test, userCanDoTemplates };
