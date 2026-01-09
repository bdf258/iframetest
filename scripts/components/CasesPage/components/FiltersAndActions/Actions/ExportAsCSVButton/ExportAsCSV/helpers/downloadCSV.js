import { format, isValid } from "date-fns";
import {
  getCaseTypes,
  getCategoryTypes,
  getContactTypes,
  getCustomFields,
  getDisabledFeatures,
  getStatusTypes,
} from "../../../../../../../../helpers/localStorageHelper";

import { DATE_FORMAT } from "../../../../../../consts/Date";
import api from "@electedtech/api";
import downloadCsv from "../../../../../../../../helpers/downloadCsv";
import genCsv from "../../../../../../../../helpers/csvExport";
import getAllCases from "../../../../../../helpers/getAllCases";
import prefixCaseID from "../../../../../../../../helpers/prefixCaseID";
import { toLocalDate } from "../../../../../../../../helpers/timezoneHelpers";

const customFields = getCustomFields() || [];

const statusTypes = getStatusTypes() || [];
const categoryTypes = getCategoryTypes() || [];
const contactTypes = getContactTypes() || [];
const caseTypes = getCaseTypes();
const usePhysicalAddress = !(getDisabledFeatures() || []).includes(
  "Physical Address"
);

const getCategoryTypeName = (categoryTypeId, categoryTypes) => {
  const categoryType = categoryTypes.find(
    (categoryType) => categoryType.id === categoryTypeId
  );
  return categoryType ? categoryType.categorytype : "";
};

const getContactTypeName = (contactTypeId, contactTypes) => {
  const contactType = contactTypes.find(
    (contactType) => contactType.id === contactTypeId
  );
  return contactType ? contactType.contacttype : "";
};

const getDoNotContactTypesNames = (doNotContactIds, doNotContactTypes) =>
  doNotContactTypes.map((doNotContactTypes) =>
    doNotContactIds.includes(doNotContactTypes.id)
      ? { [doNotContactTypes.type]: "True" }
      : { [doNotContactTypes.type]: "" }
  );

const hasAddressSelected = (options, usePhysicalAddress) => {
  return (
    options.postalAddressLine ||
    options.postalAddress1 ||
    options.postalAddress2 ||
    options.postalTown ||
    options.postalCounty ||
    options.postalPostCode ||
    (usePhysicalAddress &&
      (options.registeredAddressLine ||
        options.registeredAddress1 ||
        options.registeredAddress2 ||
        options.registeredSuburb ||
        options.registeredState ||
        options.registeredPostcode))
  );
};

const getFullAddress = (address1, address2, town, county, postcode) => {
  if (address1 || address2 || town || county || postcode) {
    return `${address1 ? address1 + " " : ""}${address2 ? address2 + " " : ""}${
      town ? town + " " : ""
    }${county ? county + " " : ""}${postcode ? postcode + " " : ""}`.trim();
  }
  return "";
};

const getCombinedName = (selectedNameCombination, constituent) => {
  const title = constituent.title ? constituent.title : "";
  const initial = constituent.firstname
    ? constituent.firstname.slice(0, 1)
    : "";
  const firstname = constituent.firstname ? constituent.firstname : "";
  const surname = constituent.surname ? constituent.surname : "";
  let name = "Not set";
  switch (selectedNameCombination) {
    case "titleInitialSurname": {
      name = `${title} ${initial} ${surname}`;
      break;
    }

    case "titleFirstnameSurname": {
      name = `${title} ${firstname} ${surname}`;
      break;
    }

    case "titleSurname": {
      name = `${title} ${surname}`;
      break;
    }

    case "firstnameSurname": {
      name = `${firstname} ${surname}`;
      break;
    }

    case "firstnameOnly": {
      name = `${firstname}`;
      break;
    }
  }

  if (constituent.isOrganisation) {
    name = constituent.organisationName;
  }
  return name.trim();
};

