const removeEmbeddedImages = (string) => {
  if (!string || typeof string !== "string") return "";

  return string.replaceAll(
    new RegExp(/(<img.*?src=('[^']*'|"[^"]*").*?>)/gims),
    "[Embedded Image]"
  );
};

export default removeEmbeddedImages;
