import { Map as Leaflet, ProgressIndicator } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import getCaseTypeById from "../../../../../helpers/getCaseTypeById.js";
import prefixCaseID from "../../../../../helpers/prefixCaseID";
import propTypes from "./Map.propTypes.js";
import sanitiseHtmlString from "../../../../../helpers/sanitiseHtmlString.js";
import useGetAllCases from "./hooks/useGetAllCases";
import useStyles from "./Map.styles.js";

/**
 * 1. allCases.reduce filters the cases to only include cases
 *    with lat & lng values. It also transforms the array of
 *    cases into an object where the key is the constituent id
 *    and the value is an object with the constituent details
 *    and an array of case IDs that belong to that constituent.
 *
 * 2. This object is then transformed back into an array with
 *    Object.entries and an array map on the result. Each item
 *    has a position: [lat, lng] and text (which appears on click)
 *    which shows the constituent name along with a list of their
 *    cases. All of which has a link to the corresponding page.
 */
const createMarkers = (allCases = [], { iln }) =>
  Object.entries(
    allCases.reduce(
      (
        all,
        {
          id: caseID,
          caseType,
          constituent: { id: constituentID, lat, lng, ...constituent },
        }
      ) => {
        if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
          const otherCases = all[constituentID]?.cases || [];

          all[constituentID] = {
            ...constituent,
            cases: [...otherCases, { id: caseID, caseType }],
            lat,
            lng,
          };
        }

        return all;
      },
      {}
    )
  ).map(([constituentID, { cases, lat, lng, title, firstname, surname }]) => ({
    position: [lat, lng],
    text: sanitiseHtmlString(`<div style="padding: 0 15px">
        <h3 style="font-weight: bold;">
          <a href="/viewconstituent.php?constituentID=${constituentID}">
            ${title} ${firstname} ${surname}
          </a>
        </h3>
        <ul style="list-style: none; padding-left: 0;">
          ${cases.reduce(
            (currentString, { id: caseID, caseType: caseTypeID }) =>
              currentString +
              `<li>
              <div>${iln.gettext("Case Ref")}: ${prefixCaseID(caseID)}</div>
              <div>${getCaseTypeById(caseTypeID) || ""}</div>
              <a
                style="margin-bottom: 10px; display: block"
                href="./viewcase.php?caseID=${caseID}"
              >
                ${iln.gettext("View case")}
              </a>
            </li>`,
            ""
          )}
        </ul>
      </div>`),
  }));

const Map = ({ state }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { percentLoaded, allCases } = useGetAllCases(state);

  if (!allCases) return <ProgressIndicator progressPercent={percentLoaded} />;

  const markers = createMarkers(allCases, { iln });

  return (
    <Leaflet
      customClassNames={{ container: classes.mapContainer }}
      card
      zoom={9}
      height="100%"
      center={[52.068576, -1.621217, 0]}
      markers={markers}
    />
  );
};

Map.propTypes = propTypes;

export default Map;
