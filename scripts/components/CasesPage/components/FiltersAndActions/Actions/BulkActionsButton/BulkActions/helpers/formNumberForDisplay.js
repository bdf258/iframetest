const formatNumberForDisplay = (numberToFormat) => {
  return new Intl.NumberFormat().format(numberToFormat);
};

export default formatNumberForDisplay;
