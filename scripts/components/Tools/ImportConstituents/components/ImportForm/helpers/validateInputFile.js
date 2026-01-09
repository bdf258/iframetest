import { fileTypes } from "../helpers/fileTypes";
export const validateFileType = (file, accept) => {
  if (!accept) {
    return true;
  }
  const extension = file.name.split(".").pop().toLowerCase();
  const mimeType = file.type;
  const acceptedTypes = accept
    .split(",")
    .map((type) =>
      type.trim().indexOf(".") === 0
        ? type.trim().toLowerCase().substring(1)
        : type.trim().toLowerCase()
    );
  for (const type of acceptedTypes) {
    if (mimeType === fileTypes[type] || type === extension) {
      return true;
    }
  }
  return false;
};
