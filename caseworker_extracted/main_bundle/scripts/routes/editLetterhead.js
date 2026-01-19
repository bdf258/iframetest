/*global $ */
import { loadRestrictions } from "../helpers/restrictions";

const LetterheadPreview = {
  images: {
    header: "",
    header_valid: true,
    footer: "",
    footer_valid: true,
    signature: "",
    signature_valid: true,
  },
  readURL(input, target) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      var image = new Image();

      reader.onload = function (e) {
        image.src = e.target.result;
        LetterheadPreview.images[target] = e.target.result;
      };

      image.onload = function () {
        if (image.naturalWidth < 300) {
          alert("Image too small");
          LetterheadPreview.images[target + "_valid"] = false;
          return;
        }
        LetterheadPreview.images[target + "_valid"] = true;
        LetterheadPreview.updatePreview();
      };

      reader.readAsDataURL(input.files[0]);
    }
  },
  updatePreview() {
    $(".signature").attr("src", this.images.signature);
    $(".preview").css(
      "background",
      `url("${this.images.header}") no-repeat 50% 0%, url("${
        this.images.footer
      }") no-repeat 0px ${297 - +$('[data-attr="paddingBottom"]').val()}mm`
    );
  },
  init() {
    const currentData = JSON.parse(
      document.querySelector("script.data").innerText
    );
    this.images.header = currentData.background;
    this.images.footer = currentData.footer_background;
    this.images.signature = currentData.signature;
    const self = this;
    $("[type='file']").change(function (e) {
      self.readURL(this, e.target.dataset.target);
    });

    $("[data-attr]").each(function () {
      var unit =
        $(this).attr("data-unit") !== undefined ? $(this).attr("data-unit") : "mm";
      $("." + $(this).attr("data-target")).css(
       $(this).attr("data-attr"),
        $(this).val() + unit
      );
    });
    $("[data-attr]").change(function (e) {
      var unit =
        e.target.dataset.unit !== undefined ? e.target.dataset.unit : "mm";
      $("." + e.target.dataset.target).css(
        e.target.dataset.attr,
        e.target.value + unit
      );
    });

    $("[data-alter]").change(function (e) {
      $(".preview").css(
        "backgroundPosition",
        `50% 0%, 0px ${297 - +e.target.value}mm`
      );
    });

    $("select").select2();

    const currentOptions = $("#restrictions").data("current");

    loadRestrictions(currentOptions);

    $('select[name="PDFfont"]').trigger("change");
    $('[name="headerAsBackground"]').change(function (e) {
      if (e.target.value === "1") {
        $(".preview").addClass("fullWidth");
        return;
      }
      $(".preview").removeClass("fullWidth");
    });

    $(".save").click(function () {
      if (
        !LetterheadPreview.images.header_valid ||
        !LetterheadPreview.images.footer_valid ||
        !LetterheadPreview.images.signature_valid
      )
        return false;
      let form = document.querySelector("form.letterhead");
      let formData = new FormData(form);
      $.ajax({
        url: "editletterhead.php",
        type: "post",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success() {
          alert("Letterhead saved");
          window.location.href = "manageletterheads.php";
        },
        error() {
          alert("Letterhead saved");
          window.location.href = "manageletterheads.php";
        },
      });
    });

    $("button.remove").click(function (e) {
      e.preventDefault();
      const target = e.target.dataset.target;
      LetterheadPreview.images[target] = null;
      $(`input[name=remove_${target}]`).val(true);
      $(`.remove.${target}`).hide();
      LetterheadPreview.updatePreview();
    });
  },
};

export default LetterheadPreview;
