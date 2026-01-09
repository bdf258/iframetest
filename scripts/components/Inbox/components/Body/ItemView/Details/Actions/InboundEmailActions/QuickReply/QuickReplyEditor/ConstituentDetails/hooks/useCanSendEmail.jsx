const useCanSendEmail = (state) => {
  const {
    loadingPlaceholder,
    loadingOverlay,
    to,
    replyTo,
    from,
    replyFrom,
    selectedConstituent,
    newConstituent,
  } = state;

  const canSendEmail =
    !loadingPlaceholder &&
    !loadingOverlay &&
    (to || replyTo) &&
    (from || replyFrom) &&
    (selectedConstituent?.surname || selectedConstituent?.organisation) &&
    (selectedConstituent?.id || newConstituent);

  return canSendEmail;
};

export default useCanSendEmail;
