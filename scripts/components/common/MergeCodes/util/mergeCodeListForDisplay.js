import localStorageHelper, {
  membershipEnabled,
} from "../../../../helpers/localStorageHelper";

const locale = localStorageHelper.getItem("installationPreferences").locale;

/**
 * getMergeCodes: A list of merge codes for display.
 * @param {"email" || "letter"} type - The type of merge code list, either letter or email merge codes.
 * @param {boolean} displayBarcode - Display barcode merge code.
 * @param {Array<{mergeCode: String, description: String}>} additionalMergeCodes - Display barcode merge code.
 * @param {object} iln - Translation layer.
 * @returns {Array<{mergeCode: String, description: String}>} A list of merge codes for display.
 * @throws {String} An error message returned by the API.
 */

export const getMergeCodes = ({
  type,
  displayBarcode,
  additionalMergeCodes = [],
  iln,
}) => {
  type = {
    LETTER: type === "letter",
    EMAIL: type === "email",
  };

  const mergeCodeList = [
    {
      mergeCode: `[[${iln.gettext("CaseRef")}]]`,
      description: `${iln.gettext("Case Reference Number")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentTitle")}]]`,
      description: `${iln.gettext("Constituent's Title")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentFirstname")}]]`,
      description: `${iln.gettext("Constituent's First Name")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentSurname")}]]`,
      description: `${iln.gettext("Constituent's Surname")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentRole")}]]`,
      description: `${iln.gettext("Constituent's Role")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentOrganisation")}]]`,
      description: `${iln.gettext("Constituent's Organisation")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentAddress1")}]]`,
      description: `${iln.gettext("First Line of Constituent's Address")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentAddress2")}]]`,
      description: `${iln.gettext("Second Line of Constituent's Address")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentTown")}]]`,
      description: `${iln.gettext("Constituent's Town")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentCounty")}]]`,
      description: `${iln.gettext("Constituent's County")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentPostcode")}]]`,
      description: `${iln.gettext("Constituent's Postcode")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentAddressLine")}]]`,
      description: `${iln.gettext("Constituent's Address Line")}`,
    },

    {
      mergeCode: `[[${iln.gettext("ConstituentTelephone")}]]`,
      description: `${iln.gettext("Constituent's Telephone Number")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentMobile")}]]`,
      description: `${iln.gettext("Constituent's Mobile Number")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentEmail")}]]`,
      description: `${iln.gettext("Constituent's Email")}`,
    },

    {
      mergeCode: `[[${iln.gettext("ConstituentOrdinalAge")}]]`,
      description: `${iln.gettext("Constituents Ordinal Age")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ConstituentMonthDayOfBirth")}]]`,
      description: `${iln.gettext("Constituent's Month and Day of Birth")}`,
    },

    {
      mergeCode: `[[${iln.gettext("CaseWorkerInitials")}]]`,
      description: `${iln.gettext("Case Worker's Initials")}`,
    },
    {
      mergeCode: `[[${iln.gettext("Date")}]]`,
      description: `${iln.gettext("Date")}`,
    },
    {
      mergeCode: `[[${iln.gettext("dateth")}]]`,
      description: `${iln.gettext("Ordinal Date")}`,
    },
    {
      mergeCode: `[[${iln.gettext("datezero")}]]`,
      description: `${iln.gettext("Date Zero")}`,
    },
    {
      mergeCode: `[[${iln.gettext("dateNoDay")}]]`,
      description: `${iln.gettext("Date Without the Day")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ToTitle")}]]`,
      description: `${iln.gettext("Recipient's Title")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ToFirstname")}]]`,
      description: `${iln.gettext("Recipient's Firstname")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ToSurname")}]]`,
      description: `${iln.gettext("Recipient's Surname")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ToRole")}]]`,
      description: `${iln.gettext("Recipient's Role")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ToOrganisation")}]]`,
      description: `${iln.gettext("Recipient's Organisation")}`,
    },
  ];

  const letterOnlyMergeCodes = [
    {
      mergeCode: `[[${iln.gettext("ConstituentDob")}]]`,
      description: `${iln.gettext("Constituent's Date of Birth")}`,
    },
    {
      mergeCode: `[[${iln.gettext("AddressBlock")}]]`,
      description: `${iln.gettext("Recipients Address")}`,
    },
    {
      mergeCode: `[[${iln.gettext("ToEmail")}]]`,
      description: `${iln.gettext("Recipient's Email")}`,
    },
    {
      mergeCode: `[[${iln.gettext("signature")}]]`,
      description: `${iln.gettext("Member's Digital Signature")}`,
    },
  ];

  const localeDependantMergeCodes = {
    en_AU: [
      {
        mergeCode: `[[${iln.gettext("barcodeaddressblock")}]]`,
        description: `${iln.gettext("Barcode Address Block")}`,
      },
    ],
    en_GB: [
      {
        mergeCode: `${iln.gettext("[[Ref1]]")}`,
        description: `${iln.gettext("Constituent's Ref1")}`,
      },
      {
        mergeCode: `${iln.gettext("[[Ref2]]")}`,
        description: `${iln.gettext("Constituent's Ref 2")}`,
      },
      {
        mergeCode: `${iln.gettext("[[Ref3]]")}`,
        description: `${iln.gettext("Constituent's Ref 3")}`,
      },
    ],
  };
  const mergeCodesForLocale = () => {
    switch (locale) {
      case "en_CA":
      case "en_GB": {
        return localeDependantMergeCodes[locale];
      }
      case "cy_GB": {
        return [];
      }
      case "en_AU": {
        return displayBarcode ? localeDependantMergeCodes[locale] : [];
      }
      default: {
        return [];
      }
    }
  };

  const membershipMergeCodes = () => {
    if (!membershipEnabled) return [];
    if (locale !== "en_AU") return [];

    return [
      {
        mergeCode: "[[MembershipNumber]]",
        description: "Membership Number",
      },
      {
        mergeCode: "[[MembershipType]]",
        description: "Membership Type",
      },
      {
        mergeCode: "[[MembershipCost]]",
        description: "Membership Cost",
      },
      { mergeCode: "[[MembershipExpiry]]", description: "Membership Expiry" },
    ];
  };

  if (type.EMAIL)
    return [
      ...mergeCodeList,
      ...membershipMergeCodes(),
      ...additionalMergeCodes,
    ];
  if (type.LETTER)
    return [
      ...mergeCodeList,
      ...letterOnlyMergeCodes,
      ...membershipMergeCodes(),
      ...mergeCodesForLocale(),
      ...additionalMergeCodes,
    ];
};
