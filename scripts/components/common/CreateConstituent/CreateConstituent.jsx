import {
  AutoComplete,
  Button,
  FormTextInput,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ComponentLoading from "../../ComponentLoading.jsx";
import ConstituentAddressForm from "../ConstituentAddressForm/ConstituentAddressForm.jsx";
import MultiContactInput from "../MultiContactInput/MultiContactInput.jsx";
import TranslationContext from "../../../context/translation/TranslationContext";
import { allowPhysicalAddress } from "../../../consts/disabledFeatures.js";
import api from "@electedtech/api";
import { isEmail } from "../../../helpers/isEmailRegex.js";
import { locale } from "../../../helpers/localStorageHelper.js";
import propTypes from "./propTypes.js";
import { useStyles } from "./styles";

const highlightMatches = (result, highlight) => (
  <React.Fragment>
    {result.firstname && (
      <React.Fragment>{highlight(result.firstname)}, </React.Fragment>
    )}
    {result.surname && (
      <React.Fragment>{highlight(result.surname)}, </React.Fragment>
    )}
    {result.address1 && (
      <React.Fragment>{highlight(result.address1)}, </React.Fragment>
    )}
    {result.town && <React.Fragment>{highlight(result.town)}, </React.Fragment>}
    {result.postcode && (
      <React.Fragment>{highlight(result.postcode)}</React.Fragment>
    )}
  </React.Fragment>
);

const CreateConstituent = ({
  createButtonText,
  cancelButtonText,
  inititalValues = {},
  onCancelClick,
  onCreateClick,
  disbleCreateButton,
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [awaiting, setAwaiting] = useState(false);

  const [title, setTitle] = useState(inititalValues.title || "");
  const [firstName, setFirstname] = useState(
    inititalValues.firstName || inititalValues.firstname || ""
  );
  const [surname, setSurname] = useState(inititalValues.surname || "");

  const [addressValues, setAddressValues] = useState({
    address1: inititalValues.address1 || "",
    address2: inititalValues.address2 || "",
    town: inititalValues.town || "",
    postcode: inititalValues.postcode || "",
    physicalAddress1: inititalValues.physicalAddress1 || "",
    physicalAddress2: inititalValues.physicalAddress2 || "",
    physicalTown: inititalValues.physicalTown || "",
    physicalCounty: inititalValues.physicalCounty || "",
    physicalPostcode: inititalValues.physicalPostcode || "",
  });
  const [isSameAsPhysical, setIsSameAsPhysical] = useState(
    inititalValues?.isSameAsPhysical || false
  );

  const [email, setEmail] = useState(inititalValues.email || []);
  const [telephone, setTelephone] = useState(inititalValues.telephone || []);
  const [mobile, setMobile] = useState(inititalValues.mobile || []);

  const allValues = {
    ...inititalValues,
    title,
    firstName,
    surname,
    isOrganisation: false,
    email,
    telephone,
    mobile,
    address1:
      isSameAsPhysical && allowPhysicalAddress
        ? addressValues.physicalAddress1
        : addressValues.address1,
    address2:
      isSameAsPhysical && allowPhysicalAddress
        ? addressValues.physicalAddress2
        : addressValues.address2,
    town:
      isSameAsPhysical && allowPhysicalAddress
        ? addressValues.physicalTown
        : addressValues.town,
    county:
      isSameAsPhysical && allowPhysicalAddress
        ? addressValues.physicalCounty
        : addressValues.county,
    postcode:
      isSameAsPhysical && allowPhysicalAddress
        ? addressValues.physicalPostcode
        : addressValues.postcode,
    ...(allowPhysicalAddress
      ? {
          registeredAddress1: addressValues.physicalAddress1,
          registeredAddress2: addressValues.physicalAddress2,
          registeredTown: addressValues.physicalTown,
          registeredState: addressValues.physicalCounty,
          registeredPostcode: addressValues.physicalPostcode,
        }
      : {}),
  };

  return (
    <div>
      {locale === "en_GB" && (
        <section className={classes.inputGroup}>
          <h3>{iln.gettext("Search Electoral Roll")}</h3>
          <AutoComplete
            value={undefined}
            label={iln.gettext("Search Roll")}
            placeholder={iln.gettext(
              "Enter a name, first line of address or postcode"
            )}
            onResultClick={({
              title,
              firstname,
              surname,
              address1,
              address2,
              town,
              county,
              postcode,
            }) => {
              setTitle(title);
              setFirstname(firstname);
              setSurname(surname);
              setAddressValues({
                ...addressValues,
                address1,
                address2,
                town,
                county,
                postcode,
              });
            }}
            dataSource={(searchText) =>
              api.searchElectoralRoll({ term: searchText }, modalActions, iln)
            }
            constructDropDownItems={(result, highlightMatchingText) =>
              highlightMatches(result, highlightMatchingText)
            }
            typingTimeoutDelay={500}
            customClassNames={{ container: classes.input }}
          />
        </section>
      )}
      <section className={classes.inputGroup}>
        <h3>{iln.gettext("Name and Title")}</h3>
        <FormTextInput
          name="title"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          label={iln.gettext("Title")}
          customClassNames={{ container: classes.input }}
          keepErrorSpacing={false}
        />
        <FormTextInput
          name="firstName"
          value={firstName}
          onChange={({ target: { value } }) => setFirstname(value)}
          label={iln.gettext("First Name")}
          customClassNames={{ container: classes.input }}
          keepErrorSpacing={false}
        />
        <FormTextInput
          name="surname"
          value={surname}
          onChange={({ target: { value } }) => setSurname(value)}
          label={iln.gettext("Surname")}
          customClassNames={{ container: classes.input }}
          keepErrorSpacing={false}
        />
      </section>
      <ConstituentAddressForm
        value={addressValues}
        setValue={setAddressValues}
        isSameAsPhysical={isSameAsPhysical}
        setIsSameAsPhysical={setIsSameAsPhysical}
      />
      <section className={classes.inputGroup}>
        <h3>{iln.gettext("Contact Details")}</h3>
        <MultiContactInput
          customClassNames={{ container: classes.input }}
          contactDetailName={iln.gettext("Email")}
          contactDetailTypeID={4}
          contactDetails={email}
          setContactDetails={setEmail}
          constituentID="temp"
          source="user"
          inputValidation={(value) => isEmail(value)}
          modifyInput={(x) => x.trim().replace(/\s+/g, " ")}
          label={iln.gettext("Email")}
        />
        <MultiContactInput
          customClassNames={{ container: classes.input }}
          contactDetailName={iln.gettext("Home Telephone")}
          contactDetailTypeID={1}
          contactDetails={telephone}
          setContactDetails={setTelephone}
          constituentID="temp"
          source="user"
          modifyInput={(x) =>
            x
              .replace(/[^0-9+\-().\s]/g, "")
              .replace(/\s+/g, " ")
              .trim()
          }
          label={iln.gettext("Home Tel")}
        />
        <MultiContactInput
          contactDetailName={iln.gettext("Mobile")}
          customClassNames={{ container: classes.input }}
          contactDetailTypeID={3}
          contactDetails={mobile}
          setContactDetails={setMobile}
          constituentID="temp"
          source="user"
          modifyInput={(x) =>
            x
              .replace(/[^0-9+\-().\s]/g, "")
              .replace(/\s+/g, " ")
              .trim()
          }
          label={iln.gettext("Mobile Tel")}
        />
      </section>
      <div className={classes.buttonContainer}>
        {onCancelClick ? (
          <Button onClick={() => onCancelClick(allValues)}>
            {cancelButtonText || iln.gettext("Cancel")}
          </Button>
        ) : (
          <div />
        )}
        <Button
          isDisabled={surname === "" || awaiting || disbleCreateButton}
          onClick={() => {
            setAwaiting(true);
            try {
              onCreateClick(allValues);
            } catch {
              setAwaiting(false);
            }
          }}
        >
          {awaiting ? (
            <ComponentLoading scale={1} />
          ) : (
            createButtonText || iln.gettext("Create Constituent")
          )}
        </Button>
      </div>
    </div>
  );
};

CreateConstituent.propTypes = propTypes;

export default CreateConstituent;
