import {
  Button,
  FlexBox,
  FormCheckbox,
  FormHandler,
  FormSelectAutoComplete,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import emailTemplatesAPI from "../../api/src/emailTemplates";
import flagsAPI from "../../api/src/flags";

function EmailOnFlagAdded({ details, saveDetails }) {
  const { modalActions } = useContext(ModalContext);

  const [values, setValues] = useState({
    active: details.active,
    settings: {
      flag: details.settings.flag,
      emailTemplate: details.settings.emailTemplate,
    },
  });
  const [flags, setFlags] = useState([]);
  const [emailTemplates, setEmailtemplates] = useState([]);
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
  useEffect(() => {
    async function getData() {
      let flags = await flagsAPI.searchFlags(
        { term: "", type: "user" },
        modalActions
      );
      let emailTemplates = await emailTemplatesAPI.searchEmailTemplates({
        term: "",
        active: true,
      });
      setFlags(flags);
      setEmailtemplates(emailTemplates);
    }
    getData();
  }, []);
  const formState = {
    active: values.active,
    flag: values.settings.flag,
    emailTemplate: values.settings.emailTemplate,
  };
  return (
    <div style={{ margin: "35px" }}>
      <FlexBox column vAlign="flex-start">
        <h2 style={{ marginBottom: "30px" }}>
          Send Email when a flag is added
        </h2>
        <div>
          <FormHandler state={formState} onSubmit={() => {}}>
            <FormCheckbox
              name={"active"}
              label={"Active"}
              onChange={(e) => updateValues(e)}
            ></FormCheckbox>
            {flags && (
              <FormSelectAutoComplete
                name="flag"
                label="Target Flag"
                onChange={(e) => updateValues(e)}
              >
                {flags.map((flag) => (
                  <option value={flag.id} key={flag.id}>
                    {flag.flag}
                  </option>
                ))}
              </FormSelectAutoComplete>
            )}
            {emailTemplates && (
              <FormSelectAutoComplete
                name="emailTemplate"
                onChange={(e) => updateValues(e)}
                label="Email Template"
              >
                {emailTemplates.map((emailTemplate) => (
                  <option value={emailTemplate.id} key={emailTemplate.id}>
                    {emailTemplate.name}
                  </option>
                ))}
              </FormSelectAutoComplete>
            )}
            <Button onClick={() => saveDetails(values, details.id)}>
              Save
            </Button>
          </FormHandler>
        </div>
      </FlexBox>
    </div>
  );
}
EmailOnFlagAdded.propTypes = {
  details: PropTypes.shape({
    active: PropTypes.bool,
    cache: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    settings: PropTypes.oneOfType([
      PropTypes.shape({
        flag: PropTypes.number,
        emailTemplate: PropTypes.number,
      }),
      PropTypes.array,
    ]),
  }),
  saveDetails: PropTypes.func,
};

export default EmailOnFlagAdded;
