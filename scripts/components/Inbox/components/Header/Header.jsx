import React, { useContext } from "react";

import Actions from "./Actions/Actions.jsx";
import Filters from "./Filters/Filters.jsx";
import TranslationContext from "../../../../context/translation/TranslationContext";
import { useStyles } from "./styles";

const Header = () => {
  const iln = useContext(TranslationContext);

  const classes = useStyles();

  return (
    <header>
      <h1 className={classes.text}>{iln.gettext("Inbox")}</h1>
      <div className={classes.header}>
        <div className={classes.filtersContainer}>
          <Filters />
        </div>
        <Actions />
      </div>
    </header>
  );
};

export default Header;
