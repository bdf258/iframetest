import { getAddressForLocale, getAddressLine } from "../util/formatAddress";
import { useEffect, useState } from "react";

import { DATE_FORMAT } from "../../../../consts/Date";
import { differenceInYears } from "date-fns";
import format from "date-fns/format";
import { getAddressBlock } from "../../LetterEditor/hooks/common/addressBlock";
import localStorageHelper from "../../../../helpers/localStorageHelper";
import ordinalSuffix from "../../../../helpers/ordinalSuffix";

const getAge = (dateOfBirth) => {
  try {
    return differenceInYears(new Date(), new Date(dateOfBirth));
  } catch {
    return null;
  }
};

const getOrdinalAge = (age) => {
  try {
    return ordinalSuffix(age);
  } catch {
    return null;
  }
};

const getMonthDayOfBirth = (dob) => {
  try {
    return format(new Date(dob), "do MMMM");
  } catch {
    return "";
  }
};

const getDateOfBirth = (dateOfBirth) => {
  try {
    return format(new Date(dateOfBirth), DATE_FORMAT.DATE);
  } catch {
    return "";
  }
};

export const getConstituentDetails = (constituent, locale) => {
  constituent = {
    name: {
      title: constituent.title,
      firstName: constituent.firstName,
      surname: constituent.surname,
      knownAs: constituent.knownAs,
    },
    postNominal: constituent.postNominal,
    role: constituent.role,
    organisation: constituent.organisation,
    address: getAddressForLocale(constituent, locale),
    contactDetails: {
      telephone: constituent.telephone,
      mobile: constituent.mobile,
      email: constituent.email,
    },
    ordinalAge: getOrdinalAge(getAge(constituent.dob)),
    monthDayOfBirth: getMonthDayOfBirth(constituent.dob),
    dob: getDateOfBirth(constituent.dob),
    ref1: constituent.ref1,
    ref2: constituent.ref2,
    ref3: constituent.ref3,
    DPID: constituent?.DPID,
    membership: constituent.membership,
  };

  return {
    ...constituent,
    addressLine: getAddressLine(constituent),
    addressBlock: getAddressBlock(constituent, locale),
  };
};

const useConstituentDetails = (constituent) => {
  const [locale] = useState(
    () => localStorageHelper.getItem("installationPreferences").locale
  );
  const [formattedConstituentDetails, setFormattedConstituentDetails] =
    useState();

  useEffect(() => {
    if (constituent) {
      setFormattedConstituentDetails(
        getConstituentDetails(constituent, locale)
      );
    }
  }, [constituent]);

  return [formattedConstituentDetails];
};

export default useConstituentDetails;
