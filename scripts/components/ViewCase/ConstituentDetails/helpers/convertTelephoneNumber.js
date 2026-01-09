const convertTelephoneNumber = (value) => {
  if (!value) {
    return "";
  }

  if (value.substr(0, 3) === "+61") {
    value = value.replace("+61", "0");

    value = value.replace(/[a-zA-Z\s-*._!"`'#$%&,:;<>=@{()}~]/g, "");

    if (value.length === 10) {
      let number;
      if (value.substr(1, 2) == "4") {
        number =
          value.substr(0, 4) +
          " " +
          value.substr(4, 3) +
          " " +
          value.substr(7, 3);
      } else {
        number =
          value.substr(0, 2) +
          " " +
          value.substr(2, 4) +
          " " +
          value.substr(6, 4);
      }

      return number;
    } else {
      return value;
    }
  } else {
    return value;
  }
};

export default convertTelephoneNumber;
