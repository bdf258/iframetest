import {
  getCaseworkers,
  getInstallationPreferences,
} from "../../../helpers/localStorageHelper";

const { forwardInAddresses } = getInstallationPreferences();
const userEmailAddresses = getCaseworkers().map((cw) => cw.email);
const inboundAddresses = [...forwardInAddresses, ...userEmailAddresses];

const getNameAndAddressFromEmail = (from, to) => {
  try {
    const isInboundAddress = inboundAddresses.includes(from.address);

    const name = isInboundAddress ? to[0].name : from.name;
    let firstName = "";
    let surname = "";

    if (name.includes(",")) {
      const [start, ...rest] = name.split(",");
      firstName = rest.join(" ") || "";
      surname = start || "";
    } else if (name.includes(" ")) {
      const [start, ...rest] = name.split(" ");
      firstName = start || "";
      surname = rest.join(" ") || "";
    } else {
      surname = name;
    }

    return {
      firstName: firstName.trim(),
      surname: surname.trim(),
      email: (isInboundAddress ? to[0].email : from.email).trim(),
    };
  } catch {
    return {
      firstName: "",
      surname: "",
      email: "",
    };
  }
};

export default getNameAndAddressFromEmail;
