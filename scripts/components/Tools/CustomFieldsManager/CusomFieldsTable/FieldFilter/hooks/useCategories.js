import { categoryTypes } from "../../../../../../helpers/localStorageHelper";

const useCategories = () => {
  const allCategories = {
    id: -1,
    categorytype: "All Categories",
  };
  return [allCategories, ...categoryTypes];
};

export default useCategories;
