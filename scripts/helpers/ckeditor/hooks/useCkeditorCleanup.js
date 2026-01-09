import { useEffect } from "react";

export const useCkeditorCleanup = (hasInstance, currentInstance) => {
  useEffect(() => {
    return () => {
      if (hasInstance) {
        currentInstance.destroy();
      }
    };
  }, []);
};
