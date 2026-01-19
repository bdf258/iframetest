import { FlexBox, Spinner } from "@electedtech/electedtech-ui";

import React from "react";
import { ThemeProvider } from "react-jss";
import propTypes from "prop-types";
import theme from "@electedtech/theme";

const ComponentLoading = ({ scale = 2 }) => {
  return (
    <ThemeProvider theme={theme}>
      <FlexBox hAlign="center" vAlign="center">
        <Spinner scale={scale} />
      </FlexBox>
    </ThemeProvider>
  );
};

ComponentLoading.propTypes = {
  scale: propTypes.number,
};

export default ComponentLoading;
