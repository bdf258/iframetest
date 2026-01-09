const splitMergedName = (mergedName, surnameFirst = false) => {
  const parts = mergedName.includes(",")
    ? mergedName.split(",")
    : mergedName.split(" ");
  const trimmedParts = parts.map((part) => part.trim());

  let surname = "";
  let firstname = "";
  let middlename = "";

  if (surnameFirst) {
    surname = trimmedParts[0] || "";
    firstname = trimmedParts[1] || "";
    middlename = trimmedParts.length > 2 ? trimmedParts.slice(2).join(" ") : "";
  } else {
    firstname = trimmedParts[0] || "";
    surname =
      trimmedParts.length > 1 ? trimmedParts[trimmedParts.length - 1] : "";
    middlename =
      trimmedParts.length > 2 ? trimmedParts.slice(1, -1).join(" ") : "";
  }

  return { surname, firstname, middlename };
};

export default splitMergedName;
