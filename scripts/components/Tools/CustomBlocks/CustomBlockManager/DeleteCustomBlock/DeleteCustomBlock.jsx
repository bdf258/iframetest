import {
  Button,
  FlexBox,
  FormSelect,
  FormTextInput,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import ForwardIcon from "../../../../common/icons/ForwardIcon.jsx";
import { TranslationContext } from "context/translate";
import { customBlockOptionsForRemapping } from "./util/customBlockOptionsForRemapping";
import customBlocksApi from "../../../../../api/src/customBlocks";
import customFieldsAPI from "../../../../../api/src/customFields";
import { customFieldsToBeRemapped } from "./util/customFieldsToBeRemapped";
import propTypes from "./DeleteCustomBlock.propTypes";
import useCustomBlockToCustomFieldState from "./hooks/useCustomBlockToCustomFieldState";
import { useStyles } from "./DeleteCustomBlock.styles";
import { validCustomFieldToCustomBlockMap } from "./util/validCustomFieldToCustomBlockMap";

/**
 * When deleting a custom block
 * If the custom block has associated custom fields, the custom fields need to be remapped.
 * If there are no associated custom fields, the custom block can be deleted immediately.
 * This component handles showing the correct UI depending on the custom block.
 * See useEffect and remapCustomFieldsFromCustomBlock
 */
const DeleteCustomBlock = ({
  handleConfirmDeleteCustomBlock,
  customBlockName,
  customBlockId,
  parent_object,
  onCancel,
  onDone,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [customBlockSuccessfullyDeleted, setCustomBlockSuccessfullyDeleted] =
    useState(false);
  const [error, setError] = useState(false);

  const initialState = {
    customFieldsToMap: customFieldsToBeRemapped(customBlockId, parent_object),
    compatibleCustomBlocks: customBlockOptionsForRemapping(
      customBlockId,
      parent_object
    ),
  };

  const [customBlockToCustomFieldMap, dispatch] =
    useCustomBlockToCustomFieldState(initialState);

  const { customFieldsToMap, compatibleCustomBlocks, mapToCustomBlockId } =
    customBlockToCustomFieldMap;

  const handleDeleteCustomBlock = (
    { customBlockId } = {
      customBlockId: undefined,
      mapToCustomBlockId: undefined,
    }
  ) => {
    const { customFieldsToMap } = customBlockToCustomFieldMap;

    const deleteCustomBlock = async (customBlockId) => {
      if (!customBlockId) return;
      setLoading(true);

      customBlocksApi
        .deleteCustomBlock(
          {
            customBlockToDeleteId: customBlockId,
          },
          modalActions
        )
        .then(() => {
          handleConfirmDeleteCustomBlock(customBlockId);
          setLoading(false);
          setCustomBlockSuccessfullyDeleted(true);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    };

    if (customFieldsToMap.length === 0) {
      deleteCustomBlock(customBlockId);
    } else {
      const customFieldsRemapped = customFieldsToMap.reduce(
        (acc, customField) => {
          const { mapToCustomBlockId } = customField;
          return {
            ...acc,
            [customField.id]: {
              block_id: mapToCustomBlockId,
            },
          };
        },
        {}
      );

      customFieldsAPI.bulkEditCustomFields(customFieldsRemapped).then(() => {
        deleteCustomBlock(customBlockId);
      });
    }
  };

  /**
   * If a custom block has no associated custom fields
   * The block can be deleted immediately.
   */
  useEffect(() => {
    const remapCustomFieldsFromCustomBlock = customFieldsToMap.length === 0;
    if (remapCustomFieldsFromCustomBlock) {
      handleDeleteCustomBlock({ customBlockId });
    }
  }, []);

  if (error) {
    return (
      <React.Fragment>
        <p>
          {iln.gettext(
            `An error occurred when attempting to delete the custom block: ${customBlockName}`
          )}
        </p>
        <FlexBox hAlign={"right"}>
          <Button onClick={() => onDone()}>{iln.gettext("Done")}</Button>
        </FlexBox>
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <FlexBox column>
        <p>{iln.gettext(`Deleting ${customBlockName}...`)}</p>
        <FlexBox hAlign={"center"}>
          <Spinner scale={1} />
        </FlexBox>
      </FlexBox>
    );
  }

  if (customBlockSuccessfullyDeleted) {
    return (
      <React.Fragment>
        <p>{iln.gettext(`${customBlockName} has been deleted successfully`)}</p>
        <FlexBox hAlign={"right"}>
          <Button onClick={() => onDone()}>{iln.gettext("Done")}</Button>
        </FlexBox>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <p>
        {iln.gettext(
          `Custom Fields that use the ${customBlockName} custom block must be reassigned to an existing custom block.`
        )}
      </p>
      <div className={classes.customFieldMapperContainer}>
        {customFieldsToMap.map((customField, index) => (
          <FlexBox hAlign={"space-evenly"} key={index}>
            <FormTextInput
              customClassNames={{
                container: classes.inputContainer,
                label: classes.label,
              }}
              name={"customField"}
              keepErrorSpacing={false}
              readOnly
              value={customField.name}
            />
            <ForwardIcon
              height={30}
              width={30}
              backgroundColour={"white"}
              colour={"lightgrey"}
            />
            <FormSelect
              value={customFieldsToMap[index].mapToCustomBlockId || ""}
              customClassNames={{
                container: classes.inputContainer,
                label: classes.label,
              }}
              name={"customBlocks"}
              keepErrorSpacing={false}
              onChange={(e) =>
                dispatch({
                  type: "SET_CUSTOM_FIELD_MAP",
                  payload: {
                    customFieldIndex: index,
                    mapToCustomBlockId: e.target.value,
                  },
                })
              }
            >
              {compatibleCustomBlocks.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </FlexBox>
        ))}
      </div>
      <FlexBox hAlign={"space-between"}>
        <Button onClick={() => onCancel()}>{iln.gettext("Cancel")}</Button>
        <Button
          isDisabled={!validCustomFieldToCustomBlockMap(customFieldsToMap)}
          onClick={() =>
            handleDeleteCustomBlock({ customBlockId, mapToCustomBlockId })
          }
        >
          {iln.gettext("Continue")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

DeleteCustomBlock.propTypes = propTypes;

export default DeleteCustomBlock;
