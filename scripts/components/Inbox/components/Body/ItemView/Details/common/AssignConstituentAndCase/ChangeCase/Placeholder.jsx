import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";

const ChangeModalPlaceholder = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Placeholder height={18} width={230} style={{ marginBottom: "1rem" }} />
      <Placeholder height={18} width={460} style={{ marginBottom: "1rem" }} />
      <Placeholder height={32} width={385} />
    </div>
  );
};

export default ChangeModalPlaceholder;
