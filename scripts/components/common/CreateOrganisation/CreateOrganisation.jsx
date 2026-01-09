import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  Spinner,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConnectionTypeSelect from "./ConnectionTypeSelect/index.js";
import ConstituentAddressForm from "../ConstituentAddressForm/ConstituentAddressForm.jsx";
import CreateConstituentForm from "../CreateConstituent";
import MultiContactInput from "../MultiContactInput/MultiContactInput.jsx";
import OrganisationTypeAutoComplete from "./OrganisationTypeAutoComplete";
import RoleTypeSelect from "./RoleTypeSelect";
import { TranslationContext } from "context/translate";
import { allowPhysicalAddress } from "../../../consts/disabledFeatures.js";
import { isEmail } from "../../../helpers/isEmailRegex.js";
import propTypes from "./CreateOrganisation.propTypes.js";
import useStyles from "./CreateOrganisation.styles.js";

const CreateOrganisation = ({
  inititalValues,
  onCreateOrganisationWithConnections,
  onCreateOrganisation,
  createButtonText,
  onCancelClick,
  cancelButtonText,
  organisationTypes,
  connectionTypes,
  roleTypes,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [fetching, setFetching] = useState(false);
  const [step, setStep] = useState(0);

  const [organisation, setOrganisation] = useState(
    inititalValues?.organisation || ""
  );

  const [organisationType, setOrganisationType] = useState(
    inititalValues?.organisationTypeID || ""
  );
  const [connectionTypeID, setConnectionTypeID] = useState(
    inititalValues?.connectionTypeID
  );

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

  const [email, setEmail] = useState(inititalValues?.email || []);
  const [telephone, setTelephone] = useState(inititalValues?.telephone || []);
  const [mobile, setMobile] = useState(inititalValues?.mobile || []);
  const [website, setWebsite] = useState(inititalValues?.website || "");

  const [role, setRole] = useState("");

  const getOrganisation = () => {
    const {
      address1,
      address2,
      town,
      county,
      postcode,
      physicalAddress1,
      physicalAddress2,
      physicalTown,
      physicalCounty,
      physicalPostcode,
    } = addressValues;

    return {
      ...inititalValues,
      isOrganisation: true,
      organisation,
      organisationType,
      email,
      telephone,
      mobile,
      website,
      firstName:"",
      surname:"",
      address1: isSameAsPhysical ? physicalAddress1 : address1,
      address2: isSameAsPhysical ? physicalAddress2 : address2,
      town: isSameAsPhysical ? physicalTown : town,
      county: isSameAsPhysical ? physicalCounty : county,
      postcode: isSameAsPhysical ? physicalPostcode : postcode,
      ...(allowPhysicalAddress
        ? {
            registeredAddress1: physicalAddress1,
            registeredAddress2: physicalAddress2,
            registeredTown: physicalTown,
            registeredState: physicalCounty,
            registeredPostcode: physicalPostcode,
          }
        : {}),
    };
  };

  return (
    <div className={classes.createOrganisation}>
      <Stepper step={step}>
        <Step>
          <section>
            <h3>{iln.gettext("Name and Type")}</h3>
            <FormTextInput
              name="organisation"
              value={organisation}
              onChange={({ target: { value } }) => setOrganisation(value)}
              label={iln.gettext("Organisation")}
              customClassNames={{ container: classes.container }}
              keepErrorSpacing={false}
            />
            <OrganisationTypeAutoComplete
              value={organisationType}
              setValue={setOrganisationType}
              organisationTypes={organisationTypes}
            />
          </section>
          <ConstituentAddressForm
            value={addressValues}
            setValue={setAddressValues}
            isSameAsPhysical={isSameAsPhysical}
            setIsSameAsPhysical={setIsSameAsPhysical}
          />
          <section>
            <h3>{iln.gettext("Contact Details")}</h3>
            <MultiContactInput
              contactDetailName={iln.gettext("Org Email")}
              contactDetailTypeID={4}
              contactDetails={email}
              setContactDetails={setEmail}
              constituentID="temp"
              source="user"
              inputValidation={(value) => isEmail(value)}
              modifyInput={(x) => x.trim().replace(/\s+/g, " ")}
              label={iln.gettext("Org Email")}
              customClassNames={{ container: classes.container }}
            />
            <MultiContactInput
              contactDetailName={iln.gettext("Organisation Telephone")}
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
              label={iln.gettext("Org Tel")}
              customClassNames={{ container: classes.container }}
            />
            <MultiContactInput
              contactDetailName={iln.gettext("Organisation Mobile")}
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
              label={iln.gettext("Org Mobile")}
              customClassNames={{ container: classes.container }}
            />
            <FormTextInput
              name="website"
              value={website}
              onChange={({ target: { value } }) => setWebsite(value)}
              label={iln.gettext("Org Website")}
              customClassNames={{ container: classes.container }}
              keepErrorSpacing={false}
            />
          </section>
          <FlexBox hAlign="space-between">
            {onCancelClick && (
              <Button onClick={onCancelClick}>
                {cancelButtonText || iln.gettext("Cancel")}
              </Button>
            )}
            <Button
              isDisabled={
                organisation.trim() === "" || organisationType.trim() === ""
              }
              onClick={() => {
                if (onCreateOrganisationWithConnections)
                  modalActions.add({
                    customClassNames: {
                      card: classes.connectionConfirmationModal,
                    },
                    title: iln.gettext("Creating Connections"),
                    component: (
                      <div>
                        <p>
                          {iln.gettext(
                            "Do you want to add a connection to the organisation?"
                          )}
                        </p>
                        <br />
                        <FlexBox hAlign={"space-between"}>
                          <Button
                            onClick={() => {
                              onCreateOrganisation(getOrganisation());
                              modalActions.removeTop();
                            }}
                          >
                            {iln.gettext(
                              "Create organisation without connections"
                            )}
                          </Button>
                          <Button
                            onClick={() => {
                              setStep(1);
                              modalActions.removeTop();
                            }}
                          >
                            {iln.gettext("Create connection")}
                          </Button>
                        </FlexBox>
                      </div>
                    ),
                  });
                else {
                  onCreateOrganisation(getOrganisation());
                }
              }}
            >
              {fetching ? (
                <Spinner />
              ) : (
                createButtonText || iln.gettext("Create")
              )}
            </Button>
          </FlexBox>
        </Step>
        <Step>
          <h3>{iln.gettext("Connection at %1", organisation)}</h3>
          <ConnectionTypeSelect
            value={connectionTypeID}
            setValue={setConnectionTypeID}
            organisationTypes={connectionTypes}
          />
          <RoleTypeSelect
            value={role}
            setValue={setRole}
            roleTypes={roleTypes}
          />
          <CreateConstituentForm
            cancelButtonText={iln.gettext("Back")}
            onCancelClick={() => {
              setStep(0);
            }}
            createButtonText={iln.gettext("Create Org & Connection")}
            disbleCreateButton={!connectionTypeID}
            onCreateClick={async (connectionDetails) => {
              setFetching(true);
              try {
                onCreateOrganisationWithConnections({
                  organisation: getOrganisation(),
                  constituent: {
                    ...connectionDetails,
                  },
                  connectionTypeID,
                });
              } catch {
                setFetching(false);
              }
            }}
          />
        </Step>
      </Stepper>
    </div>
  );
};

CreateOrganisation.propTypes = propTypes;

export default CreateOrganisation;
