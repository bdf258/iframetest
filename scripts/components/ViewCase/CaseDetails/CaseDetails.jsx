import { Card, FlexBox, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useContext, useRef } from "react";

import AssignedCaseworker from "../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import CaseActions from "./CaseActions/CaseActions.jsx";
import CaseSummary from "./CaseSummary/CaseSummary.jsx";
import CaseTypeSelect from "../../common/CaseDetailInputs/CaseTypeSelect.jsx";
import CategorySelect from "../../common/CaseDetailInputs/CategorySelect.jsx";
import ContactTypeSelect from "../../common/CaseDetailInputs/ContactTypeSelect.jsx";
import CreatedBy from "./CreatedBy/CreatedBy.jsx";
import { CustomFieldsCaseDetails } from "./CustomFieldsCaseDetails/CustomFieldsCaseDetails.jsx";
import PermissionsChipInput from "../../common/PermissionsChipInput/PermissionsChipInput.jsx";
import Placeholder from "./Placeholder.jsx";
import ReviewDate from "./ReviewDate/ReviewDate.jsx";
import StatusSelect from "../../common/CaseDetailInputs/StatusSelect.jsx";
import TagInput from "../../common/CaseDetailInputs/TagInput.jsx";
import { TranslationContext } from "context/translate";
import { allowPermissionSystem } from "../../../consts/disabledFeatures.js";
import classnames from "classnames";
import { format } from "date-fns";
import { getDateAsLocalDateString } from "../../../helpers/timezoneHelpers.js";
import { installationPreferences } from "../../../helpers/localStorageHelper.js";
import { parseISO } from "date-fns";
import prefixCaseID from "../../../helpers/prefixCaseID.js";
import useHandleCaseCategoryChange from "./hooks/useHandleCaseCategoryChange";
import { useReduxSlice } from "./CaseDetails.redux.js";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";
import useUpdateCaseDetails from "./hooks/useUpdateCaseDetails.js";

