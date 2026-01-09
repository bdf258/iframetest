import TranslationContext from "../../../../../../../../../../../../context/translation/TranslationContext.js";
import { getConstituentDetails } from "../../../../../../../../../../../common/MergeCodes/hooks/useConstituentDetails.jsx";
import { getInstallationPreferences } from "../../../../../../../../../../../../helpers/localStorageHelper.js";
import { parseTemplate } from "../../../../../../../../../../../common/MergeCodes/util/mergeCodes.js";
import { useContext } from "react";

const { locale } = getInstallationPreferences() || {};

const useParseQuickReplyTemplate = () => {
  const iln = useContext(TranslationContext);

  const parseQuickReplyBody = (emailContent, constituentDetails) => {
    const formattedConstituentDetails = getConstituentDetails(
      constituentDetails,
      locale
    );

    return parseTemplate({
      template: emailContent,
      constituentDetails: formattedConstituentDetails,
      type: "email",
      iln,
    });
  };
  return [parseQuickReplyBody];
};

export default useParseQuickReplyTemplate;
