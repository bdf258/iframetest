const getAddress = ({
  registeredAddress1 = "",
  registeredAddress2 = "",
  registeredTown = "",
  registeredState = "",
  registeredPostcode = "",
  address1 = "",
  address2 = "",
  town = "",
  county = "",
  postcode = "",
} = {}) => {
  const join = (array) => array.filter((x) => !!x.trim()).join(", ");
  const hasRegisteredAddress =
    (registeredAddress1.trim() ||
      registeredAddress2.trim() ||
      registeredTown.trim() ||
      registeredState.trim() ||
      registeredPostcode.trim()) !== "";
  const hasPostalAddress =
    (address1.trim() ||
      address2.trim() ||
      town.trim() ||
      county.trim() ||
      postcode.trim()) !== "";

  return hasRegisteredAddress
    ? join([
        registeredAddress1,
        registeredAddress2,
        registeredTown,
        registeredState,
        registeredPostcode,
      ])
    : hasPostalAddress
    ? join([address1, address2, town, county, postcode])
    : undefined;
};

export default getAddress;
