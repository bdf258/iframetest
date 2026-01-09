import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";

const ContentPlaceholder = () => {
  return (
    <div
      style={{
        padding: "0.5rem 0 0 0.5rem",
      }}
    >
      <Placeholder
        width={200}
        height={13}
        style={{ marginBottom: "0.5rem", padding: 1 }}
      />
      <Placeholder
        width="50%"
        height={13}
        style={{ marginBottom: "0.5rem", padding: 1 }}
      />
      <Placeholder
        width="55%"
        height={13}
        style={{ marginBottom: "0.5rem", padding: 1 }}
      />
      <Placeholder
        width="40%"
        height={13}
        style={{ marginBottom: "0.5rem", padding: 1 }}
      />
      <Placeholder
        width={150}
        height={13}
        style={{ marginBottom: "0.5rem", padding: 1 }}
      />
      <Placeholder
        width={75}
        height={13}
        style={{ marginBottom: "0.5rem", padding: 1 }}
      />
    </div>
  );
};

export default ContentPlaceholder;
