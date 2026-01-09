const stringToRBG = (str) => {
  let hash = 0;
  if (typeof str == "undefined") {
    str = "";
  }
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var c = (hash & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

const getTextColor = (bgColor) => {
  return parseInt(bgColor, 16) > 8388607 ? "000000" : "ffffff";
};

const getInitials = (name) => {
  if (typeof name === "undefined") {
    return "";
  }
  var names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length == 3) {
    initials += names[1].substring(0, 1).toUpperCase();
  }
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export { stringToRBG, getTextColor, getInitials };
