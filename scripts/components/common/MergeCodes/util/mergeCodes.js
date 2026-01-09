import localStorageHelper, {
  membershipTypes,
} from "../../../../helpers/localStorageHelper";

import { format } from "date-fns";
import { getOrdinalSuffixOnly } from "../../../../helpers/ordinalSuffix";
import getPrimaryConstituentContactDetail from "../../../../helpers/getPrimaryConstituentDetail";

const getInitials = () =>
  localStorageHelper
    .getItem("userIdentity")
    .name.split(" ")
    .map((n) => n[0])
    .join("");

// 3 space prefix to manually write in the date.
const getDateNoDay = () => `   ${format(new Date(), "MMMM yyyy")}`;

class CaseInsensitiveMap extends Map {
  set(key, value) {
    if (typeof key === "string") {
      key = key.toLowerCase();
    }
    return super.set(key, value);
  }

  get(key) {
    if (typeof key === "string") {
      key = key.toLowerCase();
    }

    return super.get(key);
  }

  has(key) {
    if (typeof key === "string") {
      key = key.toLowerCase();
    }

    return super.has(key);
  }
}

const getMembershipType = (membershipId) => {
  if (!membershipId) return "";

  const membership = membershipTypes.find((membershipType) => {
    if (!membershipType) return false;
    return parseInt(membershipType.ID) === membershipId;
  });

  return membership.membershipType;
};

const getMembershipCost = (membershipId) => {
  if (!membershipId) return "";

  const membership = membershipTypes.find((membershipType) => {
    if (!membershipType) return false;
    return parseInt(membershipType.ID) === membershipId;
  });

  return `$${membership.cost}`;
};

const getMembershipExpiry = (expires) => {
  if (!expires) return "";
  return format(new Date(expires), "d MMMM yyyy");
};

const getDateTh = () => {
  const day = format(new Date(), "d");
  const ordinalSuffix = getOrdinalSuffixOnly(day);
  const month = format(new Date(), "MMMM");
  const year = format(new Date(), "yyyy");
  return `${day}<sup>${ordinalSuffix}</sup> ${month} ${year}`;
};

export const conditionalMergeCodeRegex =
  /\*\|\s*IF:\s*([^|]+)\s*\|\*([^*]+)\*\|\s*ELSE:\|\s*([^*]+)\*\|\s*END:IF\s*\|\*/;
export const dataMergeCodeRegex = /\[\[\s*([^\]]+?)\s*\]\]/g;

export const parseMergeCodes = (template, mergeCodeMap) => {
  // Handle conditional merge codes
  const conditionalMatch = template.match(conditionalMergeCodeRegex);

  if (conditionalMatch) {
    const [, condition, ifContent, elseContent = ""] = conditionalMatch;

    const replacement =
      mergeCodeMap.has(condition) && mergeCodeMap.get(condition).trim() !== ""
        ? ifContent
        : elseContent;

    const updatedString = template.replace(
      conditionalMergeCodeRegex,
      (replacement || "").trim()
    );

    return parseMergeCodes(updatedString, mergeCodeMap);
  }

  // Handle data merge codes
  const updatedTemplate = template.replace(dataMergeCodeRegex, (match) =>
    (mergeCodeMap.get(match) || "").trim()
  );

  return updatedTemplate;
};

