import React, { useState } from "react";

import AddGroup from "./AddGroup.jsx";
import CurrentGroups from "./CurrentGroups.jsx";
import { Heading } from "@electedtech/electedtech-ui";
import ModalLink from "./ModalLink.jsx";

const Groups = () => {
  const [refresh, setRefresh] = useState(false);

  const groupAdded = () => {
    setRefresh((refresh) => !refresh);
  };

  return (
    <React.Fragment>
      <Heading heading="Tools - Groups" size="Large" />
      <ModalLink
        linkText={"+ Add Group"}
        title={"Add Group"}
        component={<AddGroup groupAdded={groupAdded} />}
      />
      <CurrentGroups refresh={refresh} groupChanged={groupAdded} />
      <ModalLink
        linkText={"+ Add Group"}
        title={"Add Group"}
        component={<AddGroup groupAdded={groupAdded} />}
      />
    </React.Fragment>
  );
};

export default Groups;
