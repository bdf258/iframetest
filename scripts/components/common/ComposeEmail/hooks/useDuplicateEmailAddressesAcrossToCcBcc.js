import { useEffect, useState } from "react";
import { duplicateEmailAddressesAcrossToCcBcc } from "../common/duplicateEmailAddressesAcrossToCcBcc";

const useDuplicateEmailAddressesAcrossToCcBcc = (to, cc, bcc) => {
  const [duplicateEmailAddresses, setDuplicateEmailAddresses] = useState([]);

  const hasDuplicates = (currentEmailAddresses, duplicateEmailAddresses) =>
    currentEmailAddresses.some((emailAddress) =>
      duplicateEmailAddresses.some(
        (duplicateEmailAddress) => emailAddress.label === duplicateEmailAddress
      )
    );

  useEffect(() => {
    const duplicateEmailAddresses = duplicateEmailAddressesAcrossToCcBcc(
      to.chips,
      cc.chips,
      bcc.chips,
      "label"
    );

    setDuplicateEmailAddresses({
      toHasDuplicates: hasDuplicates(to.chips, duplicateEmailAddresses),
      ccHasDuplicates: hasDuplicates(cc.chips, duplicateEmailAddresses),
      bccHasDuplicates: hasDuplicates(bcc.chips, duplicateEmailAddresses),
    });
  }, [to, cc, bcc]);

  return [duplicateEmailAddresses];
};

export default useDuplicateEmailAddressesAcrossToCcBcc;
