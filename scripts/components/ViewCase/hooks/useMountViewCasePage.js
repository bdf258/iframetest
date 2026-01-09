import {
  dispatchMergeCasenotes,
  dispatchSetCaseDetails,
  dispatchSetCasePermissions,
  dispatchSetCasenotesFetching,
  dispatchSetCaseworkers,
  dispatchSetConstituent,
  dispatchSetContactTypes,
  dispatchSetDoNotContactTypes,
} from "../slice/viewCaseSlice";

import api from "@electedtech/api";
import { caseworkerID } from "../../../helpers/localStorageHelper";
import getPermissions from "../helpers/getPermissions";
import { getQueryStringParamMap } from "../../../helpers/queryString";
import { initialCustomFieldValues } from "../../Tools/CaseTemplateManager/util/initialCustomFieldValues";
import { removeInvalidCaseNotes } from "../helpers/removeInvalidCaseNotes";
import { useDispatch } from "react-redux";
import useGetNextCasenotesPage from "./useGetNextCasenotesPage.js";

const useMountViewCasePage = () => {
  const dispatch = useDispatch();
  const setCasenotesFetching = (fetching) =>
    dispatch(dispatchSetCasenotesFetching(fetching));
  const setCaseworkers = (caseworkers) =>
    dispatch(dispatchSetCaseworkers(caseworkers));
  const setConstituent = (constituent) =>
    dispatch(dispatchSetConstituent(constituent));
  const setCaseDetails = (caseDetails) =>
    dispatch(dispatchSetCaseDetails(caseDetails));
  const setCasePermissions = (casePermissions) =>
    dispatch(dispatchSetCasePermissions(casePermissions));
  const mergeCasenotes = (casenotes) =>
    dispatch(dispatchMergeCasenotes(casenotes));
  const setContactTypes = (contactTypes) =>
    dispatch(dispatchSetContactTypes(contactTypes));
  const setDoNotContactTypes = (doNotContactTypes) =>
    dispatch(dispatchSetDoNotContactTypes(doNotContactTypes));

  const getNextCasenotesPage = useGetNextCasenotesPage();

  return () => {
    const caseID = parseInt(getQueryStringParamMap().get("caseID"));

    if (typeof caseID === "number" && !isNaN(caseID)) {
      api
        .getDoNotContactTypes()
        .then((doNotContactTypes) =>
          setDoNotContactTypes(
            doNotContactTypes.reduce(
              (all, { id, type }) => ({ ...all, [id]: type }),
              {}
            )
          )
        );
      api
        .getContactList()
        .then((contactTypes) => setContactTypes(contactTypes));
      api
        .getCase(caseID)
        .then((caseDetails) => {
          const {
            customFields: customFieldValues,
            category,
            status,
          } = caseDetails;
          const customFields = initialCustomFieldValues(
            customFieldValues,
            category,
            status
          );
          setCaseDetails({ ...caseDetails, customFields });
          api.getOwnGroups().then((groups) => {
            setCasePermissions(
              getPermissions(groups, caseworkerID, caseDetails.restrictions)
            );
          });
          Promise.all([
            getNextCasenotesPage(),
            api
              .getCaseworkersForCase(caseID)
              .then((res) => setCaseworkers(res)),
            api
              .getConstituent(caseDetails.constituentID)
              .then((constituent) => {
                setConstituent(constituent);
                return constituent;
              }),
          ]).then(() => {
            api.getCaseReviewDates(caseID).then((reviewDates) => {
              reviewDates.length > 0 &&
                mergeCasenotes(
                  Object.values(removeInvalidCaseNotes(reviewDates))
                );
            });
            setCasenotesFetching(false);
          });
        })
        .catch(
          (e) =>
            e.status !== 200 &&
            setCaseDetails({
              statusCode: e.status.toString(),
            })
        );
    } else {
      window.location.replace("casespage.php");
    }
  };
};

export default useMountViewCasePage;
