import { AddButtonPlaceholder, TablePlaceholder } from "./Placeholders.jsx";
import {
  Button,
  Chip,
  FlexBox,
  FormTextInput,
  ModalContext,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

import ConfirmationModal from "../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import CreateOrEditCaseTemplate from "./CreateOrEditCaseTemplate.jsx";
import { SortedHeader } from "../../common/TableSort/TableSort.jsx";
import { TranslationContext } from "context/translate";
import { allowPermissionSystem } from "../../../consts/disabledFeatures.js";
import api from "@electedtech/api";
import { format } from "date-fns";
import getCaseworkerById from "../../../helpers/getCaseworkerById.js";
import { getSortMethod } from "../../common/TableSort/TableSort.jsx";
import modalStyles from "../../common/Modal/styles.js";
import { toLocalDate } from "../../../helpers/timezoneHelpers.js";

const permissionSystem = allowPermissionSystem;

const useStyles = createUseStyles({
  modalCard: modalStyles.positionBelowMainNav,
  spacing: {
    marginRight: 1,
    marginBottom: ({ theme }) => theme.spacing,
    marginLeft: 1,
  },
  addButton: {
    margin: {
      bottom: 8,
    },
  },
  card: {
    top: "110px",
  },
});

const addNewTemplateButton = (
  openCreateOrEditModal,
  modalActions,
  setTemplateStates,
  allTemplates,
  classes,
  iln
) => (
  <FlexBox hAlign="flex-end" className={classes.addButton}>
    <Button
      onClick={() =>
        openCreateOrEditModal(
          modalActions,
          setTemplateStates,
          allTemplates,
          undefined,
          classes,
          iln
        )
      }
    >
      {iln.gettext("Add New")}
    </Button>
  </FlexBox>
);

const setTemplateStates =
  (setDisplayTemplates, setAllTemplates) => (templates) => {
    setDisplayTemplates(templates);
    setAllTemplates(templates);
  };

const openCreateOrEditModal = (
  modalActions,
  setTemplateStates,
  allTemplates,
  templateID,
  classes,
  iln
) => {
  modalActions.add({
    id: "updateOrCreateCaseTemplate",
    title: `${
      templateID ? iln.gettext("Update") : iln.gettext("Create Case Template")
    }`,
    customClassNames: {
      card: classes.modalCard,
    },
    component: (
      <CreateOrEditCaseTemplate
        templateID={templateID}
        setTemplates={setTemplateStates}
        templates={allTemplates}
        permissionSystem={permissionSystem}
      />
    ),
    blurBackground: true,
    lockWindow: true,
    allowClose: true,
  });
};

const openDeleteModal = (
  setTemplateStates,
  modalActions,
  allTemplates,
  templateToDelete,
  iln
) => {
  modalActions.add({
    title: iln.gettext("Delete Case Template"),
    component: (
      <ConfirmationModal
        validatorIsNumber={false}
        errorTextToDisplay={`Doesn't match the template name`}
        confirmationValue={templateToDelete.name}
        message={
          <div>
            {iln.gettext("Are you sure you want to")}{" "}
            <b>{iln.gettext("delete the Case Template")}</b>{" "}
            {iln.gettext("named %1?", templateToDelete.name)}{" "}
            {iln.gettext("To confirm type the template's name below")}
            <br />
            <br />
          </div>
        }
        onConfirm={() =>
          deleteCaseTemplate(
            setTemplateStates,
            allTemplates,
            templateToDelete.id,
            modalActions
          )
        }
      />
    ),
    blurBackground: true,
    lockWindow: true,
    allowClose: true,
  });
};

const searchCaseTemplates = (setTemplateStates, searchTerm = "") => {
  api
    .searchCaseTemplates({
      term: searchTerm,
      columnsToReturn: [
        "name",
        "createdBy",
        "updatedBy",
        "id",
        "created",
        "updated",
      ],
      pageNo: 1,
      resultsPerPage: 1000,
    })
    .then((response) => {
      setTemplateStates(response);
    })
    .catch(() => {
      setTemplateStates([]);
    });
};

const deleteCaseTemplate = (
  setTemplateStates,
  displayTemplates,
  templateID,
  modalActions
) => {
  api.deleteCaseTemplate(templateID).then(() => {
    const indexToDelete = displayTemplates.findIndex(
      (t) => t.id === templateID
    );
    const updatedTemplates = displayTemplates;
    updatedTemplates.splice(indexToDelete, 1);
    setTemplateStates([...updatedTemplates]);
    modalActions.reset();
  });
};

const CaseTemplateManager = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { modalActions } = useContext(ModalContext);
  const [allTemplates, setAllTemplates] = useState();
  const [displayTemplates, setDisplayTemplates] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState({
    sortBy: "name",
    sortType: "string",
    ascending: true,
  });
  const iln = useContext(TranslationContext);
  useEffect(() => {
    searchCaseTemplates(
      setTemplateStates(setDisplayTemplates, setAllTemplates),
      ""
    );
  }, []);

  return (
    <div>
      <h2>{iln.gettext("Tools - Manage Case Templates")}</h2>
      <div>
        <div>
          <FormTextInput
            label={iln.gettext("Search")}
            name="name"
            keepErrorSpacing={false}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value.length >= searchTerm.length) {
                setDisplayTemplates(
                  displayTemplates.filter((template) =>
                    template.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
                );
              } else {
                setDisplayTemplates(
                  allTemplates.filter((template) =>
                    template.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
                );
              }
            }}
            value={searchTerm}
            customClassNames={{ container: classes.spacing }}
          />
        </div>
        {displayTemplates ? (
          displayTemplates.length >= 10 &&
          addNewTemplateButton(
            openCreateOrEditModal,
            modalActions,
            setTemplateStates(setDisplayTemplates, setAllTemplates),
            allTemplates,
            classes,
            iln
          )
        ) : (
          <AddButtonPlaceholder />
        )}
        <Table>
          <TableHead>
            <SortedHeader
              sortBy="name"
              sortType="string"
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Name")}
            </SortedHeader>
            <SortedHeader
              sortBy="createdBy"
              sortType="string"
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Created By")}
            </SortedHeader>
            {permissionSystem && (
              <TableHeader>{iln.gettext("Accessible By")}</TableHeader>
            )}
            <SortedHeader
              sortBy="created"
              sortType="date"
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Created On")}
            </SortedHeader>
            <SortedHeader
              sortBy="updated"
              sortType="date"
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Last Updated")}
            </SortedHeader>
            <TableHeader>{iln.gettext("Actions")}</TableHeader>
          </TableHead>
          <TableBody>
            {displayTemplates ? (
              displayTemplates
                .sort(getSortMethod(sorted))
                .map((template, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell textAlign="center" verticalAlign="center">
                        <Button
                          onClick={() =>
                            openCreateOrEditModal(
                              modalActions,
                              setTemplateStates(
                                setDisplayTemplates,
                                setAllTemplates
                              ),
                              allTemplates,
                              template.id,
                              classes,
                              iln
                            )
                          }
                          type="text"
                        >
                          {template.name}
                        </Button>
                      </TableCell>
                      <TableCell textAlign="center" verticalAlign="center">
                        {getCaseworkerById(template.createdBy)
                          ?.caseworkerName || iln.gettext("Unknown")}
                      </TableCell>
                      {permissionSystem && (
                        <TableCell textAlign="center" verticalAlign="center">
                          {template.restrictions.map((restriction) => (
                            <Chip key={restriction.name} value={restriction.id}>
                              {restriction.name}
                            </Chip>
                          ))}
                        </TableCell>
                      )}
                      <TableCell textAlign="center" verticalAlign="center">
                        {format(toLocalDate(template.created), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell textAlign="center" verticalAlign="center">
                        {format(toLocalDate(template.updated), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell textAlign="center" verticalAlign="center">
                        <Button
                          onClick={() =>
                            openCreateOrEditModal(
                              modalActions,
                              setTemplateStates(
                                setDisplayTemplates,
                                setAllTemplates
                              ),
                              allTemplates,
                              template.id,
                              classes,
                              iln
                            )
                          }
                          type="text"
                        >
                          {iln.gettext("Edit")}
                        </Button>
                        {" - "}
                        <Button
                          type="text"
                          onClick={() =>
                            openDeleteModal(
                              setTemplateStates(
                                setDisplayTemplates,
                                setAllTemplates
                              ),
                              modalActions,
                              allTemplates,
                              template,
                              iln
                            )
                          }
                        >
                          {iln.gettext("Delete")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <TablePlaceholder />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {displayTemplates ? (
          addNewTemplateButton(
            openCreateOrEditModal,
            modalActions,
            setTemplateStates(setDisplayTemplates, setAllTemplates),
            allTemplates,
            classes,
            iln
          )
        ) : (
          <AddButtonPlaceholder />
        )}
      </div>
    </div>
  );
};

export default CaseTemplateManager;
