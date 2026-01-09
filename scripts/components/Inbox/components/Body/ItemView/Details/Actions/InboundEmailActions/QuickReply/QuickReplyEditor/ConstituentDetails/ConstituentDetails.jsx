import { FlexBox, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import TranslationContext from "../../../../../../../../../../../context/translation/TranslationContext.js";
import classnames from "classnames";
import getNameAndAddressFromEmail from "../../../../../../../../../helpers/getNameAndAddressFromEmail.js";
import propTypes from "./propTypes.js";
import theme from "@electedtech/theme";
import { useStyles } from "./ConstituentDetails.styles";

const ConstituentDetails = ({ email, onChangeConstituentDetails }) => {
  const classes = useStyles(theme);

  const iln = useContext(TranslationContext);

  const [constituentDetails, setConstituentDetails] = useState({
    firstName: "",
    surname: "",
    address1: "",
    address2: "",
    town: "",
    county: "",
    postcode: "",
    email: email?.from.email,
  });

  const { firstName: emailFirstName, surname: emailSurname } =
    getNameAndAddressFromEmail(email.from, email.to);
  useEffect(() => {
    if (!emailFirstName && !emailSurname) return;
    const newConstituentDetails = {
      ...constituentDetails,
      firstName: emailFirstName,
      surname: emailSurname,
    };
    setConstituentDetails(newConstituentDetails);
    onChangeConstituentDetails(newConstituentDetails);
  }, [emailFirstName, emailSurname]);

  const handleChange = (e) => {
    const newConstituentDetails = {
      ...constituentDetails,
      [e.target.name]: e.target.value,
    };
    setConstituentDetails(newConstituentDetails);
    onChangeConstituentDetails(newConstituentDetails);
  };

  return (
    <React.Fragment>
      <FlexBox>
        <FormTextInput
          customClassNames={{ container: classes.input }}
          name={"firstName"}
          keepErrorSpacing={false}
          value={constituentDetails.firstName}
          label={iln.gettext("First Name")}
          onChange={(e) => handleChange(e)}
        />
        <FormTextInput
          customClassNames={{ container: classes.input }}
          name={"surname"}
          keepErrorSpacing={false}
          value={constituentDetails.surname}
          label={iln.gettext("Surname")}
          onChange={(e) => handleChange(e)}
        />
      </FlexBox>
      <FlexBox>
        <FormTextInput
          customClassNames={{ container: classes.input }}
          name={"address1"}
          keepErrorSpacing={false}
          value={constituentDetails.address1}
          label={iln.gettext("Address 1")}
          onChange={(e) => handleChange(e)}
        />
        <FormTextInput
          customClassNames={{ container: classes.input }}
          name={"address2"}
          keepErrorSpacing={false}
          value={constituentDetails.address2}
          label={iln.gettext("Address 2")}
          onChange={(e) => handleChange(e)}
        />
      </FlexBox>
      <FlexBox>
        <FormTextInput
          customClassNames={{ container: classes.input }}
          name={"town"}
          keepErrorSpacing={false}
          value={constituentDetails.town}
          label={iln.gettext("Town")}
          onChange={(e) => handleChange(e)}
        />
        <FormTextInput
          customClassNames={{ container: classes.input }}
          name={"county"}
          keepErrorSpacing={false}
          value={constituentDetails.county}
          label={iln.gettext("County")}
          onChange={(e) => handleChange(e)}
        />
      </FlexBox>
      <FormTextInput
        keepErrorSpacing={false}
        customClassNames={{
          container: classnames(classes.input, classes.postcodeInput),
        }}
        name={"postcode"}
        value={constituentDetails.postcode}
        label={iln.gettext("Postcode")}
        onChange={(e) => handleChange(e)}
      />
    </React.Fragment>
  );
};

ConstituentDetails.propTypes = propTypes;

export default ConstituentDetails;
