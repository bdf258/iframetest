import { getCurrentCkeditorInstance } from "../../helpers/ckeditor/getInstance";
import { useEffect } from "react";

const useUnmountCkeditor = () => {
  useEffect(() => {
    return () => {
      const currentCkeditorInstance = getCurrentCkeditorInstance();
      currentCkeditorInstance.destroy();
    };
  }, []);
};

export default useUnmountCkeditor;
