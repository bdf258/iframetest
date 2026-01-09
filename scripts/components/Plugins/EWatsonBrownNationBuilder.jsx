import {
  Button,
  FlexBox,
  FormCheckbox,
  FormTextInput,
} from "@electedtech/electedtech-ui";
import React, { useState } from "react";

import ConfigFields from "./ConfigFields.jsx";
import PropTypes from "prop-types";

function EWatsonBrownNationBuilder({ details, saveDetails }) {
  const [values, setValues] = useState({
    active: details.active,
    settings: {
      url: details.settings.url,
      apiKey: details.settings.apiKey,
      siteKey: details.settings.siteKey,
    },
  });
  const updateValues = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    name === "active"
      ? setValues((values) => ({ ...values, [name]: value }))
      : setValues((values) => ({
          ...values,
          settings: { ...values.settings, [name]: value },
        }));
  };
  const formFields = [
    { comp: FormCheckbox, name: "active", label: "Enabled" },
    { comp: FormTextInput, name: "url", label: "Nation Builder URL" },
    { comp: FormTextInput, name: "apiKey", label: "APi Key" },
  ];
  const formState = {
    active: values.active,
    url: values.settings.url,
    apiKey: values.settings.apiKey,
  };
  return (
    <div style={{ margin: "35px" }}>
      <FlexBox column vAlign="flex-start">
        <h2 style={{ marginBottom: "30px" }}>Nation Builder</h2>
        <FlexBox column>
          <ConfigFields
            formFields={formFields}
            updateValues={updateValues}
            formState={formState}
          />
        </FlexBox>
        <Button onClick={() => saveDetails(values, details.id)}>Save</Button>
      </FlexBox>
    </div>
  );
}
EWatsonBrownNationBuilder.propTypes = {
  details: PropTypes.shape({
    active: PropTypes.bool,
    cache: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    settings: PropTypes.oneOfType([
      PropTypes.shape({
        apiKey: PropTypes.string,
        siteKey: PropTypes.string,
        url: PropTypes.string,
      }),
      PropTypes.array,
    ]),
  }),
  saveDetails: PropTypes.func,
};

export default EWatsonBrownNationBuilder;
