import {
  dispatchAddOrganisationType,
  selectConnectionTypes,
  selectOrganisationTypes,
  selectRoleTypes,
} from "../../../../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const organisationTypes = useSelector(selectOrganisationTypes);
  const connectionTypes = useSelector(selectConnectionTypes);
  const roleTypes = useSelector(selectRoleTypes);

  const dispatch = useDispatch();
  const addOrganisationType = (organisationType) =>
    dispatch(dispatchAddOrganisationType(organisationType));

  return {
    organisationTypes,
    connectionTypes,
    roleTypes,
    addOrganisationType,
  };
};