const formatData = ({ cases, options, state, doNotContactTypes, iln }) => {
  return [
    ...cases.map((c) => {
      let caseForCsv = {};
      if (options.caseRefNo) {
        caseForCsv[iln.gettext("Case Ref. No.")] = c.id
          ? prefixCaseID(c.id, 5)
          : "";
      }

      if (options.openedOn) {
        caseForCsv[iln.gettext("Opened on")] = c.created
          ? format(toLocalDate(c.created), DATE_FORMAT)
          : "";
      }
      if (options.closedOn) {
        let correctClosed = "";

        // Use the new closedOn field which is automatically populated by the API
        // closedOn will be the statusDate if closed=true, or null if closed=false
        if (c.closedOn && c.closedOn !== "0000-00-00 00:00:00" && c.closedOn !== "0000-00-00") {
          correctClosed = format(toLocalDate(c.closedOn), DATE_FORMAT);
        }
        caseForCsv[iln.gettext("Closed on")] = correctClosed;
      }
      if (options.lastActioned) {
        caseForCsv[iln.gettext("Last Actioned")] = c.lastActioned
          ? format(toLocalDate(c.lastActioned), DATE_FORMAT)
          : "";
      }
      if (options.summary || options.summaryFull) {
        caseForCsv[iln.gettext("Description")] = c.summary ? c.summary : "";
      }
      if (options.reviewOn) {
        if (c.reviewDate) {
          if (!isValid(toLocalDate(c.reviewDate))) {
            caseForCsv[iln.gettext("Review On")] = "Not set";
          } else {
            caseForCsv[iln.gettext("Review On")] = format(
              toLocalDate(c.reviewDate),
              DATE_FORMAT
            );
          }
        }
      }

      if (options.assignedTo) {
        if (c.assignedTo || c.assignedTo === 0) {
          const caseworker = state.caseworkers.find(
            (cw) => cw.id === c.assignedTo
          );
          caseForCsv[iln.gettext("Assigned To")] = caseworker
            ? caseworker.name
            : "";
        }
      }
      if (options.createdBy) {
        if (c.createdBy || c.createdBy === 0) {
          const caseworker = state.caseworkers.find(
            (cw) => cw.id === c.createdBy
          );
          caseForCsv[iln.gettext("Created By")] = caseworker?.name || "";
        }
      }

      if (options.caseType) {
        if (c.caseType || c.caseType === 0) {
          const caseType = caseTypes.find((ct) => ct.id === c.caseType);
          caseForCsv[iln.gettext("Case Type")] = caseType
            ? caseType.casetype
            : "";
        }
      }

      if (options.category) {
        caseForCsv[iln.gettext("Category Type")] = c.category
          ? getCategoryTypeName(c.category, categoryTypes)
          : "";
      }
      if (options.status) {
        if (c.status || c.status === 0) {
          const statusType = statusTypes.find((st) => st.id === c.status);
          caseForCsv[iln.gettext("Status")] = statusType
            ? statusType.statustype
            : "";
        }
      }
      if (options.tags) {
        caseForCsv.Tags = c.tagged ? c.tagged : "";
      }

      if (options.contactType) {
        caseForCsv[iln.gettext("Contact Type")] = c.contactType
          ? getContactTypeName(c.contactType, contactTypes)
          : "";
      }
      if (options.relatesTo) {
        caseForCsv[iln.gettext("Relates To")] = c.relatesTo ? c.relatesTo : "";
      }

      if (options?.customFields && customFields) {
        const selectedCustomFields = options.customFields;

        Object.keys(selectedCustomFields).map((key) => {
          if (selectedCustomFields[key]) {
            const currentCustomFieldDetails = customFields.find(
              (customField) => customField.id === parseInt(key)
            );

            const customFieldValue = c.customFields[key];

            if (currentCustomFieldDetails.type === "int") {
              caseForCsv[iln.gettext(currentCustomFieldDetails.name)] =
                currentCustomFieldDetails?.options[customFieldValue]?.text;
            } else {
              caseForCsv[iln.gettext(currentCustomFieldDetails.name)] =
                customFieldValue;
            }
          }
        });
      }

      if (c.constituent) {
        const constituent = c.constituent;
        caseForCsv.deceased = constituent.deceased ? "True" : "";

        getDoNotContactTypesNames(
          constituent.doNotContact,
          doNotContactTypes
        ).forEach((item) => {
          const itemPropertyName = Object.keys(item)[0];
          caseForCsv[itemPropertyName] = item[itemPropertyName];
        });

        if (hasAddressSelected(options, usePhysicalAddress)) {
          if (options.postalAddress1) {
            caseForCsv[iln.gettext("Postal Address 1")] = constituent.address1
              ? constituent.address1
              : "";
          }
          if (options.postalAddress2) {
            caseForCsv[iln.gettext("Postal Address 2")] = constituent.address2
              ? constituent.address2
              : "";
          }
          if (options.postalTown) {
            caseForCsv[iln.gettext("Postal Town")] = constituent.town
              ? constituent.town
              : "";
          }
          if (options.postalCounty) {
            caseForCsv["Postal County"] = constituent.county
              ? constituent.county
              : "";
          }
          if (options.postalPostCode) {
            caseForCsv[iln.gettext("Postal Postcode")] = constituent.postcode
              ? constituent.postcode
              : "";
          }

          if (options.postalAddressLine) {
            caseForCsv[iln.gettext("Postal Address Line")] = getFullAddress(
              constituent.address1,
              constituent.address2,
              constituent.town,
              constituent.county,
              constituent.postcode
            );
          }

          if (options.registeredAddress1) {
            caseForCsv[iln.gettext("Physical Address 1")] =
              constituent.registeredAddress1
                ? constituent.registeredAddress1
                : "";
          }
          if (options.registeredAddress2) {
            caseForCsv[iln.gettext("Physical Address 2")] =
              constituent.registeredAddress2
                ? constituent.registeredAddress2
                : "";
          }
          if (options.registeredSuburb) {
            caseForCsv[iln.gettext("Physical Suburb")] =
              constituent.registeredTown ? constituent.registeredTown : "";
          }
          if (options.registeredState) {
            caseForCsv[iln.gettext("Physical State")] =
              constituent.registeredCounty ? constituent.registeredCounty : "";
          }
          if (options.registeredPostcode) {
            caseForCsv[iln.gettext("Physical Postcode")] =
              constituent.registeredPostcode
                ? constituent.registeredPostcode
                : "";
          }
          if (options.registeredAddressLine) {
            caseForCsv[iln.gettext("Physical Address Line")] = getFullAddress(
              constituent.registeredAddress1,
              constituent.registeredAddress2,
              constituent.registeredTown,
              constituent.registeredCounty,
              constituent.registeredPostcode
            );
          }
        }
        if (options.title) {
          caseForCsv.Title = constituent.title ? constituent.title : "";
        }
        if (options.firstname) {
          caseForCsv[iln.gettext("First Name")] = constituent.firstname
            ? constituent.firstname
            : "";
        }
        if (options.surname) {
          caseForCsv.Surname = constituent.surname ? constituent.surname : "";
        }
        if (options.knownAs) {
          caseForCsv[iln.gettext("Known As")] = constituent.knownAs
            ? constituent.knownAs
            : "";
        }
        if (options.postNominal) {
          caseForCsv[iln.gettext("Post Nominal")] = constituent.postNominal
            ? constituent.postNominal
            : "";
        }
        if (options.gender) {
          caseForCsv[iln.gettext("Gender")] = constituent.gender
            ? constituent.gender
            : "";
        }
        if (options.dob) {
          if (
            constituent.dob === "0000-00-00" ||
            constituent.dob === "0000-00-00 00:00:00" ||
            constituent.dob === "****" ||
            !constituent.dob?.trim()
          ) {
            caseForCsv[iln.gettext("Date of birth")] = "";
          } else {
            caseForCsv[iln.gettext("Date of birth")] = format(
              new Date(constituent.dob),
              DATE_FORMAT
            ); // dob doesn't need timezone conversion
          }
        }
        if (options.showCombinedName && options.combinedNameFormat) {
          caseForCsv[iln.gettext("Combined Name")] = getCombinedName(
            options.combinedNameFormat,
            constituent
          );
        }
        if (options.constituentEmail) {
          caseForCsv[iln.gettext("Constituent Email")] = constituent.email
            ? constituent.email
            : "";
        }
        if (options.constituentMobile) {
          caseForCsv[iln.gettext("Constituent Mobile")] = constituent.mobile
            ? constituent.mobile
            : "";
        }
        if (options.constituentTelephone) {
          caseForCsv[iln.gettext("Constituent Telephone")] =
            constituent.telephone ? constituent.telephone : "";
        }
        if (options.organisationName) {
          caseForCsv[iln.gettext("Organisation Name")] =
            constituent.organisationName ? constituent.organisationName : "";
        }
        if (options.organisationType) {
          caseForCsv[iln.gettext("Organisation Type")] =
            constituent.organisationType ? constituent.organisationType : "";
        }
      } else {
        caseForCsv.deceased = "";
        caseForCsv[iln.gettext("Do not contact")] = "";
        caseForCsv[iln.gettext("Do not contact via phone")] = "";
        caseForCsv[iln.gettext("Do not contact via post")] = "";
        caseForCsv[iln.gettext("Do not contact via email")] = "";

        if (options.postalAddressLine) {
          caseForCsv[iln.gettext("Postal Address Line")] = "";
        }

        if (options.registeredAddress1) {
          caseForCsv[iln.gettext("Postal Address 1")] = "";
        }

        if (options.registeredAddress2) {
          caseForCsv[iln.gettext("Postal Address 2")] = "";
        }

        if (options.registeredSuburb) {
          caseForCsv[iln.gettext("Postal Town")] = "";
        }

        if (options.registeredState) {
          caseForCsv[iln.gettext("Postal County")] = "";
        }

        if (options.registeredPostcode) {
          caseForCsv[iln.gettext("Postal Postcode")] = "";
        }

        if (usePhysicalAddress && options.registeredAddressLine) {
          caseForCsv[iln.gettext("Physical Address Line")] = "";
        }

        if (options.registeredAddress1) {
          caseForCsv[iln.gettext("Physical Address 1")] = "";
        }

        if (options.registeredAddress2) {
          caseForCsv[iln.gettext("Physical Address 2")] = "";
        }

        if (options.registeredSuburb) {
          caseForCsv[iln.gettext("Physical Suburb")] = "";
        }

        if (options.registeredState) {
          caseForCsv[iln.gettext("Physical State")] = "";
        }

        if (options.registeredPostcode) {
          caseForCsv[iln.gettext("Physical Postcode")] = "";
        }

        if (options.title) {
          caseForCsv.Title = "";
        }

        if (options.firstname) {
          caseForCsv[iln.gettext("First Name")] = "";
        }

        if (options.surname) {
          caseForCsv.Surname = "";
        }

        if (options.knownAs) {
          caseForCsv[iln.gettext("Known As")] = "";
        }

        if (options.postNominal) {
          caseForCsv[iln.gettext("Post Nominal")] = "";
        }

        if (options.gender) {
          caseForCsv[iln.gettext("Gender")] = "";
        }

        if (options.dob) {
          caseForCsv[iln.gettext("Date of birth")] = "";
        }

        if (options.combinedNameFormat) {
          caseForCsv[iln.gettext("Combined Name")] = "";
        }

        if (options.constituentEmail) {
          caseForCsv[iln.gettext("Constituent Email")] = "";
        }
        if (options.constituentMobile) {
          caseForCsv[iln.gettext("Constituent Mobile")] = "";
        }
        if (options.constituentTelephone) {
          caseForCsv[iln.gettext("Constituent Telephone")] = "";
        }

        if (options.organisationName) {
          caseForCsv[iln.gettext("Organisation Name")] = "";
        }

        if (options.organisationType) {
          caseForCsv[iln.gettext("Organisation Type")] = "";
        }
      }
      return caseForCsv;
    }),
  ];
};

