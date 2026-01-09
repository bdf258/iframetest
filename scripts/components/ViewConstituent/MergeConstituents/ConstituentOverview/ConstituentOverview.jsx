import React, { useContext } from "react";
import { format, parseISO } from "date-fns";

import { DATE_FORMAT } from "../../../../consts/Date";
import DummyTextInput from "../../../common/DummyTextInput";
import { TranslationContext } from "context/translate";
import { allowPhysicalAddress } from "../../../../consts/disabledFeatures";
import { getGenders } from "../../../../helpers/localStorageHelper";
import getPrimaryConstituentContactDetail from "../../../../helpers/getPrimaryConstituentDetail";
import propTypes from "./propTypes";
import theme from "@electedtech/theme";
import { useStyles } from "./ConstituentOverview.styles";

const genders = getGenders();

// change YYYY-MM-DD for DD/MM/YYYY
const reconstructDOB = (dob) => {
  if (typeof dob !== "string") return dob;
  if (!dob.includes("-")) return dob;

  const date = parseISO(dob);

  return format(date, DATE_FORMAT.DATE);
};

const ConstituentOverview = ({ constituent, setPrecedence, precedence }) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles(theme);

  return (
    <button
      className={`${classes.half} ${
        precedence === constituent.id ? classes.selected : ""
      } `}
      onClick={() => setPrecedence(constituent.id)}
    >
      <DummyTextInput
        label={iln.gettext("Title")}
        value={constituent.title || ""}
      />
      <DummyTextInput
        label={iln.gettext("Firstname")}
        value={constituent.firstName || ""}
      />
      <DummyTextInput
        label={iln.gettext("Middlename")}
        value={constituent.middleName || ""}
      />
      <DummyTextInput
        label={iln.gettext("Surname")}
        value={constituent.surname || ""}
      />

      <DummyTextInput
        label={iln.gettext("Email")}
        value={getPrimaryConstituentContactDetail(constituent.email)}
      />
      <DummyTextInput
        label={iln.gettext("Mobile")}
        value={getPrimaryConstituentContactDetail(constituent.mobile)}
      />
      <DummyTextInput
        label={iln.gettext("Telephone")}
        value={getPrimaryConstituentContactDetail(constituent.telephone)}
      />
      <DummyTextInput
        label={iln.gettext("Postal Address 1")}
        value={constituent.address1 || ""}
      />
      <DummyTextInput
        label={iln.gettext("Postal Address 2")}
        value={constituent.address2 || ""}
      />
      <DummyTextInput
        label={iln.gettext("Postal Suburb")}
        value={constituent.town || ""}
      />
      <DummyTextInput
        label={iln.gettext("Postal State")}
        value={constituent.county || ""}
      />
      <DummyTextInput
        label={iln.gettext("Postal Postcode")}
        value={constituent.postcode || ""}
      />
      {allowPhysicalAddress && (
        <React.Fragment>
          <DummyTextInput
            label={iln.gettext("Physical Address 1")}
            value={constituent.registeredAddress1 || ""}
          />
          <DummyTextInput
            label={iln.gettext("Physical Address 2")}
            value={constituent.registeredAddress2 || ""}
          />
          <DummyTextInput
            label={iln.gettext("Physical Suburb")}
            value={constituent.registeredTown || ""}
          />
          <DummyTextInput
            label={iln.gettext("Physical State")}
            value={constituent.registeredState || ""}
          />
          <DummyTextInput
            label={iln.gettext("Physical Postcode")}
            value={constituent.registeredPostcode || ""}
          />
        </React.Fragment>
      )}
      <DummyTextInput
        label={iln.gettext("Date of birth")}
        value={reconstructDOB(constituent.dob || "")}
      />
      <DummyTextInput
        label={iln.gettext("Gender")}
        value={genders[constituent.gender] || ""}
      />
    </button>
  );
};

ConstituentOverview.propTypes = propTypes;
export default ConstituentOverview;
