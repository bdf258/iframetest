import {
  largerScreenWidth,
  sliderWidthForLargerScreens,
} from "../ComposeEmail/common/sizeConfig";

import { useContext, useEffect } from "react";
import { SliderContext } from "@electedtech/electedtech-ui";

const useResizeSlider = (
  sliderMinWidth,
  minimumViewPortWidth,
  displayMergeCodes = false
) => {
  const { sliderActions } = useContext(SliderContext) || {};

  useEffect(() => {
    if (!sliderActions || !sliderMinWidth || !minimumViewPortWidth) return;

    const handleResize = () => {
      const windowWidth = window.innerWidth;

      const sliderWidthAsPercentage = (sliderWidth) =>
        Math.floor((sliderWidth / windowWidth) * 100);

      switch (true) {
        case displayMergeCodes: {
          sliderActions.setWidth(100);
          break;
        }
        case windowWidth <= minimumViewPortWidth: {
          sliderActions.setWidth(100);
          break;
        }
        case windowWidth >= minimumViewPortWidth &&
          windowWidth <= largerScreenWidth: {
          sliderActions.setWidth(sliderWidthAsPercentage(sliderMinWidth));
          break;
        }
        case windowWidth > largerScreenWidth: {
          sliderActions.setWidth(sliderWidthForLargerScreens);
          break;
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [displayMergeCodes]);
};

export default useResizeSlider;
