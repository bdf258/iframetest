/*global $ */
export default {
  init() {
    import("clipboard").then((Clipboard) => {
      const clipboard = new Clipboard(".btn");
      clipboard.on("success", () => {
        $(".copy").text("Copied!");
        setTimeout(() => {
          $(".copy").text("Copy to clipboard");
        }, 3000);
      });
    });
  },
  finalize() {
    $(".reveal").click(() => {
      $("span").html($(".copy").data("clipboard-text"));
    });
  },
};
