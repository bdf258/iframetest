import React, { useState } from "react";

import Currentbehalfs from "./CurrentBehalfs.jsx";
import EditBehalf from "./EditBehalf.jsx";
import { Heading } from "@electedtech/electedtech-ui";
import ModalLink from "../Groups/ModalLink.jsx";
import useStyles from "./styles.js";

const Behalfs = () => {
  const [refresh, setRefresh] = useState(false);

  const behalfAdded = () => {
    setRefresh((refresh) => !refresh);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Heading heading="Tools - Behalf Of" size="Large" />
      <ModalLink
        linkText={"+ Add Behalf Of"}
        title={"Add Behalf Of"}
        component={<EditBehalf behalfAdded={behalfAdded} />}
        customClassNames={{ card: classes.card }}
      />
      <Currentbehalfs refresh={refresh} />
      <ModalLink
        linkText={"+ Add Behalf Of"}
        title={"Add Behalf Of"}
        component={<EditBehalf behalfAdded={behalfAdded} />}
        customClassNames={{ card: classes.card }}
      />
    </React.Fragment>
  );
};

export default Behalfs;