const CaseDetails = () => {
  const theme = useTheme();

  const containerRef = useRef();
  const classes = useStyles({
    theme,
  });

  const iln = useContext(TranslationContext);

  const updateCaseDetails = useUpdateCaseDetails();
  const { caseDetails, caseworkers } = useReduxSlice();
  let shouldDisplayPermissions = allowPermissionSystem;
  if (shouldDisplayPermissions)
    shouldDisplayPermissions = !!installationPreferences.permissionSystem;

  const [handleCategoryChange] = useHandleCaseCategoryChange(
    caseDetails?.category,
    caseDetails?.customFields
  );

  if (!caseDetails || !caseworkers) return <Placeholder />;

  return (
    <div ref={containerRef}>
      <Card className={classes.detailsCard}>
        <div className={classes.cardHeaderCaseActions} data-casenote-card>
          <FlexBox hAlign={"space-between"}>
            <div className={classes.cardHeader}>
              {iln.gettext("Case Reference")}: {prefixCaseID(caseDetails.id)}
            </div>
            <div className={classes.caseActionsContainer}>
              <CaseActions />
            </div>
          </FlexBox>
        </div>
        <div className={classes.detailsContainer}>
          <FlexBox wrap hAlign="space-between">
            <div className={classes.inputWrapper}>
              <FormTextInput
                name="openedOn"
                label={iln.gettext("Opened On")}
                value={format(
                  parseISO(
                    getDateAsLocalDateString(
                      new Date(caseDetails.created),
                      "yyyy-MM-dd HH:mm:ss"
                    )
                  ),
                  "do MMMM yyyy"
                )}
                keepErrorSpacing={false}
                onChange={updateCaseDetails}
                readOnly
                customClassNames={{
                  container: classes.noMargin,
                  label: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.inputWrapper}>
              <CreatedBy
                name="createdbyID"
                label={iln.gettext("Created By")}
                keepErrorSpacing={false}
                onChange={updateCaseDetails}
                readOnly
                customClassNames={{
                  container: classes.noMargin,
                  label: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.inputWrapper}>
              <AssignedCaseworker
                includeInactiveAssignedCaseworker
                name="assignedTo"
                onChange={updateCaseDetails}
                value={caseDetails.assignedTo}
                caseworkers={caseworkers}
                customClassNames={{ label: classes.inputLabel }}
                includeCanvassingCaseworker={false}
              />
            </div>
            <div className={classes.inputWrapper}>
              <CategorySelect
                name="category"
                onChange={(e) => {
                  handleCategoryChange(e.target.value, e.target.name);
                }}
                value={caseDetails?.category}
                customClassNames={{ label: classes.inputLabel }}
              />
            </div>
            <div className={classes.inputWrapper}>
              <ContactTypeSelect
                name="contactType"
                onChange={updateCaseDetails}
                value={caseDetails.contactType}
                selectedCategoryIDs={caseDetails.category}
                customClassNames={{ label: classes.inputLabel }}
              />
            </div>
            <div className={classes.inputWrapper}>
              <CaseTypeSelect
                name="caseType"
                onChange={updateCaseDetails}
                value={caseDetails.caseType}
                customClassNames={{ label: classes.inputLabel }}
              />
            </div>
            <div className={classes.inputWrapper}>
              <StatusSelect
                name="status"
                onChange={updateCaseDetails}
                value={caseDetails.status}
                customClassNames={{ label: classes.inputLabel }}
                selectedCategoryId={caseDetails?.category}
              />
            </div>
            <ReviewDate
              name="reviewDate"
              label={iln.gettext("Next Review")}
              onChange={() => {}}
              readOnly
              keepErrorSpacing={false}
              customClassNames={{ label: classes.inputLabel }}
            />
            {shouldDisplayPermissions && (
              <div className={classes.inputWrapper}>
                <PermissionsChipInput
                  name="restrictions"
                  value={caseDetails.restrictions}
                  onChange={({ target: { name, value } }) =>
                    updateCaseDetails({ target: { name, value } })
                  }
                  customClassNames={{
                    label: classes.inputLabel,
                    autoComplete: {
                      container: classes.autoCompleteContainer,
                      dropDown: classes.autoCompleteDropdown,
                      label: classes.inputLabel,
                    },
                  }}
                />
              </div>
            )}
            <div className={classes.inputWrapper}>
              <TagInput
                onChipClick={({ id }) => {
                  window.location.href = `${window.location.origin}/casespage.php?action=search&tagID=${id}`;
                }}
                name="tags"
                customClassNames={{
                  label: classes.inputLabel,
                  autoComplete: {
                    label: classes.inputLabel,
                    container: classes.autoCompleteContainer,
                    dropDown: classes.autoCompleteDropdown,
                  },
                }}
                onChange={({
                  target: {
                    name,
                    value: { chips: value },
                  },
                }) => updateCaseDetails({ target: { name, value } })}
                value={caseDetails.tags}
              />
            </div>
            <CustomFieldsCaseDetails
              customClassNames={{
                container: classes.noMargin,
                inputWrapper: classes.inputWrapper,
                label: classes.inputLabel,
              }}
              customFieldValues={caseDetails?.customFields}
              caseCategory={caseDetails?.category}
              onChange={(customField) => {
                updateCaseDetails({
                  target: {
                    name: "customFields",
                    value: {
                      ...caseDetails?.customFields,
                      ...customField,
                    },
                  },
                });
              }}
            />
          </FlexBox>
          <div
            className={classnames(
              classes.inputWrapper,
              classes.lastInputWrapper
            )}
          >
            <CaseSummary
              label={iln.gettext("Description")}
              autosize
              name="summary"
              initValue={caseDetails.summary}
              keepErrorSpacing={false}
              onChange={updateCaseDetails}
              customClassNames={{
                container: classes.noMargin,
                label: classes.inputLabel,
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CaseDetails;
