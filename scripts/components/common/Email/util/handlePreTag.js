export default (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;

  const preTags = div.querySelectorAll("pre");
  preTags.forEach((preTag) => {
    preTag.style.whiteSpace = "break-spaces";
  });

  return div.innerHTML;
};
