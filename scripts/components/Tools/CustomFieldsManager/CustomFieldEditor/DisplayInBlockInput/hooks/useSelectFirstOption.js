import { useEffect } from "react";

const useSelectFirstOption = (
  selectedBlock,
  selectedParentEntity,
  handleFormChange,
  displayInBlockOptions,
  inputName
) => {
  useEffect(() => {
    if (selectedBlock) return;
    if (displayInBlockOptions.length === 0) return;

    const detailsBlock = displayInBlockOptions.find((displayBlock) => {
      if (displayBlock.name === "details" || displayBlock.name === "Details") {
        return displayBlock;
      }
    });

    handleFormChange({
      target: {
        name: inputName,
        value: detailsBlock ? detailsBlock.id : displayInBlockOptions[0].id,
      },
    });
  }, [displayInBlockOptions]);
};

export default useSelectFirstOption;
