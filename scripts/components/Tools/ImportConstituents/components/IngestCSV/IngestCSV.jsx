import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import { format, isValid, parse } from "date-fns";

import CsvImporter from "@electedtech/csv-importer";
import { TranslationContext } from "context/translate";
import propTypes from "./IngestCSV.propTypes.js";
import splitMergedName from "./helpers/splitMergedName.js";
import useStyles from "./IngestCSV.styles.js";

const IngestCSV = ({ file, hasHeader, onSubmit, back, createCases }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const [error, setError] = useState();

  const formatDOB = (dateString) => {
    if (dateString.trim() == "") {
      return "";
    }
    //pad day or month with 0 if its in single digit
    dateString = dateString.replace(/(^|\D)(\d)(?=\D|$)/g, "$10$2");
    const parsedDate1 = parse(dateString, "yyyy-MM-dd", new Date());
    if (
      isValid(parsedDate1) &&
      format(parsedDate1, "yyyy-MM-dd") === dateString
    ) {
      return format(parsedDate1, "yyyy-MM-dd");
    }
    const parsedDate2 = parse(dateString, "dd/MM/yyyy", new Date());
    if (
      isValid(parsedDate2) &&
      format(parsedDate2, "dd/MM/yyyy") === dateString
    ) {
      return format(parsedDate2, "yyyy-MM-dd");
    }
    return false;
  };

  const getKeyValue = (key, value) => {
    if (key == "dob") {
      value = formatDOB(value);
      if (value === false) {
        setError({
          message:
            "Correct Format for DOB is either dd/mm/YYYY (e.g 25/05/2010) or YYYY-mm-dd (e.g 2010-05-25)",
        });
      }
    }
    const replaceValues = {
      dob: "Dob (YYYY-mm-dd)",
      address1: "Postal Address1",
      address2: "Postal Address2",
      town: "Postal Town",
      county: "Postal State",
      postcode: "Postal postcode",
      registeredAddress1: "Physical Address1",
      registeredAddress2: "Physical Address2",
      registeredTown: "Physical Town",
      registeredState: "Physical State",
      registeredPostcode: "Physical Postcode",
      descriptionColumn: "Case Description",
      CaseNoteColumn: "Note on Case",
    };
    key = replaceValues[key] || key.charAt(0).toUpperCase() + key.slice(1);
    return [key, value];
  };

  const getColumns = () => {
    const columns = {
      mergedName: {
        text: iln.gettext("Merged Name"),
        value: "mergedName",
        type: {
          checkbox: {
            name: "surnameFirst",
            label: iln.gettext("Surname first?"),
          },
        },
      },
      title: { text: iln.gettext("Title"), value: "title" },
      firstname: { text: iln.gettext("First Name"), value: "firstname" },
      middlename: {
        text: iln.gettext("Middle Name"),
        value: "middlename",
      },
      surname: { text: iln.gettext("Surname"), value: "surname" },
      knownAs: { text: iln.gettext("Known As"), value: "knownAs" },
      postNominal: { text: iln.gettext("Post-nominal"), value: "postNominal" },
      address1: { text: iln.gettext("Postal Address1"), value: "address1" },
      address2: { text: iln.gettext("Postal Address2"), value: "address2" },
      town: { text: iln.gettext("Postal Town"), value: "town" },
      county: { text: iln.gettext("Postal State"), value: "county" },
      postcode: { text: iln.gettext("Postal Postcode"), value: "postcode" },
      registeredAddress1: {
        text: iln.gettext("Physical Address1"),
        value: "registeredAddress1",
      },
      registeredAddress2: {
        text: iln.gettext("Physical Address2"),
        value: "registeredAddress2",
      },
      registeredTown: {
        text: iln.gettext("Physical Town"),
        value: "registeredTown",
      },
      registeredState: {
        text: iln.gettext("Physical State"),
        value: "registeredState",
      },
      registeredPostcode: {
        text: iln.gettext("Physical Postcode"),
        value: "registeredPostcode",
      },
      telephone: { text: iln.gettext("Telephone"), value: "telephone" },
      mobile: { text: iln.gettext("Mobile"), value: "mobile" },
      email: { text: iln.gettext("Email"), value: "email" },
      flagColumn: { text: iln.gettext("Flags"), value: "flagColumn" },
      dob: {
        text: iln.gettext("Date of Birth - (dd/mm/YYYY) or (YYYY-mm-dd)"),
        value: "dob",
      },
    };
    if (createCases) {
      columns.tagColumn = {
        text: iln.gettext("Case Tags"),
        value: "tagColumn",
      };
      columns.descriptionColumn = {
        text: iln.gettext("Append to case description"),
        value: "descriptionColumn",
      };
      columns.CaseNoteColumn = {
        text: iln.gettext("Add to case as note"),
        value: "CaseNoteColumn",
      };
    }
    return columns;
  };

  if (error)
    return (
      <FlexBox hAlign="center" vAlign="center">
        <div className={classes.errorContainer}>
          <p>
            {iln.gettext(
              "There was an error processing your file, please try again"
            )}
          </p>
          <p className={classes.errorMsg}>{error.message}</p>
          <Button
            onClick={() => {
              back();
            }}
            size="small"
          >
            {iln.gettext("Try Again")}
          </Button>
        </div>
      </FlexBox>
    );

  return (
    <div>
      {file && (
        <CsvImporter
          file={file}
          hasHeader={hasHeader}
          onCancel={() => back()}
          // onCancel={() => setFile(undefined)}
          onSubmit={onSubmit}
          headerQuestion
          extraInfo={["rowLength"]}
          translations={{
            headerQuestion: iln.gettext("Is the first row a header?"),
            importMessage: {
              numJoin: iln.gettext("out of"),
              suffix: iln.gettext("columns will be imported"),
            },
            duplicateWarningSuffix: iln.gettext("is a duplicate"),
            buttons: {
              no: iln.gettext("No"),
              yes: iln.gettext("Yes"),
              skip: iln.gettext("Skip"),
              next: iln.gettext("Next"),
              finish: iln.gettext("Finish"),
              cancel: iln.gettext("Cancel"),
              previewSubmit: iln.gettext("Preview"),
              back: iln.gettext("Back"),
              anotherExample: iln.gettext("Another Example"),
              submit: iln.gettext("Next"),
            },
            previewMessage: iln.gettext(
              "Here is a preview of your data. If you need to make any changes, click the back button."
            ),
          }}
          columnNames={getColumns()}
          previewFormatter={({ formatRules: { surnameFirst }, data }) =>
            Object.entries(data).reduce((acc, [key, value]) => {
              if (key === "mergedName") {
                const { surname, firstname, middlename } = splitMergedName(
                  value,
                  surnameFirst
                );
                let returnArray = [
                  ...acc,
                  {
                    label: iln.gettext("Firstname"),
                    value: firstname.trim(),
                  },
                  {
                    label: iln.gettext("Surname"),
                    value: surname.trim(),
                  },
                ];
                if (middlename) {
                  returnArray.push({
                    label: iln.gettext("Middlename"),
                    value: middlename.trim(),
                  });
                }
                return returnArray;
              }
              [key, value] = getKeyValue(key, value);
              return [...acc, { label: key, value }];
            }, [])
          }
          customClassNames={{ table: classes.table }}
          onFileError={(e) => setError(e)}
        />
      )}
    </div>
  );
};

IngestCSV.propTypes = propTypes;

export default IngestCSV;
