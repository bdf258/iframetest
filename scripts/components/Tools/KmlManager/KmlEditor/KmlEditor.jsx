import {
  Button,
  FlexBox,
  FormFileInput,
  FormTextInput,
  Map,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import PermissionsChipInput from "../../../common/PermissionsChipInput/PermissionsChipInput.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./KmlEditor.propTypes.js";
import useStyles from "./KmlEditor.styles.js";

const sizeLimit = 10 * 1000 * 1000; // 10MB

const calculateCenter = (kml) =>
  kml.text().then((fileAsText) => {
    const parser = new DOMParser();
    const kml = parser.parseFromString(fileAsText, "text/xml");
    const coordinatesElement = kml.getElementsByTagName("coordinates")[0];

    const coordinates = coordinatesElement.innerHTML
      .split(",")
      .map((coord) => coord.split(" "));

    let totalX = 0;
    let totalY = 0;

    coordinates.forEach(([x, y]) => {
      if (x === undefined || y === undefined) return;
      totalX += parseFloat(x);
      totalY += parseFloat(y);
    });

    const centerX = totalX / coordinates.length;
    const centerY = totalY / coordinates.length;

    return [centerX, centerY];
  });

const KmlEditor = ({ kml, dispatch, modalID }) => {
  const classes = useStyles();

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [fetching, setFetching] = useState(false);
  const [name, setName] = useState(kml?.name || "");
  const [restrictions, setRestrictions] = useState(kml?.restrictions || []);
  const [{ file, fileURL }, setFile] = useState({});
  const [fileError, setFileError] = useState();
  const [center, setCenter] = useState();

  useEffect(() => {
    return () => URL.revokeObjectURL({ fileURL });
  }, []);

  return (
    <div className={classes.kmlEditor}>
      <FormTextInput
        label={iln.gettext("KML Name")}
        name="name"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        customClassNames={{
          container: classes.inputContainer,
        }}
        keepErrorSpacing={false}
      />
      <PermissionsChipInput
        value={restrictions}
        onChange={({ target: { value } }) => setRestrictions(value)}
        customClassNames={{
          container: classes.inputContainer,
          placeholder: classes.chipInputPlaceholder,
        }}
      />
      {!kml && (
        <FormFileInput
          label={iln.gettext("File")}
          name="file"
          value={file}
          onFoc
          onChange={(file) => {
            setFile({});
            setFileError();

            if (file.size > sizeLimit)
              setFileError(
                iln.gettext(
                  "Warning: File exceeds 10MB limit and may cause issues with mapping"
                )
              );
            if (file) {
              // force render of map (terrible I know)
              setTimeout(() => {
                setFile({ file, fileURL: URL.createObjectURL(file) });
                calculateCenter(file).then((coordinates) =>
                  setCenter(coordinates)
                );
              }, 1);
            }
          }}
          accept=".kml,.kmz"
          error={fileError}
          customClassNames={{
            container: classes.fileInputContainer,
          }}
        />
      )}
      {fileURL && center && (
        <React.Fragment>
          <Map
            customClassNames={{ container: classes.inputContainer }}
            height="400px"
            kmlURL={fileURL}
            zoom={7}
            center={center}
          />
          <br />
        </React.Fragment>
      )}
      <FlexBox hAlign="space-between">
        <Button onClick={() => modalActions.removeById(modalID)}>
          {iln.gettext("Cancel")}
        </Button>
        <Button
          customClassNames={classes.submitButton}
          isDisabled={
            name.trim() === "" || (!kml && file === undefined) || fetching
          }
          onClick={() => {
            setFetching(true);
            (kml
              ? api
                  .updateKML({
                    id: kml.id,
                    name,
                    restrictions: restrictions,
                  })
                  .then(() =>
                    dispatch({
                      type: "UPDATE_KML",
                      payload: { ...kml, name, restrictions },
                    })
                  )
              : api
                  .createKML(
                    {
                      name,
                      file,
                      restrictions: restrictions,
                    },
                    modalActions,
                    iln
                  )
                  .then(({ id, url }) =>
                    dispatch({
                      type: "ADD_KML",
                      payload: { id, name, url, restrictions },
                    })
                  )
            ).then(() => modalActions.removeById(modalID));
          }}
        >
          {fetching ? (
            <Spinner />
          ) : kml ? (
            iln.gettext("Update")
          ) : (
            iln.gettext("Create")
          )}
        </Button>
      </FlexBox>
    </div>
  );
};

KmlEditor.propTypes = propTypes;

export default KmlEditor;
