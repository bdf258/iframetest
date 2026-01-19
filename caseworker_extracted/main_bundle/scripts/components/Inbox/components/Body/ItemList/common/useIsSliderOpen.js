import { SliderContext } from "@electedtech/electedtech-ui";
import { useContext } from "react";

/**
 * if the slider is open (slider?.sliderState?.open === true) don't allow the
 * the focused email to change. This is to prevent the slider displaying one
 * email and the main inbox body showing another
 */
export const useIsSliderOpen = () => {
  const slider = useContext(SliderContext);

  return slider?.sliderState?.open || false;
};
