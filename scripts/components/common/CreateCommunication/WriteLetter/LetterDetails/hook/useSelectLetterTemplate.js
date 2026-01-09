import { useEffect } from "react";

const useSelectedLetterTemplate = (
  defaultLetterhead,
  letterheads,
  letterheadSelectInputName,
  onChange
) => {
  useEffect(() => {
    if (!letterheads) return;
    if (letterheads.length === 0) return;

    const hasDefaultLetterhead = !!letterheads.find(
      (letterhead) => letterhead.id === defaultLetterhead
    );

    if (!hasDefaultLetterhead) {
      onChange({
        target: {
          value: letterheads[0].id,
          name: letterheadSelectInputName,
        },
      });
    }
  }, [letterheads]);
};

export default useSelectedLetterTemplate;
