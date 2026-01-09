import { useEffect, useState } from "react";

import api from "@electedtech/api";

const useGetLetterHeadConfig = (letterHeadId) => {
  const [letterHeadConfig, setLetterHeadConfig] = useState();

  useEffect(() => {
    if (letterHeadId !== undefined)
      api
        .getLetterHeader(letterHeadId)
        .then(({ PDFFontSize, PDFFont, ...letterhead }) => 
          setLetterHeadConfig({
            ...letterhead,
            fontSize_defaultLabel: `${PDFFontSize}pt`,
            font_defaultLabel: `${
              PDFFont.charAt(0).toUpperCase() + PDFFont.slice(1)
            }`,
          })
        )
        .catch(() => setLetterHeadConfig({}));
    else setLetterHeadConfig({});
  }, []);

  return [letterHeadConfig];
};

export default useGetLetterHeadConfig;
