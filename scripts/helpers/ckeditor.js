/* globals CKEDITOR */
import namer from "color-namer";

class ckeditorLauncher {
  constructor(type, options) {
    const { selector } = options;
    const installationOptions = JSON.parse(
      document.querySelector("script.system-features").innerText
    );

    this.type = type;
    this.options = options;
    this.selector = selector;
    var configuredColors = installationOptions.editorColors;
    if (Array.isArray(configuredColors)) {
      configuredColors = Array.from(
        new Set(["000000", "FFFFFF"].concat(configuredColors))
      );
    }
    var editorFontSizes = installationOptions.editorFontSizes;
    const fontSizes = editorFontSizes.reduce(
      (string, size) => string + size + "pt;",
      ""
    );
    this.fontSize_sizes = fontSizes;
    this.availableColors =
      configuredColors !== undefined ? configuredColors.join(",") : false;
    this.fontSize_defaultLabel = installationOptions.PDFFontSize;
    this.font_defaultLabel = installationOptions.CKEditorDefaultFont;

    this.init();
  }

  init() {
    switch (this.type) {
      case "email":
        this.options = Object.assign(this.options, {
          extraPlugins:
            "panelbutton,colorbutton,autolink,button-link,signatureblock",
          contentsCss: "ckeditorv4/emailscss.php",
          colorButton_enableAutomatic: false,
          colorButton_enableMore: false,
        });
        break;
      case "letter":
        this.options = Object.assign(this.options, {
          removePlugins: "image",
          colorButton_enableMore: false,
          fontSize_defaultLabel: this.fontSize_defaultLabel,
          font_defaultLabel: this.font_defaultLabel,
          fontSize_sizes: this.fontSize_sizes,
          width: "21cm",
          line_height: "1;1.1;1.15;1.2;1.5;1.75;2",
          extraPlugins:
            "tabletools,tableresize,lineheight,colorbutton,printenvelope,autolink",
          removeButtons:
            "Cut,Copy,Paste,PasteText,Undo,Redo,Anchor,Strike,Subscript,Superscript,Source,Format,Styles,SpecialChar,PasteText",
        });
        break;
    }

    if (this.availableColors !== false) {
      this.options.colorButton_colors = this.availableColors;
      this.options.hasCustomColors = true;
      this.options.customColors = this.availableColors
        .split(",")
        .map((color) => {
          color = `#${color}`;
          let name = namer(color, { pick: "basic" }).basic.sort(
            (a, b) => a.distance - b.distance
          )[0].name;
          return [name, color];
        });
    }

    CKEDITOR.replace(this.selector, this.options);
  }
}

export default ckeditorLauncher;
