import { ModalProvider, SliderProvider } from "@electedtech/electedtech-ui";

import ErrorBoundaryProvider from "./ErrorBoundary";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "react-jss";
import TranslationProvider from "./translation/TranslationProvider.jsx";
import propTypes from "prop-types";
import sliderMarginTop from "../consts/sliderMarginTop";
import { theme } from "../../theme";

const InnerProviders = ({ children }) => (
  <ModalProvider>
    <SliderProvider marginTop={sliderMarginTop}>{children}</SliderProvider>
  </ModalProvider>
);

InnerProviders.propTypes = { children: propTypes.node.isRequired };

const Providers = ({ children, reduxStore }) => {
  return (
    <ErrorBoundaryProvider>
      <TranslationProvider>
        <ThemeProvider theme={theme}>
          {reduxStore ? (
            <ReduxProvider store={reduxStore}>
              <InnerProviders>{children}</InnerProviders>
            </ReduxProvider>
          ) : (
            <InnerProviders>{children}</InnerProviders>
          )}
        </ThemeProvider>
      </TranslationProvider>
    </ErrorBoundaryProvider>
  );
};

Providers.propTypes = {
  children: propTypes.node.isRequired,
  reduxStore: propTypes.object,
};

export default Providers;