export const getMergeCodeMap = ({
  constituent,
  recipient,
  additionalMergeCodes = [],
  caseRef,
  type,
  iln,
}) => {
  type = {
    LETTER: type === "letter",
    EMAIL: type === "email",
  };

  if (!recipient) {
    recipient = {
      name: {
        title: "",
        firstName: "",
        surname: "",
      },
      addressBlock: "",
      role: "",
      organisation: "",
    };
  }

  const {
    title: constituentTitle = "",
    firstName: constituentFirstname = "",
    knownAs: constituentKnownAs = "",
    surname: constituentSurname = "",
  } = constituent?.name || {};

  const {
    address1 = "",
    address2 = "",
    county = "",
    postcode = "",
    town = "",
  } = constituent?.address || {};

  const {
    email = [],
    mobile = [],
    telephone = [],
  } = constituent?.contactDetails || {};

  const {
    addressLine: constituentAddressLine = "",
    addressBlock: constituentAddressBlock = "",
    organisation: constituentOrganisation = "",
    ordinalAge: constituentOrdinalAge = "",
    dob: constituentDob = "",
    monthDayOfBirth: constituentMonthOfBirth = "",
    ref1 = "",
    ref2 = "",
    ref3 = "",
    role: constituentRole = "",
  } = constituent || {};

  const {
    title: recipientTitle = "",
    firstName: recipientFirstName = "",
    surname: recipientSurname = "",
  } = recipient.name;

  const {
    addressBlock: recipientAddressBlock = "",
    role: recipientRole = "",
    organisation: recipientOrganisation = "",
    email: recipientEmail = "",
  } = recipient;

  const { membershipNumber, membershipTypeID, expires } =
    constituent?.membership || {};

  // prettier-ignore
  const emailMergeCodes = [
    [`${iln.gettext("[[CaseRef]]")}`, caseRef],
    [`${iln.gettext("[[ConstituentTitle]]")}`, constituentTitle],
    [`${iln.gettext("[[ConstituentFirstname]]")}`, constituentKnownAs ? constituentKnownAs : (constituentOrganisation ? constituentOrganisation : constituentFirstname)],
    [`${iln.gettext("[[ConstituentSurname]]")}`, constituentSurname],
    [`${iln.gettext("[[ConstituentRole]]")}`, constituentRole],

    [`${iln.gettext("[[ConstituentOrganisation]]")}`, constituentOrganisation],
    [`${iln.gettext("[[ConstituentAddress1]]")}`, address1],
    [`${iln.gettext("[[ConstituentAddress2]]")}`, address2],
    [`${iln.gettext("[[ConstituentTown]]")}`, town],
    [`${iln.gettext("[[ConstituentCounty]]")}`, county],
    [`${iln.gettext("[[ConstituentPostcode]]")}`, postcode],
    [`${iln.gettext("[[ConstituentAddressLine]]")}`, constituentAddressLine],
    [`${iln.gettext("[[ConstituentAddressBlock]]")}`, constituentAddressBlock],
    [`${iln.gettext("[[ConstituentTelephone]]")}`, getPrimaryConstituentContactDetail(telephone)],
    [`${iln.gettext("[[ConstituentMobile]]")}`, getPrimaryConstituentContactDetail(mobile)],
    [`${iln.gettext("[[ConstituentEmail]]")}`,getPrimaryConstituentContactDetail(email)],

    [`${iln.gettext("[[Date]]")}`, format(new Date(), 'd MMMM yyyy')],
    [`${iln.gettext("[[dateth]]")}`, getDateTh()],
    [`${iln.gettext("[[datezero]]")}`, format(new Date(), "dd MMMM yyyy")],
    [`${iln.gettext("[[dateNoDay]]")}`, getDateNoDay()],

    [`${iln.gettext("[[ConstituentOrdinalAge]]")}`, constituentOrdinalAge],
    [`${iln.gettext("[[ConstituentMonthDayOfBirth]]")}`, constituentMonthOfBirth],

    [`${iln.gettext("[[CaseWorkerInitials]]")}`, getInitials()],

    [`${iln.gettext("[[ToTitle]]")}`, recipientTitle],
    [`${iln.gettext("[[ToFirstname]]")}`, recipientFirstName],
    [`${iln.gettext("[[ToSurname]]")}`, recipientSurname],
    [`${iln.gettext("[[ToRole]]")}`, recipientRole],
    [`${iln.gettext("[[ToOrganisation]]")}`, recipientOrganisation],
  ];

  // prettier-ignore
  const letterMergeCodes = [
    [`${iln.gettext("[[CaseRef]]")}`, caseRef],

    [`${iln.gettext("[[ConstituentDob]]")}`, constituentDob],

    [`${iln.gettext("[[Date]]")}`, format(new Date(), 'd MMMM yyyy')],
    [`${iln.gettext("[[dateth]]")}`, getDateTh()],
    [`${iln.gettext("[[datezero]]")}`, format(new Date(), "dd MMMM yyyy")],
    [`${iln.gettext("[[dateNoDay]]")}`, getDateNoDay()],

    [`${iln.gettext("[[Ref1]]")}`, ref1],
    [`${iln.gettext("[[Ref2]]")}`, ref2],
    [`${iln.gettext("[[Ref3]]")}`, ref3],

    [`${iln.gettext("[[AddressBlock]]")}`, recipientAddressBlock],
    [`${iln.gettext("[[ToTitle]]")}`, recipientTitle],
    [`${iln.gettext("[[ToFirstname]]")}`, recipientFirstName],
    [`${iln.gettext("[[ToSurname]]")}`, recipientSurname],
    [`${iln.gettext("[[ToRole]]")}`, recipientRole],
    [`${iln.gettext("[[ToOrganisation]]")}`, recipientOrganisation],
    [`${iln.gettext("[[ToEmail]]")}`, recipientEmail],
    [`${iln.gettext("[[barcodeaddressblock]]")}`, `${iln.gettext("[[barcodeaddressblock]]")}`],
    [`${iln.gettext("[[signature]]")}`, `${iln.gettext("[[signature]]")}`]
    ]

  const membershipMergeCodes = [
    [`${iln.gettext("[[MembershipNumber]]")}`, membershipNumber],
    [
      `${iln.gettext("[[MembershipType]]")}`,
      getMembershipType(membershipTypeID),
    ],
    [
      `${iln.gettext("[[MembershipCost]]")}`,
      getMembershipCost(membershipTypeID),
    ],
    [`${iln.gettext("[[MembershipExpiry]]")}`, getMembershipExpiry(expires)],
  ];

  if (type.LETTER)
    return new CaseInsensitiveMap([
      ...emailMergeCodes,
      ...letterMergeCodes,
      ...additionalMergeCodes,
      ...membershipMergeCodes,
    ]);
  if (type.EMAIL)
    return new CaseInsensitiveMap([
      ...emailMergeCodes,
      ...additionalMergeCodes,
      ...membershipMergeCodes,
    ]);
};

export const parseTemplate = ({
  template,
  constituentDetails,
  recipientDetails,
  additionalMergeCodes = [],
  caseRef,
  type,
  iln,
}) => {
  if (!template) return "";

  const mergeCodeMap = getMergeCodeMap({
    constituent: constituentDetails,
    recipient: recipientDetails,
    additionalMergeCodes,
    caseRef,
    type,
    iln,
  });

  return parseMergeCodes(template, mergeCodeMap);
};

export const mergeCodeHelpers = {
  parseTemplate,
  getMergeCodeMap,
};
