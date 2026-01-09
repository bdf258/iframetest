import React, { useContext } from "react";

import AddressTextInput from "../common/AddressTextInput/AddressTextInput.jsx";
import { FormCheckbox } from "@electedtech/electedtech-ui";
import SuburbSearch from "../../SuburbSearch/SuburbSearch.jsx";
import TranslationContext from "context/translate";
import { allowPhysicalAddress } from "../../../../consts/disabledFeatures.js";
import propTypes from "../ConstituentAddressForm.propTypes.js";
import useStyles from "../ConstituentAddressForm.styles.js";

const AuAddressForm = ({
  value,
  setValue,
  isSameAsPhysical,
  setIsSameAsPhysical,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  return (
    <React.Fragment>
      {allowPhysicalAddress && (
        <section>
          <h3>{iln.gettext("Physical Address")}</h3>
          <AddressTextInput
            name="physicalAddress1"
            label={iln.gettext("Address 1")}
            value={value?.physicalAddress1}
            onChange={({ target: { value: physicalAddress1 } }) =>
              setValue({ ...value, physicalAddress1 })
            }
          />
          <AddressTextInput
            name="physicalAddress2"
            label={iln.gettext("Address 2")}
            value={value?.physicalAddress2}
            onChange={({ target: { value: physicalAddress2 } }) =>
              setValue({ ...value, physicalAddress2 })
            }
          />

          <SuburbSearch
            customClassNames={{ container: classes.inputContainer }}
            label={iln.gettext("Town")}
            name="physicalTown"
            value={value?.physicalTown}
            clearInputOnBlur={false}
            onChange={({ target: { value: physicalTown } }) =>
              setValue({
                ...value,
                physicalTown,
              })
            }
            handleResultSelected={({
              label: physicalTown = "",
              value: {
                state_abbreviation: physicalCounty = "",
                postcode: physicalPostcode = "",
              } = {},
            } = {}) =>
              setValue({
                ...value,
                physicalTown,
                physicalCounty,
                physicalPostcode,
              })
            }
          />

          <AddressTextInput
            name="physicalCounty"
            label={iln.gettext("County")}
            value={value?.physicalCounty}
            onChange={({ target: { value: physicalCounty } }) =>
              setValue({ ...value, physicalCounty })
            }
          />
          <AddressTextInput
            name="physicalPostcode"
            label={iln.gettext("Postcode")}
            value={value?.physicalPostcode}
            onChange={({ target: { value: postcode } }) =>
              setValue({ ...value, physicalPostcode: postcode })
            }
          />
        </section>
      )}
      <section>
        <h3>{iln.gettext("Postal Address")}</h3>
        <FormCheckbox
          name="sameAsPhysicalAddress"
          label={iln.gettext("Same as Physical Address")}
          value={isSameAsPhysical}
          onChange={({ target: { value } }) => setIsSameAsPhysical(value)}
          keepErrorSpacing={false}
        />
        <AddressTextInput
          name="address1"
          label={iln.gettext("Address 1")}
          value={isSameAsPhysical ? value?.physicalAddress1 : value?.address1}
          onChange={({ target: { value: address1 } }) =>
            isSameAsPhysical
              ? setValue({ ...value, physicalAddress1: address1 })
              : setValue({ ...value, address1 })
          }
        />
        <AddressTextInput
          name="address2"
          label={iln.gettext("Address 2")}
          value={isSameAsPhysical ? value?.physicalAddress2 : value?.address2}
          onChange={({ target: { value: address2 } }) =>
            isSameAsPhysical
              ? setValue({ ...value, physicalAddress2: address2 })
              : setValue({ ...value, address2 })
          }
        />
        <SuburbSearch
          customClassNames={{ container: classes.inputContainer }}
          label={iln.gettext("Suburb")}
          name="town"
          value={isSameAsPhysical ? value?.physicalTown : value?.town}
          clearInputOnBlur={false}
          onChange={({ target: { value: town } }) =>
            isSameAsPhysical
              ? setValue({ ...value, physicalTown: town })
              : setValue({ ...value, town })
          }
          handleResultSelected={({
            label: town = "",
            value: {
              state_abbreviation: county = "",
              postcode: postcode = "",
            } = {},
          } = {}) => {
            setValue({
              ...value,
              ...(isSameAsPhysical ? { physicalTown: town } : { town }),
              county,
              postcode,
            });
          }}
        />
        <AddressTextInput
          name="county"
          label={iln.gettext("County")}
          value={isSameAsPhysical ? value?.physicalCounty : value?.county}
          onChange={({ target: { value: county } }) =>
            isSameAsPhysical
              ? setValue({ ...value, physicalCounty: county })
              : setValue({ ...value, county })
          }
        />
        <AddressTextInput
          name="postcode"
          label={iln.gettext("Postcode")}
          value={isSameAsPhysical ? value?.physicalPostcode : value?.postcode}
          onChange={({ target: { value: postcode } }) =>
            isSameAsPhysical
              ? setValue({ ...value, physicalPostcode: postcode })
              : setValue({ ...value, postcode })
          }
        />
      </section>
    </React.Fragment>
  );
};

AuAddressForm.propTypes = propTypes;

export default AuAddressForm;
