import { selectConstituentDetails } from "./slice/viewConstituentSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const constituent = useSelector(selectConstituentDetails);

  return {
    constituent,
  };
};
