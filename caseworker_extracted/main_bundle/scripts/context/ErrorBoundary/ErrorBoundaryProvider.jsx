import * as Sentry from "@sentry/react";

import FallbackComponent from "./FallbackComponent";
import React from "react";
import propTypes from "./ErrorBoundaryProvider.propTypes";

// Do not use iln - to capture errors relating to iln this provider must be
// TranslationProvider's parent

const ErrorBoundaryProvider = ({ children }) => {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

ErrorBoundaryProvider.propTypes = propTypes;

export default ErrorBoundaryProvider;
