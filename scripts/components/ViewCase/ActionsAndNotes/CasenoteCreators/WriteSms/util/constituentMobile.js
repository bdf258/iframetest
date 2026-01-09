export const constituentMobile = (constituent) => {
  const { mobile } = constituent;
  if (mobile && mobile.length > 0) {
    const mobilePrimary = mobile.find((mobile) => mobile.primary);
    if (mobilePrimary) {
      return mobilePrimary?.value;
    } else {
      return mobile[0]?.value;
    }
  }
  return "";
};
