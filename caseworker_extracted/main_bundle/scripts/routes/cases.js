export default {
  init() {
    import("../helpers/ckeditor").then((CKEDITOR) => {
      new CKEDITOR.default("email", {
        selector: "body",
        height: window.innerHeight / 2,
      });
    });
  },
};
