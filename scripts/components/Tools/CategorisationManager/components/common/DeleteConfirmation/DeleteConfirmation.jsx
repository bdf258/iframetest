import {
  Button,
  FlexBox,
  FormSelect,
  FormTextInput,
  ModalContext,
  NotificationBox,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import ComponentLoading from "../../../../../ComponentLoading.jsx";
import { TranslationContext } from "context/translate";
import TypesMapper from "./TypesMapper/TypesMapper.jsx";
import propTypes from "./DeleteConfirmation.propTypes.js";
import useStyles from "./DeleteConfirmation.styles.js";

const getItemType = (item) =>
  item.categorytype
    ? "categorytype"
    : item.casetype
    ? "casetype"
    : item.statustype
    ? "statustype"
    : undefined;

const typeHumanNames = {
  categorytype: "Category",
  casetype: "Case Type",
  statustype: "Status Type",
};

const checkRequiresMapping = ({ casetypes, statustypes }) =>
  Object.keys(casetypes).length > 0 || Object.keys(statustypes).length > 0;

const checkMappingComplete = ({ casetypes, statustypes }) =>
  !Object.values(casetypes).some(
    ({ mergeType, value }) => mergeType === "merge" && value === undefined
  ) &&
  !Object.values(statustypes).some(
    ({ mergeType, value }) => mergeType === "merge" && value === undefined
  );

const createMapping = ({ state, item, mergeItem }) => ({
  casetypes: state.casetypes.reduce((all, { id, casetype, categorytypeID }) => {
    const options = state.statustypes.filter(
      ({ categorytypeID }) => categorytypeID === mergeItem.id
    );
    return categorytypeID === item.id
      ? {
          ...all,
          [id]: {
            casetype,
            mergeType: options.length > 0 ? "merge" : "add",
            mergeTypeOptions: options.length > 0 ? ["merge", "add"] : ["add"],
            options,
            value: undefined,
          },
        }
      : all;
  }, {}),
  statustypes: state.statustypes.reduce(
    (all, { id, statustype, categorytypeID }) => {
      const options = state.statustypes.filter(
        ({ categorytypeID }) => categorytypeID === mergeItem.id
      );
      return categorytypeID === item.id
        ? {
            ...all,
            [id]: {
              statustype,
              mergeType: options.length > 0 ? "merge" : "add",
              mergeTypeOptions: options.length > 0 ? ["merge", "add"] : ["add"],
              value: undefined,
              options,
            },
          }
        : all;
    },
    {}
  ),
});

const DeleteConfirmation = ({
  item,
  modalID,
  onDelete,
  onMerge,
  checkDeletionAllowed,
  state,
}) => {
  const classes = useStyles();

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [text, setText] = useState("");
  const [fetching, setFetching] = useState(false);
  const [caseCount, setCaseCount] = useState();
  const [options, setOptions] = useState();
  const [mergeItem, setMergeItem] = useState({ id: "empty" });
  const [typesMapping, setTypesMapping] = useState({
    casetypes: [],
    statustypes: [],
  });

  const global = item.categorytypeID === 0;
  const itemType = getItemType(item);
  const itemName = item[itemType];
  const typeHumanName = typeHumanNames[itemType];
  const requiresMapping = checkRequiresMapping(typesMapping);
  const mappingComplete = checkMappingComplete(typesMapping);

  useEffect(() => {
    checkDeletionAllowed
      ? checkDeletionAllowed(item).then(({ cases, options }) => {
          setCaseCount(cases);
          setOptions(
            options.map(({ id, ...option }) => ({
              ...option,
              id: parseInt(id),
            }))
          );
        })
      : setCaseCount(0);
  }, []);

  useEffect(() => {
    itemType === "categorytype" &&
      setTypesMapping(createMapping({ state, item, mergeItem }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergeItem.id]);

  if (caseCount === undefined || (caseCount > 0 && options === undefined))
    return (
      <div>
        <ComponentLoading />
      </div>
    );

  if (caseCount === 0)
    return (
      <div>
        {global && (
          <NotificationBox
            alertMessage={iln.gettext(
              "This %1 is marked as global and is present in every category. Deleting this %1 will remove it as option from all cases",
              typeHumanName
            )}
            type="warn"
          />
        )}
        <p>
          {iln.gettext("Are you sure you want to delete the %1", typeHumanName)}{" "}
          <strong>{itemName}</strong>? {iln.gettext("This cannot be undone.")}
        </p>
        <p>
          {iln.gettext(
            "To confirm please enter the name of the %1 into the box below and click",
            typeHumanName
          )}{" "}
          <strong>{iln.gettext("Delete")}</strong>.
        </p>
        <FormTextInput
          name="confirmationText"
          value={text}
          onChange={({ target: { value } }) => setText(value)}
          placeholder={iln.gettext("Click here...")}
          keepErrorSpacing={false}
          customClassNames={{ container: classes.inputContainer }}
        />
        <FlexBox hAlign="space-between">
          <Button
            onClick={() => modalActions.removeById(modalID)}
            isDisabled={fetching}
          >
            {iln.gettext("Cancel")}
          </Button>
          <Button
            customClassNames={classes.confirmButton}
            isDisabled={
              text.trim().toLowerCase() !== itemName.trim().toLowerCase() ||
              fetching
            }
            onClick={() => {
              setFetching(true);
              onDelete(item.id);
            }}
          >
            {fetching ? <Spinner /> : iln.gettext("Delete")}
          </Button>
        </FlexBox>
      </div>
    );

  return (
    <div className={classes.deleteConfirmation}>
      <p>
        {iln.gettext("You are unable to delete %1", typeHumanName)}{" "}
        <strong>{itemName}</strong>{" "}
        {iln.ngettext(
          "as it is used on %1 case.",
          "as it is used on %1 cases.",
          caseCount
        )}
      </p>
      <p>
        {iln.gettext("Instead")} <strong>{itemName}</strong>{" "}
        {iln.gettext("can be merged into one of the below options.", itemName)}{" "}
        {iln.gettext("This cannot be undone.")}
      </p>
      <FormSelect
        name="merge choice"
        value={mergeItem}
        onChange={({ target: { value } }) => setMergeItem(value)}
        customClassNames={{ container: classes.inputContainer }}
        keepErrorSpacing={false}
      >
        {[{ id: "empty", [itemType]: "‎" }, ...options].map((option) => (
          <option key={option.id} value={option}>
            {option[itemType]}
          </option>
        ))}
      </FormSelect>

      {requiresMapping && mergeItem.id !== "empty" && (
        <TypesMapper
          typesMapping={typesMapping}
          setTypesMapping={setTypesMapping}
          mergeItem={mergeItem}
          deleteItem={item}
        />
      )}

      <FlexBox hAlign="space-between">
        <Button
          onClick={() => modalActions.removeById(modalID)}
          isDisabled={fetching}
        >
          {iln.gettext("Cancel")}
        </Button>
        <Button
          customClassNames={classes.confirmButton}
          isDisabled={
            fetching ||
            mergeItem.id === "empty" ||
            (requiresMapping && !mappingComplete)
          }
          onClick={() => {
            setFetching(true);
            onMerge(item.id, mergeItem.id, typesMapping);
          }}
        >
          {fetching ? <Spinner /> : iln.gettext("Merge & Delete")}
        </Button>
      </FlexBox>
    </div>
  );
};

DeleteConfirmation.propTypes = propTypes;

export default DeleteConfirmation;
