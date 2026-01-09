import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";

const DetailsPlaceHolder = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <section>
        <Placeholder
          width={200}
          height={16}
          style={{ marginBottom: "0.2rem", padding: 1 }}
        />
        <div style={{ display: "flex", marginBottom: "0.2rem", padding: 1 }}>
          <Placeholder
            width={15}
            height={13}
            style={{ marginRight: "0.6rem" }}
          />
          <Placeholder width={375} height={13} />
        </div>
        <Placeholder
          width={500}
          height={16}
          style={{ marginBottom: "0.2rem" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.2rem",
          }}
        >
          <Placeholder
            width={85}
            height={15}
            style={{
              marginRight: "0.6rem",
            }}
          />
          <Placeholder width={175} height={32} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.2rem",
            padding: 1,
          }}
        >
          <Placeholder
            width={85}
            height={13}
            style={{ marginRight: "0.6rem" }}
          />
          <Placeholder
            width={125}
            height={15}
            style={{ marginRight: "0.4rem" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.2rem",
            padding: 1,
          }}
        >
          <Placeholder
            width={42.5}
            height={13}
            style={{ marginLeft: 42.5, marginRight: "0.6rem" }}
          />
          <Placeholder
            width={55}
            height={15}
            style={{ marginRight: "0.4rem" }}
          />
          <Placeholder width={45} height={11} />
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
            padding: 1,
          }}
        >
          <Placeholder width={80} height={13} style={{ marginRight: 4 }} />
          <Placeholder width={45} height={13} style={{ marginLeft: 4 }} />
        </div>
        <Placeholder width={145} height={16} />
      </section>
    </div>
  );
};

export default DetailsPlaceHolder;
