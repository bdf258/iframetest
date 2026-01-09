import { ModalContext, Placeholder } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";

import KmlTable from "./KmlTable";
import { TranslationContext } from "context/translate";
import UploadButton from "./UploadButton";
import api from "@electedtech/api";
import useManagerState from "./hooks/useManagerState";

const KmlManager = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [state, dispatch] = useManagerState();

  useEffect(() => {
    api.getKMLs(modalActions, iln).then((KMLs) => {
      dispatch({
        type: "SET_STATE",
        payload: KMLs.map((k) => ({
          ...k,
          restrictions: k.restrictions,
        })),
      });
    });
  }, []);

  return (
    <React.Fragment>
      <h1>{iln.gettext("Tools - KML Manager")}</h1>
      {!state ? (
        <Placeholder width="100%" height="calc(100vh - 250px)" />
      ) : (
        <React.Fragment>
          <UploadButton dispatch={dispatch} />
          <KmlTable state={state} dispatch={dispatch} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default KmlManager;
