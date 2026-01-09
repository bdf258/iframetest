/**
 * label - displayed to the user
 * family - the font-family css value
 * type - stored in db for default font select
 *
 * CKEditor requires a single string like:
 * "Label/Font Family Stack;Label/Font Family Stack;"
 */

// Websafe email fonts
export const webSafeFonts = [
  { type: "arial", family: "Arial", label: "Arial" },
  {
    type: "garamond",
    family: "Garamond, Times New Roman, Serif",
    label: "Garamond",
  },
  { type: "georgia", family: "Georgia, Times New Roman", label: "Georgia" },
  { type: "helvetica", family: "Helvetica, Arial", label: "Helvetica" },
  { type: "tahoma", family: "Tahoma, Arial, Sans-Serif", label: "Tahoma" },
  { type: "times", family: "Times New Roman", label: "Times New Roman" },
  { type: "verdana", family: "Verdana, Arial, Helvetica", label: "Verdana" },
].sort((a, b) => a.label.localeCompare(b.label));

// custom fonts (for letters)
export const customFonts = [
  {
    type: "franklin",
    family: "Franklin Gothic Book, Franklin Gothic, Franklin, Arial",
    label: "Franklin Gothic",
  },
  { type: "calibri", family: "Calibri, Arial, Helvetica", label: "Calibri" },
  { type: "cambria", family: "Cambria, Arial, Helvetica", label: "Cambria" },
  { type: "freeserif", family: "Times New Roman", label: "FreeSerif" },
  { type: "freesans", family: "Arial", label: "FreeSans" },
  { type: "neosans", family: "NeoSans, Arial, Helvetica", label: "Neo Sans" },
  {
    type: "bookantiqua",
    family: "Book Antiqua, bookantiqua, Times New Roman, Serif",
    label: "Book Antiqua",
  },
  { type: "candara", family: "Candara, Arial, Sans-Serif", label: "Candara" },
  {
    type: "bookos",
    family: "Bookman Old Style, Times New Roman, Serif",
    label: "Bookman Old Style",
  },
  {
    type: "opensans",
    family: "Open Sans, Arial, Sanserif",
    label: "Open Sans",
  },
  {
    type: "pala",
    family: "PalatinoLinotype-Roman, Arial, Sanserif",
    label: "Palatino Linotype Roman",
  },
  {
    type: "californianfb",
    family: "Californian FB, Times New Roman, serif",
    label: "Californian FB",
  },
  {
    type: "lucidasans",
    family: "Lucida Sans, Times New Roman, serif",
    label: "Lucida Sans",
  },
  {
    type: "palatinotype",
    family: "Palatino Linotype, Times New Roman, serif",
    label: "Palatino Linotype",
  },
  {
    type: "arialnarrow",
    family: "Arial Narrow, Arial, Sans-Serif",
    label: "Arial Narrow",
  },
  {
    type: "gillsans",
    family: "Gill Sans, Arial, Sans-Serif",
    label: "Gill Sans",
  },
  {
    type: "bevietnampro",
    family: "Be Vietnam Pro, Arial, Sans-Serif",
    label: "Be Vietnam Pro",
  },
  {
    type: "antonregular",
    family: "antonregular, Arial, Sans-Serif",
    label: "Anton Regular",
  },
  {
    type: "robotocondensedb",
    family: "robotocondensedb, Arial, Sans-Serif",
    label: "Roboto Condensed Bold",
  },
  {
    type: "robotoregular",
    family: "robotoregular, Arial, Sans-Serif",
    label: "Roboto Regular",
  },
  {
    type: "robotoitalic",
    family: "robotitalic, Arial, Sans-Serif",
    label: "Roboto Italic",
  },
  {
    type: "robotomedium",
    family: "robotomedium, Arial, Sans-Serif",
    label: "Roboto Medium",
  },
  {
    type: "robotobold",
    family: "robotobold, Arial, Sans-Serif",
    label: "Roboto Bold",
  },
  {
    type: "staatliches",
    family: "staatlichesregular, Arial, Sans-Serif",
    label: "Staatliches Regular",
  },
  {
    type: "urbanistblack",
    family: "urbanistblack, Arial, Sans-Serif",
    label: "Urbanist Black",
  },
  {
    type: "urbanistb",
    family: "urbanistbold, Arial, Sans-Serif",
    label: "Urbanist Bold",
  },
  {
    type: "urbanist",
    family: "urbanistregular, Arial, Sans-Serif",
    label: "Urbanist Regular",
  },
].sort((a, b) => a.label.localeCompare(b.label));

export const allFonts = [...webSafeFonts, ...customFonts].sort((a, b) =>
  a.label.localeCompare(b.label)
);
