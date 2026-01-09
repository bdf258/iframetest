import { useEffect, useState } from "react";

import { customFieldBlocks } from "../../../../../../helpers/localStorageHelper";

const filteredCustomFieldBlocks = (selectedParentEntity, customFieldBlocks) =>
  customFieldBlocks
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    .reduce((acc, block) => {
      if (block.parent_object === selectedParentEntity) {
        acc.push({ id: block.id, name: block.name });
      }
      return acc;
    }, []);
const useFilteredDisplayInBlockOptions = (selectedParentEntity) => {
  const [displayInBlockOptions, setDisplayInBlockOptions] = useState([]);

  useEffect(() => {
    setDisplayInBlockOptions(
      filteredCustomFieldBlocks(selectedParentEntity, customFieldBlocks)
    );
  }, [selectedParentEntity]);

  return displayInBlockOptions;
};

export default useFilteredDisplayInBlockOptions;
