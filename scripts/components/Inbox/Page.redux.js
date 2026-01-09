import {
  dispatchSetCaseworkers,
  dispatchSetConnectionTypes,
  dispatchSetOrganisationTypes,
  dispatchSetRoleTypes,
  dispatchUpdateContactTypes,
  selectFilters,
} from "./slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  return {
    filters: useSelector(selectFilters),
    setCaseworkers: (caseworkers) =>
      dispatch(dispatchSetCaseworkers(caseworkers)),
    setContactTypes: (contactTypes) =>
      dispatch(dispatchUpdateContactTypes(contactTypes)),
    setOrganisationTypes: (orgTypes) =>
      dispatch(dispatchSetOrganisationTypes(orgTypes)),
    setConnectionTypes: (connTypes) =>
      dispatch(dispatchSetConnectionTypes(connTypes)),
    setRoleTypes: (roleTypes) => dispatch(dispatchSetRoleTypes(roleTypes)),
  };
};
