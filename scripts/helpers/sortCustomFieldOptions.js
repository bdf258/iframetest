const sortCustomFieldOptions = (a, b) => {
  if (a.text === b.text) {
    return 0;
  } else {
    return a.text < b.text ? -1 : 1;
  }
};

export default sortCustomFieldOptions;
