import { TranslationContext } from "context/translate";
import { customFieldBlocks } from "../../../../../../helpers/localStorageHelper";
import { useContext } from "react";

export const validName = (customBlockName) => !!customBlockName;
export const validParentObject = (parentObject) => !!parentObject;

export const uniqueCustomBlockName = (name, editingExistingCustomBlock) => {
  // doesn't need to check this validation condition
  // as you can't change a custom blocks name when editing
  if (editingExistingCustomBlock) return true;
  return customFieldBlocks.every(
    (customFieldBlock) =>
      customFieldBlock.name.toLowerCase() !== name.toLowerCase()
  );
};

const useCustomBlockValidation = (
  customBlocks,
  customBlock,
  editingExistingCustomBlock,
  nameUnique
) => {
  const iln = useContext(TranslationContext);
  const invalidCustomBlock = () => {
    if (!customBlock) return false;

    const { name, parent_object } = customBlock;

    if (!validName(name))
      return iln.gettext("Custom Blocks require a valid name");
    if (!nameUnique) {
      return iln.gettext("Custom Blocks require a unique name");
    }
    if (!validParentObject(parent_object))
      return iln.gettext("Custom Blocks require a parent object");

    return false;
  };

  return { invalidCustomBlock };
};

export default useCustomBlockValidation;
