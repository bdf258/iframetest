import api from "@electedtech/api";
import { dispatchSetConstituent } from "../../slice/viewConstituentSlice.js";
import { getQueryStringParamMap } from "../../../../helpers/queryString.js";
import { useDispatch } from "react-redux";

const useGetConstituent = () => {
  const dispatch = useDispatch();
  const setConstituent = (constituent) =>
    dispatch(dispatchSetConstituent(constituent));

  return () => {
    let constituentID = parseInt(getQueryStringParamMap().get("constituentID"));
    //It might not be in the query string if it's newly created in which case we can read it from the window

    if (typeof constituentID !== "number" || isNaN(constituentID)) {
      constituentID = parseInt(window.constituentID);
    }

    if (typeof constituentID === "number" && !isNaN(constituentID)) {
      api
        .getConstituent(constituentID)
        .then((constituentDetails) => {
          setConstituent(constituentDetails);
        })
        .catch(
          (e) =>
            e.status !== 200 &&
            setConstituent({
              statusCode: e.status.toString(),
            })
        );
    } else {
      window.location.replace("home.php");
    }
  };
};

export default useGetConstituent;
