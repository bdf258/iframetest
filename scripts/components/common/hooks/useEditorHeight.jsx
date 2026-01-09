import { getCurrentCkeditorInstance } from "../../../helpers/ckeditor/getInstance";
import { useCkeditorReady } from "../../../hooks/CKEditor/useCkeditorReady.jsx";
import { useLayoutEffect } from "react";
import { useWindowSize } from "../../../hooks/useWindowSize.jsx";

const useEditorHeight = (topOffset, bottomOffset, minHeight = 200) => {
  const { height } = useWindowSize();

  const [ckEditorReady] = useCkeditorReady();

  const getEditorHeight = () => {
    const editorHeight = height - (topOffset + bottomOffset);
    if (editorHeight >= minHeight) return editorHeight;
    return minHeight;
  };

  useLayoutEffect(() => {
    if (!ckEditorReady) return;
    const currentEditorInstance = getCurrentCkeditorInstance();
    if (!currentEditorInstance) return;
    if (!height) return;
    currentEditorInstance.resize("100%", getEditorHeight());
  }, [topOffset, bottomOffset, ckEditorReady]);
};

export default useEditorHeight;
