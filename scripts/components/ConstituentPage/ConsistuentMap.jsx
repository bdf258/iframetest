/*global model, $ */

import {
  Button,
  FlexBox,
  Map,
  ModalContext,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { createUseStyles } from "react-jss";
import { getInstallationPreferences } from "../../helpers/localStorageHelper";

const { version } = getInstallationPreferences();

const useStyles = createUseStyles({
  title: {
    fontWeight: 400,
    marginBottom: 16,
  },
});

// closes the php modal
const closeModal = () => $ && $(".reveal-modal").trigger("reveal:close");

// if model.constituent.lat + .lng exists and isn't blank
// get value, otherwise null
const getLatLng = () =>
  (model &&
    model.constituent &&
    model.constituent.lat != "" &&
    model.constituent.lng != "" && [
      parseFloat(model.constituent.lat),
      parseFloat(model.constituent.lng),
    ]) ||
  null;

const getName = () => {
  if (model)
    if (model.isOrganisation === 1) return model.organisation;
    else if (model.constituent)
      return `${model.constituent.title} ${model.constituent.firstname} ${model.constituent.middlename} ${model.constituent.surname}`.trim();
};

const ConstituentMap = () => {
  const classes = useStyles();
  const [view, setView] = useState("map");
  const [name, setName] = useState();
  const [location, setLocation] = useState();

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    /*
     * Add an event listener to the show map button to reset the state
     * as this component remains rendered even when the modal is off screen
     */
    const container = document.getElementById("showConstituentMapButton");
    const onClickHandler = () => {
      setView("map");
      setName(getName());
      setLocation([
        {
          position: getLatLng(),
          text: getName(),
        },
      ]);
    };
    container.addEventListener("click", onClickHandler);

    // remove the event listener on unmount
    return () => container.removeEventListener("click", onClickHandler);
  }, []);

  if (!location) return <p>No map location available</p>;

  return (
    <Switcher selected={view}>
      {{
        map: (
          <div>
            <b>
              <h2 className={classes.title}>Map View - {name}</h2>
            </b>
            <Map
              markers={location}
              height={480}
              center={location[0].position || [0, 0]}
              zoom={9}
            />
            {version !== "AU" && [
              <br key="break" />,
              <FlexBox key="flex" hAlign="flex-end">
                <Button
                  onClick={() => {
                    setView("clear");
                  }}
                >
                  {iln.gettext("Clear Location")}
                </Button>
              </FlexBox>,
            ]}
          </div>
        ),
        clear: (
          <div>
            <h2>{iln.gettext("Clear Map Location")}</h2>
            <p>
              {iln.gettext("Are you sure you want to")}{" "}
              <b>{iln.gettext("clear the location")}</b> {iln.gettext("of")}{" "}
              <b>{name}</b>?{" "}
              {iln.gettext(
                "This will remove their map marker and it cannot be undone."
              )}
            </p>
            <FlexBox hAlign="flex-end">
              <Button
                htmlClass="close-reveal-modal"
                onClick={() => {
                  api
                    .deleteGeocode(
                      parseInt(model.constituent.ID),
                      modalActions,
                      iln
                    )
                    .then(() => {
                      setLocation(null);
                      closeModal();
                    });
                }}
              >
                {iln.gettext("Confirm")}
              </Button>
            </FlexBox>
          </div>
        ),
      }}
    </Switcher>
  );
};

export default ConstituentMap;
