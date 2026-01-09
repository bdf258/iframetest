export const bulkEmailMergeCodes = (iln) => [
  {
    mergeCode: `[[${iln.gettext("CaseRef")}]]`,
    description: iln.gettext("Case Reference"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentTitle")}]]`,
    description: iln.gettext("Constituent's Title"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentFirstname")}]]`,
    description: iln.gettext("Constituent's First Name"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentSurname")}]]`,
    description: iln.gettext("Constituent's Surname"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentEmail")}]]`,
    description: iln.gettext("Constituent's Email"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentAddress1")}]]`,
    description: iln.gettext("First Line of Constituent's Address"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentAddress2")}]]`,
    description: iln.gettext("Second Line of Constituent's Address"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentTown")}]]`,
    description: iln.gettext("Constituent's Town"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentState")}]]`,
    description: iln.gettext("Constituent's State"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentPostcode")}]]`,
    description: iln.gettext("Constituent's Postcode"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentAddressBlock")}]]`,
    description: iln.gettext("Constituent's Address as a Block"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentOrdinalAge")}]]`,
    description: iln.gettext("Constituent Ordinal Age"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentMonthDayOfBirth")}]]`,
    description: iln.gettext("Constituent Month and Day of Birth"),
  },
  {
    mergeCode: `[[${iln.gettext("ConstituentDOB")}]]`,
    description: iln.gettext("Constituent Date of Birth (d/m/Y)"),
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
    mergeCode: `[[${iln.gettext("date")}]]`,
    description: iln.gettext("Today's Date"),
  },
];
