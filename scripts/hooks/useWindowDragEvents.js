import { useEffect } from "react";

const useWindowDragEvents = ({
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}) => {
  useEffect(() => {
    onDragEnter && (window.ondragenter = onDragEnter);
    onDragLeave && (window.ondragleave = onDragLeave);
    onDragOver && (window.ondragover = onDragOver);
    onDrop && (window.ondrop = onDrop);
    return () => {
      onDragEnter && (window.ondragenter = undefined);
      onDragLeave && (window.ondragleave = undefined);
      onDragOver && (window.ondragover = undefined);
      onDrop && (window.ondrop = undefined);
    };
  }, [onDragEnter, onDragLeave, onDragOver, onDrop]);
};

export default useWindowDragEvents;
