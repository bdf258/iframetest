/* globals $ */
function injectCCs() {
  $(".to").each((index, field) => {
    const cc = $("<button>Cc</button>");
    const bcc = $("<button>Bcc</button>");
    $(field).append(bcc).append(cc);
    cc.on("click", (e) => {
      e.preventDefault();
      toggle.call(field, ".cc");
    });
    bcc.on("click", (e) => {
      e.preventDefault();
      toggle.call(field, ".bcc");
    });
  });
}
function toggle(selector) {
  $(selector, $(this).parent()).is(":visible")
    ? hide.call(this, selector)
    : reveal.call(this, selector);
}
function reveal(selector) {
  $(selector, $(this).parent()).removeClass("inactive");
}
function hide(selector) {
  $(selector, $(this).parent()).addClass("inactive");
  $(`${selector} input`, $(this).parent()).val("");
}

export default injectCCs;