const generateCsv = ({ cases, exportName }) => {
  const csv = genCsv(cases);
  downloadCsv(csv, exportName);
  return false;
};

const constituentColumns = [
  "id",
  "title",
  "firstname",
  "surname",
  "lat",
  "lng",
  "organisationName",
  "organisationType",
  "deceased",
  "doNotContact",
  "email",
  "telephone",
  "mobile",
  "gender",
  "postNominal",
  "dob",
  "address1",
  "address2",
  "town",
  "county",
  "postcode",
  "knownAs",
  "registeredAddress1",
  "registeredAddress2",
  "registeredTown",
  "registeredCounty",
  "registeredPostcode",
];

const downloadCSV = (state, options, iln) => {
  // When closedOn is selected, ensure "closedOn" is included in the API request
  // The backend automatically adds "closedOn" when "closed" is requested, but we need to explicitly request it
  const modifiedState = { ...state };
  if (options.closedOn) {
    const caseColumns = [...state.filters.columnsToReturn.case];
    if (!caseColumns.includes("closedOn")) {
      caseColumns.push("closedOn");
    }
    // Also ensure "closed" is included so the backend can properly populate closedOn
    if (!caseColumns.includes("closed")) {
      caseColumns.push("closed");
    }
    modifiedState.filters = {
      ...state.filters,
      columnsToReturn: {
        ...state.filters.columnsToReturn,
        case: caseColumns,
      },
    };
    console.log("CSV Export: Added 'closedOn' and 'closed' fields to request", {
      originalColumns: state.filters.columnsToReturn.case,
      modifiedColumns: caseColumns,
    });
  }

  return Promise.all([
    getAllCases(modifiedState, () => {}, constituentColumns),
    api.getDoNotContactTypes(),
  ]).then(([cases, doNotContactTypes]) => {
    if (options.closedOn && cases.length > 0) {
      console.log("CSV Export: First case data sample", {
        id: cases[0].id,
        status: cases[0].status,
        closed: cases[0].closed,
        closedOn: cases[0].closedOn,
        allFields: Object.keys(cases[0]),
      });
    }
    return generateCsv({
      cases: formatData({
        cases,
        options,
        state,
        doNotContactTypes,
        iln,
      }),
      exportName: options.exportName,
    });
  });
};

export default downloadCSV;
