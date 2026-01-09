import {
  Button,
  FlexBox,
  FormSelectAutoComplete,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import { BE_DATE_FORMAT } from "../../../../../../../../consts/Date.js";
import ComponentLoading from "../../../../../../../ComponentLoading.jsx";
import SelectLetterHead from "../../../../../../../ViewCase/ContactSelect/SelectLetterHead/SelectLetterHead.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { format } from "date-fns";
import propTypes from "./BulkMailMergeLetter.propTypes.js";
import useStyles from "./BulkMailMergeLetter.styles.js";
import { useTheme } from "react-jss";

const UTCStringToLocalDate = (UTCString) =>
  new Date(`${UTCString.replace(" ", "T")}Z`);

const goToMailMergePage = (templateID, letterheadID, searchQuery) => {
  let tagSearchType = "all";
  let tags = [];
  let negativeTags = [];
  if ("tagged" in searchQuery) {
    tags = searchQuery.tagged.tagID;
    tagSearchType = searchQuery.tagged.searchType;
  }
  if ("notTagged" in searchQuery) {
    negativeTags = searchQuery.notTagged.tagID;
  }
  let towns = [];
  if (
    "constituentCriteria" in searchQuery &&
    "inPostalTown" in searchQuery.constituentCriteria &&
    searchQuery.constituentCriteria.inPostalTown[0]
  ) {
    towns = searchQuery.constituentCriteria.inPostalTown[0];
  }
  const location =
    "mailmerge.php?casestatus=" +
    searchQuery.statusID.join() +
    "&caseworker=" +
    searchQuery.assignedToID.join() +
    "&casetype=" +
    searchQuery.casetypeID.join() +
    "&categorytype=" +
    searchQuery.categorytypeID.join() +
    "&datetype=" +
    searchQuery.dateRange.type +
    "&datefrom=" +
    encodeURI(
      format(
        UTCStringToLocalDate(searchQuery.dateRange.from),
        BE_DATE_FORMAT.DATE
      )
    ) +
    "&dateto=" +
    encodeURI(
      format(
        UTCStringToLocalDate(searchQuery.dateRange.to),
        BE_DATE_FORMAT.DATE
      )
    ) +
    "&tags=" +
    tags.join() +
    "&district=" +
    encodeURI(towns.join()) +
    "&negativetags=" +
    negativeTags.join() +
    "&tagSearchType=" +
    tagSearchType +
    "&templateID=" +
    templateID +
    "&letterheadID=" +
    letterheadID;

  window.location.href = location;
};

const BulkMailMergeLetter = ({ state, onBackClick }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [letterTemplates, setLetterTemplates] = useState();
  const [templateID, setTemplateID] = useState(1);
  const [letterheads, setLetterheads] = useState();
  const [letterheadID, setLetterheadID] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .searchLetterTemplates(
        {
          term: "",
          active: true,
          columnsToReturn: ["id", "name"],
        },
        modalActions,
        iln
      )
      .then((letterTemplates) => setLetterTemplates(letterTemplates))
      .catch(() => {
        setLetterTemplates([]);
      });
    api
      .searchLetterHeaders(
        {
          term: "",
          active: true,
          columnsToReturn: ["id", "name"],
        },
        modalActions,
        iln
      )
      .then((letterheads) => setLetterheads(letterheads))
      .catch(() => {
        setLetterheads([]);
      });
  }, []);

  if (!letterTemplates || !letterheads || loading)
    return (
      <div className={classes.bulkActionsContainer}>
        <ComponentLoading />
      </div>
    );

  return (
    <div className={classes.bulkActionsContainer}>
      <div style={{ marginBottom: "1em" }}>
        {iln.gettext("Please select a template from below")}
      </div>
      <div>
        <FlexBox hAlign="center" column>
          <FormSelectAutoComplete
            name="letterTemplate"
            value={templateID}
            keepErrorSpacing={false}
            label={iln.gettext("Template to use")}
            customClassNames={{
              container: classes.letterTemplateSelectContainer,
              label: classes.letterTemplateSelectLabel,
              autoComplete: { input: classes.autoCompleteInput },
            }}
            onChange={({ target: { value } }) => {
              setTemplateID(value);
            }}
          >
            {letterTemplates.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </FormSelectAutoComplete>
          <SelectLetterHead
            letterheadTemplates={letterheads}
            selectedTemplate={letterheadID}
            onChange={(letterheadID) => setLetterheadID(letterheadID)}
            customClassNames={{
              autoComplete: { input: classes.autoCompleteInput },
            }}
          />
        </FlexBox>
        <FlexBox className={classes.buttonRow} hAlign="space-between">
          <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>
          <Button
            onClick={() => {
              setLoading(true);
              goToMailMergePage(templateID, letterheadID, state.filters);
            }}
          >
            {iln.gettext("Create Letter")}
          </Button>
        </FlexBox>
      </div>
    </div>
  );
};

BulkMailMergeLetter.propTypes = propTypes;

export default BulkMailMergeLetter;
