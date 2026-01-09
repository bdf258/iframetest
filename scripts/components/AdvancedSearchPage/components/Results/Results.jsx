import React from "react";
import propTypes from "./Results.propTypes.js";

const RenderJSON = ({ data, level = 0 }) => {
  if (data === null || typeof data !== "object") {
    return <pre>{JSON.stringify(data)}</pre>;
  }

  if (Array.isArray(data)) {
    return (
      <div style={{ marginLeft: level * 16 }}>
        {data.map((item, index) => (
          <div key={index}>
            {typeof item === "object" && item !== null ? (
              <details>
                <summary>[{index}]</summary>
                <RenderJSON data={item} level={level + 1} />
              </details>
            ) : (
              <div>
                <strong>[{index}]:</strong> {JSON.stringify(item)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginLeft: level * 16 }}>
      {Object.entries(data).map(([key, value], index) => (
        <div key={index}>
          {typeof value === "object" && value !== null ? (
            <details>
              <summary>{key}</summary>
              <RenderJSON data={value} level={level + 1} />
            </details>
          ) : (
            <div>
              <strong>{key}:</strong> {JSON.stringify(value)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

RenderJSON.propTypes = propTypes;

const Results = ({ results }) => {
  if (!results) return null;

  return <RenderJSON data={results} />;
};

Results.propTypes = propTypes;

export default Results;
