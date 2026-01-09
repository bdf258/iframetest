import AuAddressForm from "./AuAddressForm/AuAddressForm.jsx";
import GbAddressForm from "./GbAddressForm/GbAddressForm.jsx";
import React from "react";
import { locale } from "../../../helpers/localStorageHelper.js";
import propTypes from "./ConstituentAddressForm.propTypes.js";

const ConstituentAddressForm = ({
  value,
  setValue,
  isSameAsPhysical,
  setIsSameAsPhysical,
}) => {
  switch (locale) {
    case "en_AU":
      return (
        <AuAddressForm
          value={value}
          setValue={setValue}
          isSameAsPhysical={isSameAsPhysical}
          setIsSameAsPhysical={setIsSameAsPhysical}
        />
      );
    case "en_GB":
      return (
        <GbAddressForm
          value={value}
          setValue={setValue}
          isSameAsPhysical={isSameAsPhysical}
          setIsSameAsPhysical={setIsSameAsPhysical}
        />
      );

    default:
      return (
        <GbAddressForm
          value={value}
          setValue={setValue}
          isSameAsPhysical={isSameAsPhysical}
          setIsSameAsPhysical={setIsSameAsPhysical}
        />
      );
  }
};

ConstituentAddressForm.propTypes = propTypes;

export default ConstituentAddressForm;
