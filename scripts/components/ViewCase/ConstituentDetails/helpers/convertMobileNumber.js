const convertMobileNumber = (value) => {
  if (!value) {
    return "";
  }

  if (value.substr(0, 3) !== "+61") {
    value = "+61" + value.substr(1);
  }

  if (value.substr(0, 3) === "+61") {
    value = value.replace("+61", "0");

    value = value.replace(/[a-zA-Z\s-*._!"`'#$%&,:;<>=@{()}~]/g, "");

    if (value.length === 10) {
      var number =
        value.substr(0, 4) +
        " " +
        value.substr(4, 3) +
        " " +
        value.substr(7, 3);

      return number;
    } else {
      return value;
    }
  } else {
    return value;
  }
};

export default convertMobileNumber;
