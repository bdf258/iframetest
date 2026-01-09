import { useEffect, useState } from "react";
import { getInstallationPreferences } from "../../../../helpers/localStorageHelper";

export const useFooterContent = () => {
  const [installationPreferences] = useState(() =>
    getInstallationPreferences()
  );
  const [footerContent, setFooterContent] = useState();

  useEffect(() => {
    if (!installationPreferences?.letterDefaults?.footer?.html?.pageOne) return;
    setFooterContent(
      installationPreferences.letterDefaults.footer.html.pageOne
    );
  }, [installationPreferences]);

  return [footerContent];
};
