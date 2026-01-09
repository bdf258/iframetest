import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import useStyles from "./styles";

const UserPreferencesPlaceholder = () => {
  const classes = useStyles();

  return (
    <div>
      <Placeholder width={350} height={27.5} className={classes.title} />
      <div className={classes.container}>
        <div className={classes.inner}>
          <br />
          <Placeholder width={500} height={30} className={classes.spacing} />
          <Placeholder width={500} height={30} className={classes.spacing} />
          <Placeholder width={500} height={30} className={classes.spacing} />
          <Placeholder width={500} height={30} className={classes.spacing} />
          <br />
          <Placeholder width={500} height={30} className={classes.spacing} />
          <Placeholder width={500} height={30} className={classes.spacing} />
          <br />
          <Placeholder width={500} height={30} className={classes.spacing} />
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesPlaceholder;
