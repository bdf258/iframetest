import { Button, FlexBox } from "@electedtech/electedtech-ui";

import PropTypes from "prop-types";
import React from "react";
import { locale } from "../../../helpers/localStorageHelper.js";

// Do not use iln - to capture errors relating to iln this provider must be
// TranslationProvider's parent

const FallbackComponent = ({ eventId }) => {
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Oops, something went wrong</h1>
      <p>
        If this issue persists you can email support via{" "}
        <a
          href={`mailto:support@electedtechnologies.com?subject=${encodeURIComponent(
            "Crash Report: " + eventId
          )}`}
          style={{ whiteSpace: "nowrap" }}
        >
          support@electedtechnologies.com
        </a>{" "}
        or call{" "}
        <span style={{ whiteSpace: "nowrap" }}>
          {locale.toLowerCase() === "en_AU".toLowerCase()
            ? "02 6169 1019"
            : "0333 344 1225"}
        </span>
      </p>
      {eventId && (
        <p>
          If contacting support, you can quote the following Crash Report ID to
          help our team diagnose the issue: <strong>{eventId}</strong>
        </p>
      )}
      <FlexBox hAlign="center">
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go Home
        </Button>
      </FlexBox>
    </div>
  );
};

FallbackComponent.propTypes = {
  eventId: PropTypes.string,
};

export default FallbackComponent;
