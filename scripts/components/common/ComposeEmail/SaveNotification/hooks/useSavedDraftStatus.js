import { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";
import { formatDistanceToNow } from "date-fns";
import { useInterval } from "../../../../../hooks/useInterval.jsx";

export const useSavedDraftStatus = (draftSavedTimeStamp) => {
  const iln = useContext(TranslationContext);
  const [draftSavedStatus, setDraftSavedStatus] = useState();

  const updateDraftSavedStatus = (draftSavedTimeStamp) => {
    const timeSinceLastSave = () =>
      formatDistanceToNow(draftSavedTimeStamp, { includeSeconds: true });
    setDraftSavedStatus(iln.gettext(`Draft saved ${timeSinceLastSave()} ago `));
  };

  useEffect(() => {
    if (!draftSavedTimeStamp) {
      return;
    }
    updateDraftSavedStatus(draftSavedTimeStamp);
  }, [draftSavedTimeStamp]);

  useInterval(() => {
    if (!draftSavedTimeStamp) {
      return;
    }

    updateDraftSavedStatus(draftSavedTimeStamp);
  }, 5000);

  return [draftSavedStatus];
};
