import { differenceInMinutes } from "date-fns";
import { useInterval } from "../../../../hooks/useInterval.jsx";
import { useState } from "react";

const useAutoSaveLetter = (
  handleSaveLetter,
  caseId,
  letterId,
  letterheadId,
  letterRef,
  letterContent,
  footerContent,
  letterSaved,
  dispatch,
  modalActions,
  iln
) => {
  const scrollToNote = false;
  const timeBetweenSaves = 120000;
  const timeBetweenShowingSaveStatus = 5000;
  const [savedStatus, setSavedStatus] = useState("");
  const [lastSaved, setLastSaved] = useState();

  useInterval(async () => {
    await handleSaveLetter(
      caseId,
      letterId,
      letterheadId,
      letterRef,
      letterContent,
      footerContent,
      letterSaved,
      dispatch,
      scrollToNote,
      false,
      false,
      modalActions,
      iln
    );
    setLastSaved(new Date());
  }, timeBetweenSaves);

  useInterval(() => {
    const minutesSinceLastSave = differenceInMinutes(new Date(), lastSaved);

    if (minutesSinceLastSave === -1) return;
    if (minutesSinceLastSave === 0) setSavedStatus("Draft saved moments ago");
    if (minutesSinceLastSave >= 1)
      setSavedStatus(`Draft saved ${minutesSinceLastSave} minutes ago`);
  }, timeBetweenShowingSaveStatus);

  return [savedStatus];
};

export default useAutoSaveLetter;
