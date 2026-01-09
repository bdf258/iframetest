export default (value) => {
  if (!value) return "";
  let breakTag = "$1<br />";
  return (value + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, breakTag);
};
