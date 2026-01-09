import React, { useContext } from "react";

import MappingTable from "./MappingTable/MappingTable.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./TypesMapper.propTypes.js";
import useStyles from "./TypesMapper.styles.js";

const TypesMapper = ({
  deleteItem,
  mergeItem,
  typesMapping,
  setTypesMapping,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.typesMapper}>
      {Object.keys(typesMapping.casetypes).length > 0 && [
        <h3 key="subheading">{iln.gettext("Case Types")}</h3>,
        <MappingTable
          key="table"
          mergeItem={mergeItem}
          deleteItem={deleteItem}
          mapping={typesMapping.casetypes}
          onChange={(casetypes) =>
            setTypesMapping({ ...typesMapping, casetypes })
          }
        />,
      ]}
      {Object.keys(typesMapping.statustypes).length > 0 && [
        <h3 key="subheading">{iln.gettext("Status Types")}</h3>,
        <MappingTable
          key="table"
          mergeItem={mergeItem}
          deleteItem={deleteItem}
          mapping={typesMapping.statustypes}
          onChange={(statustypes) =>
            setTypesMapping({ ...typesMapping, statustypes })
          }
        />,
      ]}
    </div>
  );
};

TypesMapper.propTypes = propTypes;

export default TypesMapper;
