/*global CKEDITOR */
import { useEffect, useState } from "react";

export const useCkeditorReady = () => {
  const [ckEditorReady, setCkEditorReady] = useState(false);

  useEffect(() => {
    CKEDITOR.on("instanceReady", () => {
      setCkEditorReady(true);
    });
  }, []);

  return [ckEditorReady];
};
